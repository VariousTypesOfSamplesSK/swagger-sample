// src/dto/request/post-request.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length } from 'class-validator';

export class PostRequestDto {
  @ApiProperty()
  @IsString()
  @Length(1, 100)
  title: string;

  @ApiProperty()
  @IsString()
  content: string;

  @ApiProperty({ type: [String], description: '投稿に付与されたタグ一覧' })
  tags: string[];
}
