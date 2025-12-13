import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { GetRequestDto, UserRole } from '../dto/request/get-request.dto';

describe('GetRequestDto Validation', () => {
  const getValidDto = (): GetRequestDto => ({
    name: 'John Doe',
    age: 30,
    email: 'john.doe@example.com',
    isActive: true,
    role: UserRole.USER,
    birthDate: '1990-01-01',
    hobbies: ['reading', 'coding'],
    phoneNumber: '+81-90-1234-5678',
    avatarUrl: 'https://example.com/avatar.png',
  });

  it('should validate a valid DTO', async () => {
    const dto = plainToInstance(GetRequestDto, getValidDto());
    const errors = await validate(dto);
    expect(errors.length).toBe(0);
  });

  it('should fail if required fields are missing', async () => {
    const dto = plainToInstance(GetRequestDto, {});
    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
    const properties = errors.map((e) => e.property);
    expect(properties).toContain('name');
    expect(properties).toContain('age');
    expect(properties).toContain('email');
    expect(properties).toContain('isActive');
    expect(properties).toContain('role');
    expect(properties).toContain('birthDate');
    expect(properties).toContain('hobbies');
    expect(properties).toContain('phoneNumber');
  });

  it('should fail with invalid email', async () => {
    const dto = getValidDto();
    dto.email = 'not-an-email';
    const errors = await validate(plainToInstance(GetRequestDto, dto));
    expect(errors.some((e) => e.property === 'email')).toBeTruthy();
  });

  it('should fail with invalid phone number', async () => {
    const dto = getValidDto();
    dto.phoneNumber = '090-1234-5678';
    const errors = await validate(plainToInstance(GetRequestDto, dto));
    expect(errors.some((e) => e.property === 'phoneNumber')).toBeTruthy();
  });

  it('should allow optional avatarUrl to be undefined', async () => {
    const dto = getValidDto();
    delete dto.avatarUrl;
    const errors = await validate(plainToInstance(GetRequestDto, dto));
    expect(errors.length).toBe(0);
  });

  it('should fail with invalid enum value for role', async () => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const dto = getValidDto() as any;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    dto.role = 'invalid-role';
    const errors = await validate(plainToInstance(GetRequestDto, dto));
    expect(errors.some((e) => e.property === 'role')).toBeTruthy();
  });

  it('should fail when hobbies is empty', async () => {
    const dto = getValidDto();
    dto.hobbies = [];
    const errors = await validate(plainToInstance(GetRequestDto, dto));
    expect(errors.some((e) => e.property === 'hobbies')).toBeTruthy();
  });

  it('should fail when birthDate is not ISO date', async () => {
    const dto = getValidDto();
    dto.birthDate = '13/10/2025';
    const errors = await validate(plainToInstance(GetRequestDto, dto));
    expect(errors.some((e) => e.property === 'birthDate')).toBeTruthy();
  });

  it('should fail when name exceeds length', async () => {
    const dto = getValidDto();
    dto.name = 'a'.repeat(101);
    const errors = await validate(plainToInstance(GetRequestDto, dto));
    expect(errors.some((e) => e.property === 'name')).toBeTruthy();
  });

  it('should fail when age is negative', async () => {
    const dto = getValidDto();
    dto.age = -5;
    const errors = await validate(plainToInstance(GetRequestDto, dto));
    expect(errors.some((e) => e.property === 'age')).toBeTruthy();
  });
});
