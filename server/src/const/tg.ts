import { GlobalConfig } from '../utils/global-config';

export namespace TgConst {
  export enum CallbackData {
    directNatal = 'directNatal',
    directCompatibility = 'directCompatibility',
    directFortune = 'directFortune',
    backToDirectOne = 'backToDirectOne',
    backToDialogBtn = 'backToDialogBtn',
    changeTopic = 'changeTopic',
    langEn = 'langEn',
    langZh= 'langZh',
  }

  export function DirectSecond(session) {
    return {
      [CallbackData.directNatal]: [
        {
          key: 'love',
          text: GlobalConfig.i.i18n.translate('tg.btn.directLove', {
            locale: session.user.locale,
          }),
        },
        {
          key: 'money',
          text: GlobalConfig.i.i18n.translate('tg.btn.directMoney', {
            locale: session.user.locale,
          }),
        },
        {
          key: 'career',
          text: GlobalConfig.i.i18n.translate('tg.btn.directCareer', {
            locale: session.user.locale,
          }),
        },
      ],
      [CallbackData.directCompatibility]: [
        {
          key: 'love',
          text: GlobalConfig.i.i18n.translate('tg.btn.directLove', {
            locale: session.user.locale,
          }),
        },
        {
          key: 'business-partner',
          text: GlobalConfig.i.i18n.translate('tg.btn.directBusinessPartner', {
            locale: session.user.locale,
          }),
        },
        {
          key: 'friend',
          text: GlobalConfig.i.i18n.translate('tg.btn.directFriend', {
            locale: session.user.locale,
          }),
        },
      ],
      [CallbackData.directFortune]: [
        {
          key: 'love',
          text: GlobalConfig.i.i18n.translate('tg.btn.directLove', {
            locale: session.user.locale,
          }),
        },
        {
          key: 'money',
          text: GlobalConfig.i.i18n.translate('tg.btn.directMoney', {
            locale: session.user.locale,
          }),
        },
        {
          key: 'career',
          text: GlobalConfig.i.i18n.translate('tg.btn.directCareer', {
            locale: session.user.locale,
          }),
        },
      ],
    };
  }

  export function LangSelection(session) {
    return {
      inline_keyboard: [
        [
          {
            text: GlobalConfig.i.i18n.translate('tg.btn.LangEn', {
              locale: session.user.locale,
            }),
            callback_data: TgConst.CallbackData.langEn,
          },
        ],
        [
          {
            text: GlobalConfig.i.i18n.translate('tg.btn.LangZh', {
              locale: session.user.locale,
            }),
            callback_data: TgConst.CallbackData.langZh,
          },
        ],
      ],
    };
  }

  export function DirectOneMenu(session) {
    return {
      inline_keyboard: [
        [
          {
            text: GlobalConfig.i.i18n.translate('tg.btn.directNatal', {
              locale: session.user.locale,
            }),
            callback_data: TgConst.CallbackData.directNatal,
          },
        ],
        [
          {
            text: GlobalConfig.i.i18n.translate('tg.btn.directCompatibility', {
              locale: session.user.locale,
            }),
            callback_data: TgConst.CallbackData.directCompatibility,
          },
        ],
        [
          {
            text: GlobalConfig.i.i18n.translate('tg.btn.directFortune', {
              locale: session.user.locale,
            }),
            callback_data: TgConst.CallbackData.directFortune,
          },
        ],
      ],
    };
  }

  export function DirectOneMenuWithBack(session) {
    return {
      inline_keyboard: [
        [
          {
            text: GlobalConfig.i.i18n.translate('tg.btn.directNatal', {
              locale: session.user.locale,
            }),
            callback_data: TgConst.CallbackData.directNatal,
          },
        ],
        [
          {
            text: GlobalConfig.i.i18n.translate('tg.btn.directCompatibility', {
              locale: session.user.locale,
            }),
            callback_data: TgConst.CallbackData.directCompatibility,
          },
        ],
        [
          {
            text: GlobalConfig.i.i18n.translate('tg.btn.directFortune', {
              locale: session.user.locale,
            }),
            callback_data: TgConst.CallbackData.directFortune,
          },
        ],
        [
          {
            text: GlobalConfig.i.i18n.translate('tg.btn.back', {
              locale: session.user.locale,
            }),
            callback_data: TgConst.CallbackData.backToDialogBtn,
          },
        ],
      ],
    };
  }
}
