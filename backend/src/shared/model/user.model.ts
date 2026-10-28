import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from '../enums/users-role.enum';

import { UserEntity } from '../../entities/user.entity';
export class UserModel {
  @ApiProperty({
    example: 'bc3b02a2-72a4-401b-bded-2b4f43be926b',
  })
  uuid: string;

  @ApiProperty({
    example: 'john.doe@domain.com',
  })
  email: string;
  @ApiProperty({ example: 'John' })
  firstName: string;
  @ApiProperty({ example: 'Doe' })
  lastName: string;
  @ApiProperty({
    example: UserRole.TECHNICIAN,
    enumName: 'UserRole',
    enum: UserRole,
  })
  role: UserRole;
  @ApiProperty({
    example: new Date(),
  })
  createdAt: Date;

  @ApiProperty({
    example: new Date(),
  })
  updatedAt: Date;

  @ApiProperty({
    example: true,
  })
  termsOfService: boolean;
  constructor(model: UserModel) {
    Object.assign(this, model);
  }

  static fromEntity(entity: UserEntity): UserModel {
    return new UserModel({
      uuid: entity.uuid,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
      email: entity.email,
      firstName: entity.firstName,
      lastName: entity.lastName,
      role: entity.role,
      termsOfService: entity.termsOfService,
    });
  }
}
