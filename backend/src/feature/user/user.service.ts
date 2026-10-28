import { Injectable, NotFoundException } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { UserModel } from '../../shared/model/user.model';

@Injectable()
export class UserService {
  // findbyEmaill/
  constructor(private readonly userRepository: UserRepository) {}

  async findByEmail(email: string): Promise<UserModel> {
    const user = await this.userRepository.selectByEmail(email);
    if (!user) {
      throw new NotFoundException('User never exist');
    }
    return UserModel.fromEntity(user);
  }
}
