import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import UserPostSchema from '../../../shared/schema/user-post.schema';
import { UserModel } from '../../../shared/model/user.model';
import { CryptoService } from '../../../shared/service/crypto.service';
import { UserRepository } from '../../user/user.repository';
import { AuthInput } from '../../../shared/types/auth-input.type';

import { AuthResult } from '../../../shared/types/auth-result.type';
import { selectOrThrow } from '../../../shared/utils/select-or-throw';
import { JwtService } from '@nestjs/jwt';
import { SignInData } from '../../../shared/types/sign-in.type';

@Injectable()
export class AuthService {
  constructor(
    private readonly cryptoService: CryptoService,
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}
  public async signUp(payload: UserPostSchema): Promise<UserModel> {
    if (!payload.termsOfService) {
      throw new Error('terms of service need to be accepted');
    }
    const emailTaken = await this.userRepository.exists({
      where: { email: payload.email },
    });
    if (emailTaken) {
      throw new ConflictException('Emails already in use');
    }

    const hashedPassword = await this.cryptoService.hash(payload.password);

    const user = await this.userRepository.save(
      this.userRepository.create({
        firstName: payload.firstName,
        lastName: payload.lastName,
        email: payload.email,
        termsOfService: payload.termsOfService,
        passwordHash: hashedPassword,
        role: payload.role,
      }),
    );
    return UserModel.fromEntity(user);
  }

  async validateUser(input: AuthInput): Promise<UserModel> {
    const user = await selectOrThrow(
      this.userRepository.selectByEmail(input.email, true),
      new UnauthorizedException('Invalid Credentials'),
    );

    const isPasswordValid = await this.cryptoService.compare(
      input.password,
      user.passwordHash,
    );
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid Credentials');
    }

    return UserModel.fromEntity(user);
  }

  async signIn(signInData: SignInData): Promise<AuthResult> {
    const currentUser = await this.validateUser(signInData);
    const tokenPayload = {
      email: currentUser.email,
      uuid: currentUser.uuid,
    };

    const accessToken = await this.jwtService.signAsync(tokenPayload);

    return { accessToken, uuid: currentUser.uuid, email: currentUser.email };
  }
}
