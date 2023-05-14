import axios from 'axios';
import { AceLogger } from './ace-logger';

export class HttpService {
  private constructor() {}

  static async get(url) {
    try {
      const resp = await axios.get(url, {
        headers: { 'Accept-Encoding': 'identity' },
      });
      return resp.data;
    } catch (e) {
      AceLogger.logger.error(`get url(${url}) error: `, e);
      return null;
    }
  }
}
