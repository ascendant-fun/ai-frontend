import { createClient } from 'redis';

export class RedisUtils {
  static client: any;
  private constructor() {}

  static async init(config: any) {
    const client = createClient({
      url: config.url,
    });
    client.on('error', (err) => console.log('Redis Client Error', err));
    await client.connect();
    this.client = client;
  }
}
