import TelegramBot from 'node-telegram-bot-api';
import { AceLogger } from './ace-logger';
import { TgConst } from '../const/tg';
import { DBManager } from './db-manager';
import { TgChatSession } from '../model/tg-chat-session';
import { RelationshipType, UserProfile } from '../entity/user-profile';
import { GlobalConfig } from './global-config';

export class TgBot {
  private static _instance: TgBot;
  private constructor() {}
  public static get i() {
    return this._instance || (this._instance = new this());
  }

  public static Bot: TelegramBot;
  public static tgConfig;

  public init(config) {
    TgBot.tgConfig = config;

    if (config.polling) {
      TgBot.Bot = new TelegramBot(config.token, { polling: true });
    } else {
      TgBot.Bot = new TelegramBot(config.token, { polling: false });
      TgBot.Bot.setWebHook(`${config.webhook}/bot${config.token}`);
    }

    TgBot.Bot.on('message', TgBot.handleMessage);

    TgBot.Bot.on('callback_query', TgBot.handleCallback);
  }

  public static async handleCallback(callbackQuery: TelegramBot.CallbackQuery) {
    AceLogger.logger.info('get a callbackQuery: ');
    AceLogger.logger.info(callbackQuery);

    switch (callbackQuery.data) {
      case TgConst.CallbackData.langEn:
      case TgConst.CallbackData.langZh: {
        const lang =
          callbackQuery.data == TgConst.CallbackData.langZh ? 'zh_CN' : 'en_Us';
        const session = await TgChatSession.findOrCreate(
          callbackQuery.message.chat.id
        );
        await session.updateLang(lang);
        const opts = {
          reply_markup: TgConst.DirectOneMenu(session),
        };
        TgBot.Bot.sendMessage(
          callbackQuery.message.chat.id,
          GlobalConfig.i.i18n.translate('tg.instructions.directHint', {
            locale: session.user.locale,
          }),
          opts
        );
        break;
      }
      case TgConst.CallbackData.directNatal:
      case TgConst.CallbackData.directCompatibility:
      case TgConst.CallbackData.directFortune: {
        await TgBot.handleDirectFirstLvl(callbackQuery);
        break;
      }
      case TgConst.CallbackData.backToDirectOne: {
        const session = await TgChatSession.findOrCreate(
          callbackQuery.message.chat.id
        );
        TgBot.Bot.editMessageReplyMarkup(TgConst.DirectOneMenu(session), {
          chat_id: callbackQuery.message.chat.id,
          message_id: callbackQuery.message.message_id,
        });
        break;
      }
      case TgConst.CallbackData.backToDialogBtn: {
        TgBot.Bot.editMessageReplyMarkup(
          await TgBot.getDialogBtn(callbackQuery.message.chat.id),
          {
            chat_id: callbackQuery.message.chat.id,
            message_id: callbackQuery.message.message_id,
          }
        );
        break;
      }
      case TgConst.CallbackData.changeTopic: {
        const session = await TgChatSession.findOrCreate(
          callbackQuery.message.chat.id
        );
        TgBot.Bot.editMessageReplyMarkup(
          TgConst.DirectOneMenuWithBack(session),
          {
            chat_id: callbackQuery.message.chat.id,
            message_id: callbackQuery.message.message_id,
          }
        );
        break;
      }
      default: {
        const cmds = callbackQuery.data.split('-');

        if (
          TgConst.CallbackData.directNatal == cmds[0] ||
          TgConst.CallbackData.directCompatibility == cmds[0] ||
          TgConst.CallbackData.directFortune == cmds[0]
        ) {
          await TgBot.handleDirectTwoLvl(callbackQuery, cmds);
        }

        break;
      }
    }
  }

  public static async handleDirectTwoLvl(
    callbackQuery: TelegramBot.CallbackQuery,
    cmds: string[]
  ) {
    const session = await TgChatSession.findOrCreate(
      callbackQuery.message.chat.id
    );
    let text = GlobalConfig.i.i18n.translate('tg.instructions.selectProfile1', {
      locale: session.user.locale,
    });
    const btnText = GlobalConfig.i.i18n.translate('tg.btn.selectProfile', {
      locale: session.user.locale,
    });

    if (TgConst.CallbackData.directCompatibility == cmds[0]) {
      text = GlobalConfig.i.i18n.translate('tg.instructions.selectProfile2', {
        locale: session.user.locale,
      });
    }

    const opts = {
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: btnText,
              web_app: {
                url: `${TgBot.tgConfig.profilePage}?directOne=${cmds[0]}&directTwo=${cmds[1]}`,
              },
            },
          ],
        ],
      },
    };

    if (cmds[0] != TgConst.CallbackData.directNatal || cmds[1] != 'love') {
      TgBot.Bot.sendMessage(
        callbackQuery.message.chat.id,
        GlobalConfig.i.i18n.translate('tg.instructions.comingSoon', {
          locale: session.user.locale,
        })
      );
      return;
    }

    TgBot.Bot.sendMessage(callbackQuery.message.chat.id, text, opts);
  }

  public static async handleDirectFirstLvl(
    callbackQuery: TelegramBot.CallbackQuery
  ) {
    const session = await TgChatSession.findOrCreate(
      callbackQuery.message.chat.id
    );
    const directOne = callbackQuery.data;
    const directTwo = TgConst.DirectSecond(session)[directOne];

    const rowKeys = [];
    for (let i = 0; i < directTwo.length; i++) {
      const data = directTwo[i];
      rowKeys.push({
        text: data.text,
        callback_data: `${directOne}-${data.key}`,
      });
    }

    const reply_markup = {
      inline_keyboard: [
        rowKeys,
        [
          {
            text: GlobalConfig.i.i18n.translate('tg.btn.back', {
              locale: session.user.locale,
            }),
            callback_data: TgConst.CallbackData.backToDirectOne,
          },
        ],
      ],
    };

    AceLogger.logger.info(reply_markup);
    AceLogger.logger.info({
      message_id: callbackQuery.message.message_id,
    });

    TgBot.Bot.editMessageReplyMarkup(reply_markup, {
      chat_id: callbackQuery.message.chat.id,
      message_id: callbackQuery.message.message_id,
    });
  }

  public static async handleCmdStart(msg: TelegramBot.Message) {
    AceLogger.logger.info('handleCmdStart: ');
    AceLogger.logger.info(msg);

    const session = await TgChatSession.findOrCreate(msg.chat.id);
    const text = GlobalConfig.i.i18n.translate('tg.instructions.welcome', {
      locale: session.user.locale,
    });

    const opts = {
      reply_markup: TgConst.LangSelection(session),
    };

    TgBot.Bot.sendMessage(msg.chat.id, text, opts);
  }

  public static async handleMessage(msg) {
    AceLogger.logger.info('handleMessage: ');
    AceLogger.logger.info(msg);

    const session = await TgChatSession.findOrCreate(msg.chat.id);
    await session.save();

    if (
      msg &&
      msg.entities &&
      msg.entities[0] &&
      msg.entities[0].type == 'bot_command'
    ) {
      AceLogger.logger.info(msg.text);

      switch (msg.text) {
        case '/start':
          TgBot.handleCmdStart(msg);
          break;
        default:
          break;
      }

      return;
    }

    const profile = await DBManager.em.findOne(UserProfile, {
      where: {
        userId: session.user.id,
        relationship: RelationshipType.myself,
      },
    });
    if (!profile) {
      TgBot.sendTextWithDefaultBtn(
        session,
        msg.chat.id,
        GlobalConfig.i.i18n.translate('tg.instructions.start', {
          locale: session.user.locale,
        }),
        false
      );
      return;
    }

    TgBot.sendTextWithDefaultBtn(
      session,
      msg.chat.id,
      GlobalConfig.i.i18n.translate('tg.instructions.questionReceived', {
        locale: session.user.locale,
      }),
      false
    );

    const data = "";

    TgBot.sendTextWithDefaultBtn(session, msg.chat.id, data, true, true);
  }

  public static async sendTextWithDefaultBtn(
    session,
    chatId,
    msg,
    needBtn,
    needTrans = false
  ) {
    if (!msg || msg.length <= 0) return;

    const parse_mode = 'HTML';
    const reply_markup = needBtn
      ? await TgBot.getDialogBtn(session)
      : undefined;

    await TgBot.Bot.sendMessage(chatId, msg, { parse_mode, reply_markup });
  }

  public static async getDialogBtn(session) {
    const one = session ? session.directOne : TgConst.CallbackData.directNatal;
    const two = session ? session.directTwo : 'love';

    const reply_markup = {
      inline_keyboard: [
        [
          {
            text: GlobalConfig.i.i18n.translate('tg.btn.switchProfile', {
              locale: session.user.locale,
            }),
            web_app: {
              url: `${TgBot.tgConfig.profilePage}?directOne=${one}&directTwo=${two}`,
            },
          },
          {
            text: GlobalConfig.i.i18n.translate('tg.btn.changeTopic', {
              locale: session.user.locale,
            }),
            callback_data: TgConst.CallbackData.changeTopic,
          },
        ],
      ],
    };

    return reply_markup;
  }
}
