import axios, { AxiosInstance } from "axios";

import {
  UserReport,
  ReportParams,
  ReportResponse,
  FailReportResponse,
  ResponseCode,
  SuccessReportResponse,
  CityInfo,
  SuccessCityResponse,
  CityInfoResponse,
  WalletHighlightParams,
  SuccessWalletHighlightsResponse,
  WalletHighlightsResponse,
  WalletHighlightTopValues,
  getWalletHighlightResponse,
  NFTInfo,
  TascSummary,
  TascSummaryResponse,
  FriendCard,
  FriendCardsResponse,
  FriendCardsFailResponse,
} from "../types/ApiClient";
import { API_BASE_URL } from "../config";

const bDayError = "account.no.birth";
class BirthdayNotFoundError extends Error {
  constructor(msg: string) {
    super(msg);
    this.name = "BirthdayNotFoundError";
  }
}

class APIClient {
  private client: AxiosInstance;

  constructor() {
    this.client = this.createClient();
  }

  getClient() {
    return this.client;
  }

  private getBaseUrl(): string {
    return API_BASE_URL;
  }

  private createClient() {
    return axios.create({
      baseURL: this.getBaseUrl(),
      headers: {
        "Content-Type": "application/json",
        "Accept-Encoding": "identity",
      },
    });
  }

  async getFortuneResult(
    lat: number,
    long: number,
    address: string,
    nickname: string,
    utmSource?: string | string[],
    invitationCode?: string,
    endpoint: "fortune_telling" | "get_report" = "fortune_telling"
  ): Promise<UserReport> {
    const params: ReportParams = {
      lat: String(lat),
      long: String(long),
      publicAddress: address,
      nickname,
      utmSource,
    };

    // address not the same
    if (invitationCode && invitationCode !== address) {
      params["invitationCode"] = invitationCode;
    }

    const response = await this.client.post<ReportResponse>(
      "/" + endpoint,
      JSON.stringify(params)
    );

    if (response.data?.code === ResponseCode.FailResponse) {
      const errorMsg = (response.data as FailReportResponse).data.msg;

      if (errorMsg === bDayError) {
        throw new BirthdayNotFoundError("Birthday not found");
      }

      throw new Error(errorMsg);
    }

    // parse the data
    const data = response.data as SuccessReportResponse;
    data.data.parsedDefeatedWhales = JSON.parse(data.data.defeatedWhales);
    const parsedRadar = JSON.parse(data.data.raderInfo);

    for (const radarIndex in parsedRadar) {
      parsedRadar[radarIndex] = parseInt(parsedRadar[radarIndex]);
    }
    data.data.parsedRadar = parsedRadar;

    if (typeof data.data.star === "string") {
      data.data.star = parseInt(data.data.star);
    }

    // parse lucky token
    if (data.data.luckyToken && data.data.luckyToken.length > 0) {
      data.data.parsedLuckyToken = JSON.parse(data.data.luckyToken);
    }

    // parse lucky month
    if (data.data.luckyMonths && data.data.luckyMonths.length > 0) {
      data.data.parsedLuckyMonths = JSON.parse(data.data.luckyMonths);
    }

    return data.data;
  }

  async getFortuneResultFromAccountID(accountID: number): Promise<UserReport> {
    const response = await this.client.post<ReportResponse>(
      "/latest_report",
      JSON.stringify({
        accountID,
      })
    );

    if (response.data?.code === ResponseCode.FailResponse) {
      const errorMsg = (response.data as FailReportResponse).data.msg;

      if (errorMsg === bDayError) {
        throw new BirthdayNotFoundError("Birthday not found");
      }

      throw new Error(errorMsg);
    }

    // parse the data
    const data = response.data as SuccessReportResponse;
    data.data.parsedDefeatedWhales = JSON.parse(data.data.defeatedWhales);

    const parsedRadar = JSON.parse(data.data.raderInfo);

    for (const radarIndex in parsedRadar) {
      parsedRadar[radarIndex] = parseInt(parsedRadar[radarIndex]);
    }
    data.data.parsedRadar = parsedRadar;

    if (typeof data.data.star === "string") {
      data.data.star = parseInt(data.data.star);
    }

    return data.data;
  }

  async getCityByName(name: string): Promise<CityInfo[]> {
    const response = await this.client.post<CityInfoResponse>(
      "/city_info",
      JSON.stringify({
        name,
      })
    );

    if (response.data?.code === ResponseCode.FailResponse) {
      const errorMsg = (response.data as FailReportResponse).data.msg;

      throw new Error(errorMsg);
    }

    // parse the data
    const data = response.data as SuccessCityResponse;

    return data.data;
  }

  async getWalletHighlight(
    address: string
  ): Promise<getWalletHighlightResponse> {
    const params: WalletHighlightParams = {
      publicAddress: address,
    };

    const response = await this.client.post<WalletHighlightsResponse>(
      "/highlight_data",
      JSON.stringify(params)
    );

    if (response.data?.code === ResponseCode.FailResponse) {
      // const errorMsg = "Unable to get wallet highlight";

      // throw new Error(errorMsg);
      return {
        isReady: false,
        data: [],
      };
    }

    // parse the data
    const successResponse = response.data as SuccessWalletHighlightsResponse;
    const data = successResponse.data;

    // check the status
    // if not success => keep calling API
    if (data.status !== 3) {
      return {
        isReady: false,
        data: [],
      };
    }

    if (!data.topValues || typeof data.topValues !== "string") {
      return {
        isReady: true,
        data: [],
      };
    }
    const parsedTopValues = JSON.parse(
      data.topValues
    ) as WalletHighlightTopValues;

    // check if we need to add the image url in the object
    if (parsedTopValues && parsedTopValues.length > 0) {
      for (const key in parsedTopValues) {
        const parsedTopValue = parsedTopValues[key];

        if (parsedTopValue.col === "holdLongTime") {
          // look into diamond hand
          if (!data.diamondHand || data.diamondHand.length === 0) {
            parsedTopValues[key].imageUrl = "";
          } else {
            const parsedDiamondHand = JSON.parse(data.diamondHand) as NFTInfo;
            parsedTopValues[key].imageUrl = parsedDiamondHand.image_url;
          }
        } else if (parsedTopValue.col === "flipTime") {
          // look into flipper hero
          if (!data.flipperHero || data.flipperHero.length === 0) {
            parsedTopValues[key].imageUrl = "";
          } else {
            const parsedFlipperJero = JSON.parse(data.flipperHero) as NFTInfo;
            parsedTopValues[key].imageUrl = parsedFlipperJero.image_url;
          }
        }
      }
    }

    return {
      isReady: true,
      data: parsedTopValues,
    };
  }

  async getTascSummary(address: string): Promise<TascSummary> {
    const params: WalletHighlightParams = {
      publicAddress: address,
    };

    const response = await this.client.post<TascSummaryResponse>(
      "/tasc_summary",
      JSON.stringify(params)
    );

    const data = response.data.data;

    const totalScore =
      (data.reportScore ?? 0) +
      (data.sbtScore ?? 0) +
      (data?.inviteSbtScore ?? 0);

    return {
      totalScore: totalScore,
      reportScore: data.reportScore,
      sbtScore: data.sbtScore,
      inviteSbtCount: data?.inviteSbtCount ?? 0,
      inviteSbtScore: data?.inviteSbtScore ?? 0,
      communityLuckyDrawScore: data?.communityLuckyDrawScore ?? 0,
    };
  }

  async getFriendCards(
    address: string,
    reportId: string
  ): Promise<FriendCard[]> {
    const response = await this.client.post<
      FriendCardsResponse | FriendCardsFailResponse
    >("/friend_cards", { publicAddress: address, reportId });

    if (response.data?.code === ResponseCode.FailResponse) {
      const errorMsg = (response.data as FriendCardsFailResponse).data.msg;

      throw new Error(errorMsg);
    }

    const data = response.data as FriendCardsResponse;

    return [data.data.oneself, ...data.data.cards];
  }

  async uploadAvatar(formData: FormData) {
    return await this.client.post("/update_avatar", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  }
}

export default APIClient;
export { BirthdayNotFoundError };
