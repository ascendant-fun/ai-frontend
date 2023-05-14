import { EntityManager } from 'typeorm';

export interface IServiceable {
  exec(em: EntityManager): any;
}
