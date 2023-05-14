import axios, { Axios } from 'axios';
import { AceLogger } from './ace-logger';

export class NftgoApi {
  private constructor() {}

  private static _axios: Axios;

  static async init(config: any) {
    this._axios = axios.create({
      baseURL: config.baseURL,
    });
    this._axios.defaults.headers.common['Accept-Encoding'] = 'identity';
    this._axios.defaults.headers.common['X-API-KEY'] = config.apiKey;
  }

  public static async get(url) {
    try {
      return await this._axios.get(url);
    } catch (e) {
      AceLogger.logger.error(e);
      return null;
    }
  }
}
