import { EntityModel } from '@midwayjs/orm';
import { Index, Column } from 'typeorm';
import { BaseEntity } from './base/base-entity';

export enum RegSource {
  tg = 1,
}

@EntityModel({ name: 'users' })
@Index(['username'], { unique: true })
export class User extends BaseEntity {
  @Column({
    name: 'username',
  })
  username: string;

  @Column({ name: 'reg_source' })
  regSource: number;

  @Column({ name: 'reg_id' })
  regId: string;

  @Column({ default: 'en_US' })
  locale: string;

  public static genUsername(name: string, source: RegSource) {
    return `${source}-${name}`;
  }
}
