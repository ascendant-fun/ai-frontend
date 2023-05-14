import axios, { Axios } from 'axios';
import { AceLogger } from './ace-logger';

export class OpenApi {
  private static _instance: OpenApi;
  private constructor() {}
  public static get i() {
    return this._instance || (this._instance = new this());
  }

  private _axios: Axios;

  async init(config) {
    this._axios = axios.create({
      baseURL: config.baseURL,
    });
    this._axios.defaults.headers.common['Accept-Encoding'] = 'identity';
    this._axios.defaults.headers.common[
      'Authorization'
    ] = `Bearer ${config.apiKey}`;
    this._axios.defaults.headers.common['OpenAI-Organization'] = config.orgID;
  }

  async listModels() {
    try {
      const url = `/v1/models`;
      return await this._axios.get(url);
    } catch (e) {
      AceLogger.logger.error(e);
      return null;
    }
  }

  async createChatCompletion(prompt: string) {
    try {
      const url = `/v1/chat/completions`;
      const params = {
        // model: 'gpt-3.5-turbo-0301',
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: prompt }],
      };
      AceLogger.logger.info(
        'send request of [createChatCompletion] with params: '
      );
      AceLogger.logger.info(params);
      const res = await this._axios.post(url, params);
      AceLogger.logger.info(
        'chat completion is: ',
        res.data.choices[0].message.content
      );
      return res;
    } catch (e) {
      AceLogger.logger.error(e);
      AceLogger.logger.error(e?.response?.data);
      return null;
    }
  }
}
