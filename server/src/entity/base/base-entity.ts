import { DBManager } from '../../utils/db-manager';
import {
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  EntityTarget,
  EntityManager,
} from 'typeorm';

export abstract class BaseEntity {
  static async reload<Entity>(
    entityClass: EntityTarget<Entity>,
    objID: number,
    em = DBManager.em
  ): Promise<Entity> {
    return await em.findOne(entityClass, objID);
  }

  static async lockBy<Entity>(
    em: EntityManager,
    entityClass: EntityTarget<Entity>,
    condition: any
  ): Promise<Entity> {
    const conds = {
      ...condition,
      lock: { mode: 'pessimistic_write' },
    };
    return await em.findOne(entityClass, conds);
  }

  @PrimaryGeneratedColumn({ comment: '' })
  id: number;

  @CreateDateColumn({ name: 'create_at', comment: '' })
  createAt: Date;

  @UpdateDateColumn({ name: 'update_at', comment: '' })
  updateAt: Date;

  @DeleteDateColumn({ name: 'delete_at', comment: '' })
  deleteAt: Date;
}
