import {
  applyDecorators,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiExtraModels,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { HttpMethod } from '../enums/http-method.enum';

interface SecuredEndpointConfig {
  method?: HttpMethod;
  path?: string;
  bodySchema?: any;
  description: string;
  httpCode?: HttpStatus;
  responseSchema?: any;
  isArray?: boolean;
  extraModel?: any;
}

export function Endpoint(config: SecuredEndpointConfig) {
  const decorators: Array<MethodDecorator | ClassDecorator> = [];

  // HTTP Method
  if (config.method) {
    const methodMap = {
      get: Get,
      post: Post,
      patch: Patch,
      delete: Delete,
      put: Put,
    };
    decorators.push(methodMap[config.method](config.path ?? ''));
  }

  // HTTP Code
  decorators.push(HttpCode(config.httpCode || HttpStatus.OK));

  // Swagger
  if (config.description) {
    decorators.push(ApiOperation({ description: config.description }));
  }
  decorators.push(ApiBearerAuth('jwt'));

  if (config.bodySchema) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    decorators.push(ApiBody({ type: config.bodySchema }));
  }

  if (config.extraModel) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    decorators.push(ApiExtraModels(config.extraModel));
  }

  if (config.responseSchema) {
    decorators.push(
      ApiOkResponse({
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        type: config.responseSchema,
        isArray: config.isArray ?? false,
      }),
    );
  }

  return applyDecorators(...decorators);
}
