// src/dto/response/get-response.dto.ts
import { ApiProperty } from '@nestjs/swagger';

export class GetResponseDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  age: number;
}
