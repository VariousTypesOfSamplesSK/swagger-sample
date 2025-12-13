// src/controller/sample.controller.ts
import { Controller, Get, Post, Query, Body } from '@nestjs/common';
import { SampleService } from '../service/sample.service';
import { GetRequestDto } from '../dto/request/get-request.dto';
import { PostRequestDto } from '../dto/request/post-request.dto';
import { GetResponseDto } from '../dto/response/get-response.dto';
import { PostResponseDto } from '../dto/response/post-response.dto';
import { ApiTags, ApiQuery, ApiBody, ApiResponse } from '@nestjs/swagger';

@ApiTags('Sample')
@Controller('sample')
export class SampleController {
  constructor(private readonly sampleService: SampleService) {}

  @Get()
  @ApiQuery({ name: 'name', type: String })
  @ApiQuery({ name: 'age', type: Number })
  @ApiResponse({ status: 200, type: GetResponseDto })
  getSample(@Query() query: GetRequestDto): GetResponseDto {
    return this.sampleService.handleGet(query);
  }

  @Post()
  @ApiBody({ type: PostRequestDto })
  @ApiResponse({ status: 201, type: PostResponseDto })
  postSample(@Body() body: PostRequestDto): PostResponseDto {
    return this.sampleService.handlePost(body);
  }
}
