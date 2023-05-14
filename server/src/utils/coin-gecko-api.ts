import axios, { Axios } from 'axios';
import { AceLogger } from './ace-logger';

export class CoinGeckoApi {
  private constructor() {}

  private static _axios: Axios;

  static async init() {
    this._axios = axios.create();
    this._axios.defaults.headers.common['Accept-Encoding'] = 'identity';
  }

  public static async coinList() {
    const path =
      'https://api.coingecko.com/api/v3/coins/list?include_platform=true';
    try {
      const res = await this._axios.get(path);
      return res.data;
    } catch (e) {
      AceLogger.logger.error(`get path(${path}) error: `, e);
      return null;
    }
  }

  public static async coinPriceListByCategory(page=1, pageSize=250, category='ethereum-ecosystem', currency='usd') {
    const path = encodeURI(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&category=${category}&order=market_cap_desc&per_page=${pageSize}&page=${page}&sparkline=false`
    );
    try {
      const res = await this._axios.get(path);
      return res.data;
    } catch (e) {
      AceLogger.logger.error(`get path(${path}) error: `, e);
      return null;
    }
  }
}
