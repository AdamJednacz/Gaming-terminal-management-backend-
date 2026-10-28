import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';

class AuthLoginSchema {
  @IsNotEmpty()
  @IsString()
  @Transform(({ value }: { value: string }) => value?.toLowerCase())
  @ApiProperty({
    example: 'john.doe@domain.com',
  })
  email: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'Password123!',
  })
  password: string;
}

export default AuthLoginSchema;
