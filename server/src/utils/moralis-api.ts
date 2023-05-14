import Moralis from 'moralis';

export class MoralisApi {
  private constructor() {}

  static async init(settings) {
    await Moralis.start({
      apiKey: settings.apiKey,
    });
  }
}
