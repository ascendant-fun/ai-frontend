import {
  Gems,
  LuckySigns,
  LuckyNumbers,
  Flowers,
  LuckyTokens,
} from "../components/Fortune/pages/report.types";

enum ResponseCode {
  SuccessResponse = 0,
  FailResponse = 1,
}

export interface Account {
  id: number;
  avatar?: string;
  nickName: string | null;
  ens: string | null;
  code: string;
  publicAddress: string;
}

interface Whale {
  avatar: string;
  star: number;
  score: number;
  percentile: number;
  publicAddress: string;
}

type AvailableRadarKey = 2 | 3 | 6 | 7 | 10 | 11;
type RadarData = Record<AvailableRadarKey, number>;
type BonanzaTheme =
  | "Trading"
  | "Airdrop"
  | "Mining"
  | "Influencing"
  | "Connecting"
  | "BuidLing";
type BonanzaRoleLabel =
  | "WenLambo"
  | "AirdropBeacon"
  | "GoldenMiner"
  | "Superstar"
  | "HumanRouter"
  | "WinterWarrior";

type BonanzaRole = {
  key: AvailableRadarKey;
  type: BonanzaTheme;
  label: BonanzaRoleLabel;
};

interface UserReport {
  id?: string;
  accountID: number;
  score: number;
  star: number | string;
  percentile: number;
  paragraph: string;
  meme: string;
  embraceHouse: string;
  bewareHouse: string;
  account: Account;
  defeatedWhales: string; // need to parse it
  parsedDefeatedWhales?: Whale[];
  personalityPlanet: string;
  publicAddress: string;
  raderInfo: string; // json
  parsedRadar: RadarData;
  luckyGem: Gems;
  luckyFlower: Flowers;
  luckySign: LuckySigns;
  luckyNo: LuckyNumbers;
  luckyToken: string | null; // JSON
  unluckyToken: string | null; // JSON
  parsedLuckyToken?: LuckyTokenResponse;
  luckyMonths: string | null; // JSON
  parsedLuckyMonths?: LuckyMonthsResponse | null;
  theme: FortuneThemes | null; // e.g. 1-1
}

type ReportParams = {
  lat: string;
  long: string;
  publicAddress: string;
  nickname: string;
  invitationCode?: string;
  utmSource?: string | string[];
};

interface SuccessReportResponse {
  code: ResponseCode.SuccessResponse;
  data: UserReport;
}

interface FailReportResponse {
  code: ResponseCode.FailResponse;
  data: {
    msg: string;
  };
}

type ReportResponse = SuccessReportResponse | FailReportResponse;

interface CityInfo {
  id: number;
  name: string;
  state: string;
  country: string;
  lat: number;
  lng: number;
}

interface SuccessCityResponse {
  code: ResponseCode.SuccessResponse;
  data: CityInfo[];
}

interface FailCityResponse {
  code: ResponseCode.FailResponse;
  data: {
    msg: string;
  };
}

type CityInfoResponse = SuccessCityResponse | FailCityResponse;

// to get wallet highlights
type WalletHighlightsCols =
  | "totalValue"
  | "tokenValue"
  | "ethValue"
  | "nftValue"
  | "nftEarned"
  | "nftTopProfit"
  | "maxTrxValue"
  | "maxTokenTrxValue"
  | "maxNftTrxValue"
  | "totalTrxCount"
  | "totalNftCount"
  | "totalNftCollectionCount"
  | "totalTokenTypeCount"
  | "flipperHero"
  | "flipTime"
  | "diamondHand"
  | "holdLongTime";

type Planets =
  | "pluto"
  | "saturn"
  | "uranus"
  | "sun"
  | "moon"
  | "jupiter"
  | "mercury"
  | "neptune"
  | "mars"
  | "venus";

type WalletHighlightParams = {
  publicAddress: string;
};

type WalletHighlightsStatusSuccess = 3;

export type WalletHighlightsData = {
  status: 1 | 2 | WalletHighlightsStatusSuccess;
  publicAddress: string;
  topValues: string;
  // totalValue: number;
  // tokenValue: number;
  // nftValue: number;
  // nftEarned: number;
  // nftTopProfit: number;
  // maxTrxValue: number;
  // maxTokenTrxValue: number;
  // maxNftTrxValue: number;
  // totalTrxCount: number;
  // totalNftCount: number;
  // totalNftCollectionCount: number;
  // totalTokenTypeCount: number;
  flipperHero: string; //JSON
  // flipTime: number;
  diamondHand: string; // JSON
  holdLongTime: number;
};

type NFTInfo = {
  name: string;
  image_url: string;
};

type WalletHighlightTopValue = {
  col: WalletHighlightsCols;
  house: number;
  keyword: string;
  priority: number;
  star: Planets;
  value: number;
  imageUrl?: string;
};

type WalletHighlightTopValues = WalletHighlightTopValue[];

type getWalletHighlightResponse = {
  isReady: boolean;
  data: WalletHighlightTopValues;
};

interface SuccessWalletHighlightsResponse {
  code: ResponseCode.SuccessResponse;
  data: WalletHighlightsData;
}

// this should not happen
interface FailedWalletHighlightsResponse {
  code: ResponseCode.FailResponse;
}

type WalletHighlightsResponse =
  | SuccessWalletHighlightsResponse
  | FailedWalletHighlightsResponse;

type LuckyTokenResponse = {
  name: LuckyTokens;
  score: number;
};

type LuckyMonthValues = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

type LuckyMonthsResponse = {
  maxMonth: string;
  monthScores: Record<LuckyMonthValues, number>;
  sumMonthScore: number;
};

type FortuneThemes =
  | "1-1"
  | "1-2"
  | "1-3"
  | "1-4"
  | "1-5"
  | "2-1"
  | "2-2"
  | "2-3"
  | "2-4"
  | "2-5"
  | "2-6"
  | "2-7"
  | "2-8"
  | "2-9"
  | "2-10"
  | "2-11"
  | "2-12";

type TascSummaryResponse = {
  code: number;
  data: {
    id: number;
    accountID: number;
    publicAddress: string;
    reportScore: number | null;
    sbtScore: number | null;
    inviteSbtCount: number;
    inviteSbtScore: number;
    communityLuckyDrawScore: number;
  };
};

type TascSummary = {
  totalScore: number | null;
  reportScore: number | null;
  sbtScore: number | null;
  inviteSbtCount: number;
  inviteSbtScore: number;
  communityLuckyDrawScore: number;
};

type FriendCard = {
  account: Account;
  highlight: WalletHighlightsData;
  report: UserReport;
};

interface FriendCardsResponse {
  code: ResponseCode.SuccessResponse | ResponseCode.FailResponse;
  data: {
    oneself: FriendCard;
    cards: FriendCard[];
  };
}

interface FriendCardsFailResponse {
  code: ResponseCode.FailResponse;
  data: {
    msg: string;
  };
}

export type {
  UserReport,
  ReportParams,
  ReportResponse,
  SuccessReportResponse,
  FailReportResponse,
  Whale,
  AvailableRadarKey,
  RadarData,
  CityInfo,
  CityInfoResponse,
  SuccessCityResponse,
  FailCityResponse,
  Planets,
  WalletHighlightsStatusSuccess,
  WalletHighlightsResponse,
  WalletHighlightTopValues,
  WalletHighlightParams,
  SuccessWalletHighlightsResponse,
  FailedWalletHighlightsResponse,
  getWalletHighlightResponse,
  WalletHighlightTopValue,
  WalletHighlightsCols,
  NFTInfo,
  LuckyTokenResponse,
  LuckyMonthValues,
  LuckyMonthsResponse,
  FortuneThemes,
  TascSummaryResponse,
  TascSummary,
  FriendCard,
  FriendCardsResponse,
  FriendCardsFailResponse,
  BonanzaRole,
};

export { ResponseCode };
