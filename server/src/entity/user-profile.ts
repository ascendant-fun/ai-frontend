import { EntityModel } from '@midwayjs/orm';
import { Column, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from './base/base-entity';
import { User } from './user';

export enum GenderType {
  female = 0,
  male = 1,
  trans_female = 2,
  trans_male = 3,
}

export enum RelationshipType {
  myself = 1,
  date = 2,
  friend = 3,
  family = 4,
}

@EntityModel({ name: 'user_profiles' })
export class UserProfile extends BaseEntity {
  @Column()
  nickname: string;

  @Column()
  gender: number;

  @Column()
  relationship: number;

  @Column()
  birthday: Date;

  @Column({
    name: 'birth_lat',
    type: 'decimal',
    precision: 50,
    scale: 7,
  })
  birthLat: number;

  @Column({
    name: 'birth_lng',
    type: 'decimal',
    precision: 50,
    scale: 7,
  })
  birthLng: number;

  @Column({ name: 'birth_location' })
  birthLocation: string;

  @Column({
    name: 'current_lat',
    type: 'decimal',
    precision: 50,
    scale: 7,
  })
  currentLat: number;

  @Column({
    name: 'current_lng',
    type: 'decimal',
    precision: 50,
    scale: 7,
  })
  currentLng: number;

  @Column({ name: 'cur_location' })
  curLocation: string;

  @Column({
    name: 'natal_chart_raw',
    type: 'text',
    nullable: true,
  })
  natalChartRaw: string;

  @Column({
    name: 'natal_chart_str',
    type: 'text',
    nullable: true,
  })
  natalChartStr: string;

  @Column({ name: 'user_id' })
  userId: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;
}
