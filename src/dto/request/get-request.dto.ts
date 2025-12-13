import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsString,
  IsInt,
  IsOptional,
  IsEmail,
  IsBoolean,
  IsEnum,
  IsDateString,
  IsArray,
  ArrayNotEmpty,
  ArrayMinSize,
  ArrayMaxSize,
  Min,
  Max,
  Length,
  Matches,
} from 'class-validator';

export enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
  GUEST = 'guest',
}

export class GetRequestDto {
  @ApiProperty({ example: 'John Doe', description: 'User full name' })
  @IsString()
  @Length(1, 100)
  name: string;

  @ApiProperty({
    example: 25,
    minimum: 0,
    maximum: 150,
    description: 'User age',
  })
  @IsInt()
  @Min(0)
  @Max(150)
  age: number;

  @ApiProperty({
    example: 'john.doe@example.com',
    description: 'Email address',
  })
  @IsEmail()
  email: string;

  @ApiProperty({ example: true, description: 'Is the user active?' })
  @IsBoolean()
  isActive: boolean;

  @ApiProperty({
    enum: UserRole,
    example: UserRole.USER,
    description: 'User role',
  })
  @IsEnum(UserRole)
  role: UserRole;

  @ApiPropertyOptional({
    example: 'https://example.com/avatar.png',
    description: 'User avatar URL',
  })
  @IsOptional()
  @IsString()
  avatarUrl?: string;

  @ApiProperty({
    example: '2025-01-01',
    description: 'Birth date in ISO format',
  })
  @IsDateString()
  birthDate: string;

  @ApiProperty({
    example: ['reading', 'coding', 'traveling'],
    description: 'List of user hobbies',
    minItems: 1,
    maxItems: 10,
  })
  @IsArray()
  @ArrayNotEmpty()
  @ArrayMinSize(1)
  @ArrayMaxSize(10)
  @IsString({ each: true })
  hobbies: string[];

  @ApiProperty({
    example: '+81-90-1234-5678',
    description: 'Phone number in international format',
    pattern: '^\\+\\d{1,3}-\\d{1,4}-\\d{4}-\\d{4}$',
  })
  @Matches(/^\+\d{1,3}-\d{1,4}-\d{4}-\d{4}$/, {
    message:
      'Phone number must be in international format, e.g., +81-90-1234-5678',
  })
  phoneNumber: string;
}
