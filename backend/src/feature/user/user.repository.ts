import { Injectable } from '@nestjs/common';

import { UserEntity } from '../../entities/user.entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class UserRepository extends Repository<UserEntity> {
  constructor(dataSource: DataSource) {
    super(UserEntity, dataSource.createEntityManager());
  }
  // selectByUuid
  //select
  selectByEmail(
    email: string,
    selectPassword = false,
  ): Promise<UserEntity | null> {
    if (selectPassword) {
      return this.createQueryBuilder('user')
        .where('user.email = :email', { email })
        .addSelect('user.passwordHash')
        .getOne();
    } else {
      return this.findOne({ where: { email } });
    }
  }
}
