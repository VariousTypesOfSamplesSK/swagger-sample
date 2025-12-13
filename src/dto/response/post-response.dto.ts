// src/dto/response/post-response.dto.ts
import { ApiProperty } from '@nestjs/swagger';

export class PostResponseDto {
  @ApiProperty({
    description: '投稿のタイトル',
    example: 'NestJS で API を作ってみた',
  })
  title: string;

  @ApiProperty({
    description: '投稿の本文コンテンツ',
    example: 'この投稿では、NestJS の基本的な使い方を解説します。',
  })
  content: string;

  @ApiProperty({
    type: [String],
    description: '投稿に関連するタグ一覧',
    example: ['NestJS', 'TypeScript', 'Swagger'],
    default: [],
  })
  tags: string[];
}
