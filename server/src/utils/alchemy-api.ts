import { Alchemy } from 'alchemy-sdk';

export class AlchemyApi {
  private constructor() {}

  public static api: Alchemy;

  static init(settings) {
    this.api = new Alchemy(settings);
  }
}
