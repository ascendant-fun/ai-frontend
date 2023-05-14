import { EntityManager, getManager } from 'typeorm';

export class DBManager {
  private constructor() {}

  public static em: EntityManager;

  static init() {
    this.em = getManager();
  }

  static async getList(
    entityModel,
    conditions,
    page: number,
    pageLimit: number = 10,
    relations = [],
    orders = {}
  ) {
    if (page < 1) page = 1;

    const skip = (page - 1) * pageLimit;

    const [result, total] = await DBManager.em.findAndCount(entityModel, {
      take: pageLimit,
      skip: skip,
      where: conditions,
      order: orders,
      relations: relations,
    });

    return {
      result: result,
      count: total,
      page: page,
      pageLimit: pageLimit,
    };
  }
}
