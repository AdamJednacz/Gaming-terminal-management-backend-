// shared/decorator/current-user.decorator.ts
import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import type { Request } from 'express';
import { JwtPayload } from '../types/jwt-payload';

export const CurrentUser = createParamDecorator(
  (_: unknown, context: ExecutionContext): JwtPayload =>
    context.switchToHttp().getRequest<Request>().user as JwtPayload,
);
