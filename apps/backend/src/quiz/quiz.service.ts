import { Injectable, NotFoundException, ForbiddenException, BadRequestException } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { SubmitAnswerDto } from './dto/submit-answer.dto';

@Injectable()
export class QuizService {
  constructor(private readonly db: DatabaseService) {}

  async createQuiz(userId: string, createQuizDto: CreateQuizDto) {
    // Check if user has active subscription for the specialty/authority
    const hasAccess = await this.checkUserAccess(userId, createQuizDto.specialtyId, createQuizDto.authorityId);
    if (!hasAccess) {
      throw new ForbiddenException('You need an active subscription to access this quiz');
    }

    // Build query for finding questions
    const whereClause: any = {
      specialties: {
        some: { specialtyId: createQuizDto.specialtyId }
      },
      authorities: {
        some: { authorityId: createQuizDto.authorityId }
      }
    };

    // Add tags filter if provided
    if (createQuizDto.tags && createQuizDto.tags.length > 0) {
      whereClause.tags = {
        hasSome: createQuizDto.tags
      };
    }

    // Get random questions
    const questions = await this.db.question.findMany({
      where: whereClause,
      take: createQuizDto.questionCount * 2, // Get more than needed for randomization
      include: {
        authorities: {
          include: { authority: true }
        },
        specialties: {
          include: { specialty: true }
        }
      }
    });

    if (questions.length < createQuizDto.questionCount) {
      throw new BadRequestException(
        `Not enough questions available. Found ${questions.length}, requested ${createQuizDto.questionCount}`
      );
    }

    // Randomize and select the required number of questions
    const shuffledQuestions = questions.sort(() => Math.random() - 0.5);
    const selectedQuestions = shuffledQuestions.slice(0, createQuizDto.questionCount);

    // Create quiz session
    const quizSession = await this.db.quizSession.create({
      data: {
        userId,
        status: 'IN_PROGRESS',
        settings: {
          specialtyId: createQuizDto.specialtyId,
          authorityId: createQuizDto.authorityId,
          questionCount: createQuizDto.questionCount,
          isTimed: createQuizDto.isTimed,
          tags: createQuizDto.tags || [],
          questionIds: selectedQuestions.map(q => q.id)
        }
      }
    });

    // Return quiz with questions (without correct answers)
    return {
      id: quizSession.id,
      settings: quizSession.settings,
      questions: selectedQuestions.map(q => ({
        id: q.id,
        questionText: q.questionText,
        questionType: q.questionType,
        options: q.options,
        imageUrl: q.imageUrl,
        tags: q.tags
      }))
    };
  }

  async getQuiz(quizId: string, userId: string) {
    const quiz = await this.db.quizSession.findFirst({
      where: { id: quizId, userId },
      include: {
        quizAnswers: true
      }
    });

    if (!quiz) {
      throw new NotFoundException('Quiz not found');
    }

    const questionIds = quiz.settings.questionIds as string[];
    const questions = await this.db.question.findMany({
      where: { id: { in: questionIds } },
      orderBy: { createdAt: 'asc' }
    });

    // Return questions without correct answers if quiz is still in progress
    const questionsWithAnswers = questions.map(q => {
      const userAnswer = quiz.quizAnswers.find(a => a.questionId === q.id);
      return {
        id: q.id,
        questionText: q.questionText,
        questionType: q.questionType,
        options: q.options,
        imageUrl: q.imageUrl,
        tags: q.tags,
        userAnswer: userAnswer?.selectedOption,
        isAnswered: !!userAnswer
      };
    });

    return {
      id: quiz.id,
      status: quiz.status,
      settings: quiz.settings,
      questions: questionsWithAnswers,
      createdAt: quiz.createdAt
    };
  }

  async submitAnswer(quizId: string, userId: string, submitAnswerDto: SubmitAnswerDto) {
    const quiz = await this.db.quizSession.findFirst({
      where: { id: quizId, userId, status: 'IN_PROGRESS' }
    });

    if (!quiz) {
      throw new NotFoundException('Active quiz not found');
    }

    // Get the question
    const question = await this.db.question.findUnique({
      where: { id: submitAnswerDto.questionId }
    });

    if (!question) {
      throw new NotFoundException('Question not found');
    }

    // Check if answer is correct
    const isCorrect = this.evaluateAnswer(question.options, submitAnswerDto.selectedOption, question.questionType);

    // Save or update the answer
    await this.db.quizAnswer.upsert({
      where: {
        quizSessionId_questionId: {
          quizSessionId: quizId,
          questionId: submitAnswerDto.questionId
        }
      },
      update: {
        selectedOption: submitAnswerDto.selectedOption,
        isCorrect
      },
      create: {
        quizSessionId: quizId,
        questionId: submitAnswerDto.questionId,
        selectedOption: submitAnswerDto.selectedOption,
        isCorrect
      }
    });

    return { isCorrect };
  }

  async completeQuiz(quizId: string, userId: string) {
    const quiz = await this.db.quizSession.findFirst({
      where: { id: quizId, userId, status: 'IN_PROGRESS' },
      include: {
        quizAnswers: true
      }
    });

    if (!quiz) {
      throw new NotFoundException('Active quiz not found');
    }

    // Calculate score
    const totalQuestions = quiz.quizAnswers.length;
    const correctAnswers = quiz.quizAnswers.filter(a => a.isCorrect).length;
    const score = totalQuestions > 0 ? (correctAnswers / totalQuestions) * 100 : 0;

    // Calculate time taken (in seconds)
    const timeTaken = Math.floor((new Date().getTime() - quiz.createdAt.getTime()) / 1000);

    // Update quiz session
    const completedQuiz = await this.db.quizSession.update({
      where: { id: quizId },
      data: {
        status: 'COMPLETED',
        score,
        timeTakenSeconds: timeTaken,
        completedAt: new Date()
      }
    });

    return {
      id: completedQuiz.id,
      score: completedQuiz.score,
      timeTakenSeconds: completedQuiz.timeTakenSeconds,
      totalQuestions,
      correctAnswers,
      completedAt: completedQuiz.completedAt
    };
  }

  async getQuizResults(quizId: string, userId: string) {
    const quiz = await this.db.quizSession.findFirst({
      where: { id: quizId, userId, status: 'COMPLETED' },
      include: {
        quizAnswers: {
          include: {
            question: true
          }
        }
      }
    });

    if (!quiz) {
      throw new NotFoundException('Completed quiz not found');
    }

    const results = quiz.quizAnswers.map(answer => ({
      questionId: answer.questionId,
      questionText: answer.question.questionText,
      questionType: answer.question.questionType,
      userAnswer: answer.selectedOption,
      correctAnswers: answer.question.options,
      isCorrect: answer.isCorrect,
      explanation: answer.question.explanation,
      references: answer.question.references,
      tags: answer.question.tags
    }));

    return {
      id: quiz.id,
      score: quiz.score,
      timeTakenSeconds: quiz.timeTakenSeconds,
      completedAt: quiz.completedAt,
      results
    };
  }

  private async checkUserAccess(userId: string, specialtyId: number, authorityId: number): Promise<boolean> {
    const activeSubscriptions = await this.db.userSubscription.findMany({
      where: {
        userId,
        status: 'ACTIVE',
        endDate: { gt: new Date() }
      },
      include: {
        subscriptionPlan: true
      }
    });

    // Check if user has a subscription that covers the specialty and authority
    return activeSubscriptions.some(sub => {
      const plan = sub.subscriptionPlan;
      const specialtyMatch = !plan.specialtyId || plan.specialtyId === specialtyId;
      const authorityMatch = !plan.authorityId || plan.authorityId === authorityId;
      return specialtyMatch && authorityMatch;
    });
  }

  private evaluateAnswer(options: any, selectedOption: any, questionType: string): boolean {
    const correctOptions = options.filter((opt: any) => opt.isCorrect);

    switch (questionType) {
      case 'SBA':
      case 'TRUE_FALSE':
        // Single correct answer
        return correctOptions.some((opt: any) => opt.text === selectedOption.text);

      case 'MCQ':
        // Multiple correct answers - check if all selected are correct and no correct ones are missed
        if (!Array.isArray(selectedOption)) return false;
        const selectedTexts = selectedOption.map((opt: any) => opt.text);
        const correctTexts = correctOptions.map((opt: any) => opt.text);
        return (
          selectedTexts.length === correctTexts.length &&
          selectedTexts.every((text: string) => correctTexts.includes(text))
        );

      case 'EMQ':
        // Extended matching - check if selected option is correct
        return correctOptions.some((opt: any) => opt.text === selectedOption.text);

      default:
        return false;
    }
  }
}