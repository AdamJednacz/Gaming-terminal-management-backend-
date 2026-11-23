// import { Controller } from '@nestjs/common';
import { Controller } from '@nestjs/common/decorators/core/controller.decorator';
import { ApiTags } from '@nestjs/swagger';
import { Endpoint } from '../../../shared/decorator/endpoint.decorator';
import { HttpMethod } from '../../../shared/enums/http-method.enum';
import { Paths } from '../../../shared/enums/path.enums';
import { Body, HttpStatus, Res, UseGuards } from '@nestjs/common';
import UserPostSchema from '../../../shared/schema/user-post.schema';
import { UserModel } from '../../../shared/model/user.model';
import type { ApiResponse } from '../../../shared/types/api-response.type';
import type { Request, Response } from 'express';
import { AuthService } from '../service/auth.service';
import AuthLoginSchema from '../../../shared/schema/auth-login.schema';
import { TokensModel } from '../../../shared/model/token.model';
import { LocalAuthGuard } from '../guard/local-auth.guard';
import { JwtAuthGuard } from '../guard/jwt-auth.guard';
import { CurrentUser } from '../../../shared/decorator/currentUser.decorator';
import type { JwtPayload } from '../../../shared/types/jwt-payload';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    // private readonly loggerService: LoggerService,
  ) {}
  //signUp
  //signIn
  //verifyUser
  //resetPassword

  @Endpoint({
    method: HttpMethod.POST,
    path: Paths.SIGN_UP,
    httpCode: HttpStatus.CREATED,
    bodySchema: UserPostSchema,
    responseSchema: UserModel,
    description: 'Registers a new user in the system',
  })
  async signUp(
    @Body() payload: UserPostSchema,
    @Res() res: Response,
  ): ApiResponse<UserModel> {
    const responseObject = await this.authService.signUp(payload);
    return res.send(responseObject);
  }
  @UseGuards(LocalAuthGuard)
  @Endpoint({
    method: HttpMethod.POST,
    path: Paths.SIGN_IN,
    bodySchema: AuthLoginSchema,
    responseSchema: TokensModel,
    description: 'Authenticates a user and returns access and refresh tokens',
  })
  async signIn(@Res() res: Response, @Body() payload: AuthLoginSchema) {
    const responseObject = await this.authService.signIn(payload);
    return res.send(responseObject);
  }

  @UseGuards(JwtAuthGuard)
  @Endpoint({
    method: HttpMethod.GET,
    path: Paths.AUTH_ME,
    responseSchema: UserModel,
    description: 'Retrieves the currently authenticated user information',
  })
  async authMe(@Res() res: Response, @CurrentUser() user: JwtPayload) {
    const responseObject = await this.authService.getMe(user.email);
    return res.send(responseObject);
  }
}

//błędy posprawdzać obsługa błedów-
