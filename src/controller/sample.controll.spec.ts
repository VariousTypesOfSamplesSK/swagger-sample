import { Test, TestingModule } from '@nestjs/testing';
import { SampleController } from './sample.controller';
import { SampleService } from '../service/sample.service';
import { GetRequestDto, UserRole } from '../dto/request/get-request.dto';
import { PostRequestDto } from '../dto/request/post-request.dto';
import { GetResponseDto } from '../dto/response/get-response.dto';
import { PostResponseDto } from '../dto/response/post-response.dto';

describe('SampleController', () => {
  let sampleController: SampleController;
  let sampleService: SampleService;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [SampleController],
      providers: [
        {
          provide: SampleService,
          useValue: {
            handleGet: jest.fn(),
            handlePost: jest.fn(),
          },
        },
      ],
    }).compile();

    sampleController = moduleRef.get<SampleController>(SampleController);
    sampleService = moduleRef.get<SampleService>(SampleService);
  });

  describe('getSample', () => {
    it('should return expected GetResponseDto', () => {
      const query: GetRequestDto = {
        name: 'John Doe',
        age: 30,
        email: 'john.doe@example.com',
        isActive: true,
        role: UserRole.USER,
        birthDate: '1990-01-01',
        hobbies: ['reading', 'coding'],
        phoneNumber: '+81-90-1234-5678',
        avatarUrl: 'https://example.com/avatar.png',
      };
      const expectedResponse: GetResponseDto = { name: 'John', age: 30 };

      (sampleService.handleGet as jest.Mock).mockReturnValue(expectedResponse);

      const result = sampleController.getSample(query);
      expect(result).toEqual(expectedResponse);
      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(sampleService.handleGet).toHaveBeenCalledWith(query);
    });
  });

  describe('postSample', () => {
    it('should return expected PostResponseDto', () => {
      const body: PostRequestDto = {
        title: 'john@example.com',
        content: 'secure123',
        tags: ['NestJS', 'Swagger', 'TypeScript'],
      };
      const expectedResponse: PostResponseDto = {
        title: 'john@example.com',
        content: 'secure123',
        tags: ['NestJS', 'Swagger', 'TypeScript'],
      };

      (sampleService.handlePost as jest.Mock).mockReturnValue(expectedResponse);

      const result = sampleController.postSample(body);
      expect(result).toEqual(expectedResponse);
      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(sampleService.handlePost).toHaveBeenCalledWith(body);
    });
  });
});
