// src/service/sample.service.ts
import { Injectable } from '@nestjs/common';
import { GetRequestDto } from '../dto/request/get-request.dto';
import { PostRequestDto } from '../dto/request/post-request.dto';
import { GetResponseDto } from '../dto/response/get-response.dto';
import { PostResponseDto } from '../dto/response/post-response.dto';

@Injectable()
export class SampleService {
  handleGet(request: GetRequestDto): GetResponseDto {
    return {
      name: request.name,
      age: request.age,
    };
  }

  handlePost(request: PostRequestDto): PostResponseDto {
    return {
      title: request.title,
      content: request.content,
      tags: request.tags,
    };
  }
}
