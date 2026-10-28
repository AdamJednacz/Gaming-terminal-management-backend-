import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { UserRole } from '../shared/enums/users-role.enum';
import { _BaseEntity } from './base.entity';

@Entity('users')
export class UserEntity extends _BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @Column({ length: 100 })
  firstName: string;

  @Column({ length: 100 })
  lastName: string;

  @Column({ unique: true })
  email: string;

  @Column({ name: 'password_hash', select: false })
  passwordHash: string;
  @Column({ default: false })
  termsOfService: boolean;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.OPERATOR,
  })
  role: UserRole;
}
