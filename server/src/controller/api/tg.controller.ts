import { Inject, Controller, Body, Post } from '@midwayjs/decorator';
import { Context } from '@midwayjs/koa';
import { RtnCode, rtnData } from '../../socket/rtn-data';
import { UserCreateService } from '../../service/user/create';
import { UserProfileCreateService } from '../../service/user/create-profile';
import { UserProfileUpdateService } from '../../service/user/update-profile';
import { DBManager } from '../../utils/db-manager';
import { RegSource, User } from '../../entity/user';
import { UserProfile } from '../../entity/user-profile';
import { TgBot } from '../../utils/tg-bot';
import { ErrorCode } from '../../error-code';
import { AceLogger } from '../../utils/ace-logger';
import TelegramBot from 'node-telegram-bot-api';

@Controller('/tg')
export class TgApiController {
  @Inject()
  ctx: Context;

  @Post('/getUserProfileList')
  async getUserProfileList(@Body('tgUserId') tgUserId: string) {
    const user = await new UserCreateService(tgUserId, RegSource.tg).exec(
      DBManager.em
    );
    const profiles = await DBManager.em.find(UserProfile, {
      where: { userId: user.id },
    });

    return rtnData(profiles);
  }

  @Post('/getUserProfile')
  async getUserProfile(@Body('profileId') profileId: number) {
    const profile = await DBManager.em.findOne(UserProfile, profileId);

    return rtnData(profile);
  }

  @Post('/createUserProfile')
  async createUserProfile(
    @Body('tgUserId') tgUserId: string,
    @Body('nickname') nickname: string,
    @Body('gender') gender: number,
    @Body('relationship') relationship: number,
    @Body('birthday') birthdayStr: number,
    @Body('birthLat') birthLat: number,
    @Body('birthLong') birthLong: number,
    @Body('birthLocation') birthLocation: string,
    @Body('curLat') curLat: number,
    @Body('curLong') curLong: number,
    @Body('curLocation') curLocation: string
  ) {
    const birthday = new Date(birthdayStr);

    const user = await DBManager.em.findOne(User, {
      where: {
        username: User.genUsername(tgUserId, RegSource.tg),
      },
    });
    if (!user) {
      return rtnData({ msg: ErrorCode.USER_EMPTY }, RtnCode.ERROR);
    }

    let profile = await new UserProfileCreateService(
      user,
      nickname,
      gender,
      relationship,
      birthday,
      birthLat,
      birthLong,
      birthLocation,
      curLat,
      curLong,
      curLocation
    ).exec(DBManager.em);

    return rtnData(profile);
  }

  @Post('/updateUserProfile')
  async updateUserProfile(
    @Body('profileId') profileId: number,
    @Body('nickname') nickname: string,
    @Body('gender') gender: number,
    @Body('relationship') relationship: number,
    @Body('birthday') birthdayStr: number,
    @Body('curLat') curLat: number,
    @Body('curLong') curLong: number,
    @Body('curLocation') curLocation: string
  ) {
    const birthday = new Date(birthdayStr);

    let profile = await new UserProfileUpdateService(
      profileId,
      nickname,
      gender,
      relationship,
      birthday,
      curLat,
      curLong,
      curLocation
    ).exec(DBManager.em);

    return rtnData(profile);
  }

  @Post('/update/:code')
  async updateMessage() {
    const params = this.ctx.params;

    AceLogger.logger.info(`get message from tg, msg is: `);
    AceLogger.logger.info(this.ctx.request.body);

    if (params.code != `bot${TgBot.tgConfig.token}`) {
      throw 'Unknown TG update';
    }

    TgBot.Bot.processUpdate(this.ctx.request.body as TelegramBot.Update);

    return true;
  }
}
