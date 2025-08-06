import { IsInt, IsOptional, IsArray, IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateQuizDto {
  @ApiProperty({ example: 1 })
  @IsInt()
  authorityId: number;

  @ApiProperty({ example: 1 })
  @IsInt()
  specialtyId: number;

  @ApiProperty({ example: 50, description: 'Number of questions' })
  @IsInt()
  questionCount: number;

  @ApiProperty({ example: true, description: 'Whether the quiz is timed' })
  @IsBoolean()
  isTimed: boolean;

  @ApiProperty({ example: ['Cardiology', 'Pharmacology'], required: false })
  @IsOptional()
  @IsArray()
  tags?: string[];
}