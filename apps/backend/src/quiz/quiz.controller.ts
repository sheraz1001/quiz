import { Controller, Post, Get, Put, Body, Param, UseGuards, Request } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { QuizService } from './quiz.service';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { SubmitAnswerDto } from './dto/submit-answer.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('Quiz')
@Controller('quiz')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class QuizController {
  constructor(private readonly quizService: QuizService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new quiz' })
  async createQuiz(@Request() req, @Body() createQuizDto: CreateQuizDto) {
    return this.quizService.createQuiz(req.user.id, createQuizDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get quiz by ID' })
  async getQuiz(@Param('id') id: string, @Request() req) {
    return this.quizService.getQuiz(id, req.user.id);
  }

  @Post(':id/answers')
  @ApiOperation({ summary: 'Submit an answer for a quiz question' })
  async submitAnswer(
    @Param('id') id: string, 
    @Request() req, 
    @Body() submitAnswerDto: SubmitAnswerDto
  ) {
    return this.quizService.submitAnswer(id, req.user.id, submitAnswerDto);
  }

  @Put(':id/complete')
  @ApiOperation({ summary: 'Complete a quiz and calculate final score' })
  async completeQuiz(@Param('id') id: string, @Request() req) {
    return this.quizService.completeQuiz(id, req.user.id);
  }

  @Get(':id/results')
  @ApiOperation({ summary: 'Get detailed quiz results' })
  async getQuizResults(@Param('id') id: string, @Request() req) {
    return this.quizService.getQuizResults(id, req.user.id);
  }
}