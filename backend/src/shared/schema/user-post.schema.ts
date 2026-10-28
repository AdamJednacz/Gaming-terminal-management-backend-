import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsBoolean,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsStrongPassword,
  MaxLength,
  MinLength,
} from 'class-validator';
import { UserRole } from '../enums/users-role.enum';

class UserPostSchema {
  @ApiProperty({
    example: 'John',
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(64)
  @MinLength(2)
  firstName: string;

  @ApiProperty({
    example: 'Doe',
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(64)
  @MinLength(2)
  lastName: string;

  @ApiProperty({
    example: 'john.doe@domain.com',
  })
  @IsNotEmpty()
  @IsEmail()
  @Transform(({ value }: { value: string }) => value?.toLowerCase())
  email: string;
  @ApiProperty({
    required: true,
  })
  @IsNotEmpty()
  @IsBoolean()
  termsOfService: boolean;

  @ApiProperty({
    example: 'Password123!',
  })
  @IsNotEmpty()
  @IsStrongPassword({
    minLength: 8,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 1,
  })
  password: string;

  @ApiProperty({
    required: false,
    enum: UserRole,
    enumName: 'UserRole',
    default: UserRole.TECHNICIAN,
  })
  @IsOptional()
  @IsEnum(UserRole)
  role?: UserRole;
}

export default UserPostSchema;
