import axios, { Axios } from 'axios';
import { AceLogger } from './ace-logger';

export class AstrologyApi {
  private constructor() {}

  private static _axios: Axios;

  static async init(config: any) {
    this._axios = axios.create({
      baseURL: config.baseURL,
    });
    this._axios.defaults.headers.common['Accept-Encoding'] = 'identity';
    this._axios.defaults.headers.common['Authorization'] =
      'Basic ' +
      Buffer.from(config.userId + ':' + config.apiKey, 'binary').toString(
        'base64'
      );
  }

  public static async westernHoroscope(
    birthday: Date,
    lat: number,
    lon: number
  ) {
    const params = {
      day: birthday.getUTCDate(),
      month: birthday.getUTCMonth() + 1,
      year: birthday.getUTCFullYear(),
      hour: birthday.getUTCHours(),
      min: birthday.getUTCMinutes(),
      lat,
      lon,
      tzone: 0, // utc time
    };
    try {
      return await this._axios.post('western_horoscope', params);
    } catch (e) {
      AceLogger.logger.error(e);
      return null;
    }
  }
}
