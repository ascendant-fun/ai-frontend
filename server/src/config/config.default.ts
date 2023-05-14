import { MidwayConfig } from '@midwayjs/core';
import { Network } from 'alchemy-sdk';
import { abi } from './contracts/sbt';

export default {
  // use for cookie sign key, should change to your own and keep security
  keys: '',
  DB_ID: '', // localSamDev, localSamTest, dev1, dev2, test1, pro1
  debug: false,
  koa: {
    port: 7001,
  },
  socketIO: {
    port: 4000,
    cors: {
      origin: '*',
      methods: ['GET', 'POST'],
    },
  },
  redis: {
    url: 'redis://127.0.0.1:6379',
  },
  orm: {
    type: 'mysql',
    host: '127.0.0.1',
    port: 3306,
    username: '',
    password: '',
    database: '',
    entities: [__dirname + '/../entity/*'],
    synchronize: true,
    logging: false,
    extra: {
      decimalNumbers: true,
      charset: 'utf8mb4_unicode_ci',
    },
  },
  task: {
    redis: 'redis://127.0.0.1:6379',
    prefix: 'midway-task',
  },
  alchemyApi: {
    apiKey: 'demo', // Replace with your Alchemy API Key.
    network: Network.ETH_MAINNET, // Replace with your network.
  },
  astrologyApi: {
    baseURL: '',
    userId: '',
    apiKey: '',
  },
  astro: {
    baseURL: '',
  },
  moralisApi: {
    apiKey: '',
  },
  nftgo: {
    apiKey: '',
  },
  eth: {
    rpc: 'https://mainnet.infura.io/v3/',
  },
  blockchain: {
    rpc: '',
    contracts: { sbt: { address: '', abi } },
  },
} as MidwayConfig;
