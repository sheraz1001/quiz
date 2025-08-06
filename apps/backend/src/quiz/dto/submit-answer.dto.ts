import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SubmitAnswerDto {
  @ApiProperty({ example: 'question-uuid' })
  @IsString()
  @IsNotEmpty()
  questionId: string;

  @ApiProperty({ example: { text: 'Option A', isCorrect: true } })
  @IsNotEmpty()
  selectedOption: any; // JSON object representing the selected option(s)
}