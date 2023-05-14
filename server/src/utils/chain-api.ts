import { AceLogger } from './ace-logger';
import { ethers } from 'ethers';

export class ChainApiUtils {
  private constructor() {}

  public static sbtContract: any;

  private static _getContract(provider: any, config: any) {
    return new ethers.Contract(config.address, config.abi, provider);
  }

  static init(config: any) {
    const provider = new ethers.providers.JsonRpcProvider(config.rpc);
    this.sbtContract = this._getContract(provider, config.contracts.sbt);
    AceLogger.logger.info('BlockchainApi inited!');
  }
}
