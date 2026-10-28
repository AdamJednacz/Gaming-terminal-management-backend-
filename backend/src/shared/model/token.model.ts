import { ApiProperty } from '@nestjs/swagger';

export class TokensModel {
  @ApiProperty()
  accessToken: string;

  constructor(model: TokensModel) {
    Object.assign(this, model);
  }
}
