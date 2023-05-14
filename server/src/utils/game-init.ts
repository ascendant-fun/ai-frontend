import { SocketManager } from '../socket/socket-manager';
import { Application as SocketApplication } from '@midwayjs/socketio';
import { AceLogger } from './ace-logger';
import { DBManager } from './db-manager';
import { RedisUtils } from './redis';
import { AlchemyApi } from './alchemy-api';
import { MoralisApi } from './moralis-api';
import { CoinGeckoApi } from './coin-gecko-api';
import { AstrologyApi } from './astrology-api';
import { EthHandler } from './eth-handler';
import { NftgoApi } from './nftgo-api';
import { ChainApiUtils } from './chain-api';
import { GlobalConfig } from './global-config';
import { OpenApi } from './open-api';
import { TgBot } from './tg-bot';

export class GameInit {
  // 这样在外部就不能实例化该类了
  private constructor() {}

  static async init(
    logger,
    socketApp: SocketApplication,
    config: any,
    bullFramework,
    i18nService,
    skipCoin
  ) {
    DBManager.init();
    AceLogger.init(logger);
    SocketManager.init(socketApp);
    RedisUtils.init(config.redis);
    AlchemyApi.init(config.alchemyApi);
    AstrologyApi.init(config.astrologyApi);
    MoralisApi.init(config.moralisApi);
    CoinGeckoApi.init();
    NftgoApi.init(config.nftgo);
    EthHandler.i.init(config.eth);
    ChainApiUtils.init(config.blockchain);
    GlobalConfig.i.init(config, bullFramework, i18nService);
    OpenApi.i.init(config.openApi);
    TgBot.i.init(config.tg);
  }
}
