import { CreateDateColumn, UpdateDateColumn } from 'typeorm';

export class _BaseEntity {
  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
