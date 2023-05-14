import { get, uniqBy, orderBy } from "lodash";

import { LuckyTokens } from "../components/Fortune/pages/report.types";
import {
  AvailableRadarKey,
  RadarData,
  FortuneThemes,
  LuckyMonthsResponse,
  WalletHighlightTopValues,
} from "../types/ApiClient";
import {
  FortuneThemeMapping,
  LuckyRoles,
  TokenList,
  MonthsInfo,
  BonanzaRoleList,
  PrologueList,
  CelebrityMap,
  WalletHighlightDescriptionList,
  TrendBonanzaDescriptionList,
} from "./constants";

export function camelCase(str: string) {
  return str.replace(/_([a-z])/g, function (match, group1) {
    return group1.toUpperCase();
  });
}

export function isObject(obj: Record<string, any>) {
  return Object.prototype.toString.call(obj) === "[object Object]";
}

export function toCamelCase(params: Record<string, any>) {
  if (!isObject(params)) return params;

  const result: Record<string, unknown> = {};
  const keys = Object.keys(params);

  for (let key of keys) {
    const value = params[key];
    key = camelCase(key);
    result[key] = isObject(value) ? toCamelCase(value) : value;
  }

  return result;
}

export function getFullYear() {
  return new Date().getFullYear();
}

export function getTokenImgSrc(coin: LuckyTokens | undefined) {
  const base = "/images/coins/";
  const suffix = ".png";

  if (!coin || !TokenList[coin]?.img) return "";

  return base + TokenList[coin]?.img + suffix;
}

export function getTokenFullName(coin: LuckyTokens | undefined) {
  if (!coin || !TokenList[coin]?.fullName) return "";

  return TokenList[coin].fullName;
}

export function findTheHighestRole(radarData: RadarData | null) {
  if (radarData === null) {
    return "";
  }

  let currentHightestValue = 0;
  let currentHighestRole = "";

  Object.entries(LuckyRoles).forEach(([key, value]) => {
    const index = value.index as AvailableRadarKey;
    if (index in radarData && radarData[index] > currentHightestValue) {
      currentHighestRole = key;
      currentHightestValue = radarData[index];
    }
  });

  return currentHighestRole;
}

export function getThemeInfo(theme: FortuneThemes | null) {
  if (!theme) return FortuneThemeMapping["2-12"];

  return FortuneThemeMapping?.[theme] ?? FortuneThemeMapping["2-12"];
}

export function getLuckyMonth(luckyMonths?: string | null) {
  if (!luckyMonths) {
    return { month: "", year: "" };
  }

  const parsedData = JSON.parse(luckyMonths) as LuckyMonthsResponse;
  return get(MonthsInfo, parsedData.maxMonth);
}

export function getBonanzaThemes(
  radar: RadarData,
  highlights?: WalletHighlightTopValues,
  trendTheme?: string | null
) {
  const formatData = Object.entries(radar).map(([key, value]) => ({
    key,
    value: Number(value),
  }));
  const sortedArr = orderBy(uniqBy(formatData, "value"), "value");
  const top1Item = sortedArr[sortedArr.length - 1];
  const top2Item = sortedArr[sortedArr.length - 2];
  const top1Data = formatData.filter((item) => item.value === top1Item.value);
  const top2Data = formatData.filter((item) => item.value === top2Item.value);

  let tagLength = highlights?.length || 0;

  const top1Tags = BonanzaRoleList.filter((item) =>
    top1Data.map((d) => d.key).includes(item.key.toString())
  );

  const top2Tags = BonanzaRoleList.filter((item) =>
    top2Data.map((d) => d.key).includes(item.key.toString())
  );

  // console.log(formatData, tagLength, top1Tags, top2Tags);

  if (Number(tagLength) >= 2) {
    return top1Tags;
  }

  if (Number(tagLength) < 2) {
    return top1Tags.concat(top2Tags);
  }

  return [];
}

export function getDescriptionByTag(tag: string) {
  if (tag) {
    const item = TrendBonanzaDescriptionList.find((d) => d.tag === tag);
    return item?.description ?? "";
  }

  return "";
}

export function getHighlightDescriptionByTag(tag: string) {
  if (tag) {
    const item = WalletHighlightDescriptionList.find((d) => d.tag === tag);
    return item?.description ?? "";
  }

  return "";
}

export function getUserAvatar(avatar?: string) {
  if (avatar) {
    if (/(http|https):\/\/([\w.]+\/?)\S*/.test(avatar)) {
      return avatar;
    }

    return avatar.startsWith("avatar")
      ? `/images/avatars/${avatar}`
      : `/images/celebrity/${avatar}`;
  }

  const randomNum = (Math.random() * 11).toFixed(0);

  return `/images/avatars/avatar-${randomNum}.png`;
}

export function getPrologue() {
  const randomNum = (Math.random() * 3).toFixed(0);
  return PrologueList[Number(randomNum)];
}

export function getNickName(nickname?: string | null) {
  if (!nickname) {
    return "";
  }

  if (get(CelebrityMap, nickname)) {
    return get(CelebrityMap, nickname);
  }

  let name = nickname;
  const length = nickname.length;

  if (length > 10) {
    name = nickname.substring(0, 10);
    name = name + " " + nickname.substring(10);
  }

  return name;
}
