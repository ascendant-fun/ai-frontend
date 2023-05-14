import { TgConst } from '../const/tg';
import { RegSource, User } from '../entity/user';
import { UserCreateService } from '../service/user/create';
import { AceLogger } from '../utils/ace-logger';
import { DBManager } from '../utils/db-manager';
import { RedisUtils } from '../utils/redis';

export class TgChatSession {
  public tgUserId: number;
  public directOne: string;
  public directTwo: string;
  public profileIds: number[];
  public user: User;

  constructor(tgUserId: number) {
    this.tgUserId = tgUserId;
    this.directOne = TgConst.CallbackData.directNatal;
    this.directTwo = 'love';
  }

  public async initUser() {
    this.user = await new UserCreateService(
      String(this.tgUserId),
      RegSource.tg
    ).exec(DBManager.em);
  }

  public async updateLang(lang) {
    this.user.locale = lang;
    this.user = await DBManager.em.save(this.user);
  }

  private static async _loadFromRedis(tgUserId: number) {
    const sessionString = await RedisUtils.client.get(tgUserId);

    if (sessionString) {
      try {
        const sessionJson = JSON.parse(sessionString);
        const session = new TgChatSession(sessionJson['tgUserId']);
        session.updateReadingDirection(
          sessionJson['directOne'],
          sessionJson['directTwo'],
          sessionJson['profileIds']
        );
        await session.initUser();
        return session;
      } catch (err) {
        AceLogger.logger.error(err);
        return null;
      }
    }

    return null;
  }

  static async findOrCreate(tgUserId) {
    const session = await this._loadFromRedis(tgUserId);
    if (!session) {
      const session = new TgChatSession(tgUserId);
      await session.initUser();
      await session.save();
    }

    return session;
  }

  static async del(tgUserId: string) {
    await RedisUtils.client.del(tgUserId);
  }

  public toJson() {
    return JSON.stringify({
      tgUserId: this.tgUserId,
      directOne: this.directOne,
      directTwo: this.directTwo,
      profileIds: this.profileIds,
    });
  }

  public updateReadingDirection(directOne, directTwo, profileIds) {
    this.directOne = directOne;
    this.directTwo = directTwo;
    this.profileIds = profileIds;
  }

  async save() {
    await RedisUtils.client.set(this.tgUserId, this.toJson());
    await RedisUtils.client.persist(this.tgUserId);
  }
}
