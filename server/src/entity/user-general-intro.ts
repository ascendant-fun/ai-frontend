import { EntityModel } from '@midwayjs/orm';
import { Index, Column } from 'typeorm';
import { BaseEntity } from './base/base-entity';

export enum GeneralIntroType {
  natalLove = 1,
}

export enum GeneralIntroStatus {
  doing = 1,
  done = 2,
}

@EntityModel({ name: 'user_general_intros' })
@Index(['userId', 'profileId', 'type'], { unique: true })
export class UserGeneralIntro extends BaseEntity {
  @Column({ name: 'user_id' })
  userId: number;

  @Column({ name: 'profile_id' })
  profileId: number;

  @Column()
  type: number;

  @Column()
  status: number;

  @Column({ name: 'raw_info', type: 'text' })
  rawInfo: string;

  @Column({ type: 'text' })
  paragraphs: string;
}
