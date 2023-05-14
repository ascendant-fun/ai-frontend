import * as bull from '@midwayjs/bull';
import * as i18n from '@midwayjs/i18n';

export class GlobalConfig {
  private static _instance: GlobalConfig;
  private constructor() {}
  public static get i() {
    return this._instance || (this._instance = new this());
  }

  public configs;
  public bullFramework: bull.Framework;
  public i18n: i18n.MidwayI18nServiceSingleton;

  init(config, bullFramework, i18nService) {
    this.configs = config;
    this.bullFramework = bullFramework;
    this.i18n = i18nService;
  }
}
