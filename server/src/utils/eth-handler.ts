import { ethers } from 'ethers';
import { AceLogger } from './ace-logger';

export class EthHandler {
  private static _instance: EthHandler;
  private constructor() {}
  public static get i() {
    return this._instance || (this._instance = new this());
  }

  public provider;

  init(config) {
    this.provider = new ethers.providers.JsonRpcProvider(config.rpc);
    AceLogger.logger.info('Eth Handler inited, with config: ', config.rpc);
  }
}
