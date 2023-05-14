import { UserReport, Whale, CityInfo } from "../types/ApiClient";

const defeatedWhales: Whale[] = [
  {
    avatar: "/assets/whales/cz.jpeg",
    star: 4,
    score: 1,
    percentile: 80,
    publicAddress: "0x",
  },
  {
    avatar: "/assets/whales/sbf.jpeg",
    star: 3,
    score: 1,
    percentile: 60,
    publicAddress: "0x",
  },
];

const sampleFortuneResponse: UserReport = {
  accountID: 1,
  account: {
    id: 123,
    nickName: "Sam",
    code: "123",
    ens: null,
    publicAddress: "",
  },
  defeatedWhales: JSON.stringify(defeatedWhales),
  score: 100,
  star: 5,
  percentile: 90,
  meme: "/images/sample-meme.png",
  paragraph:
    "Unlucky planets fell in the money sector of the fortune chart, which means more efforts need to be paid if you wanna earn money with this wallet. ",
  embraceHouse: "2-8",
  bewareHouse: "2-8",
  personalityPlanet: "sun",
  publicAddress: "0xadsadasdsadsadasda1224",
  raderInfo: "",
  parsedRadar: {
    2: 0,
    3: 0,
    6: 0,
    7: 0,
    10: 0,
    11: 0,
  },
  luckyFlower: "Camellia",
  luckyNo: 1,
  luckyGem: "Amethyst",
  luckySign: "Aries",
  luckyMonths: null,
  luckyToken: null,
  theme: "1-1",
  unluckyToken: null,
};

const sampleCityInfo: CityInfo = {
  id: 1882,
  name: "Hangu",
  state: "Tianjin",
  country: "China",
  lng: 117.777,
  lat: 39.232,
};

export { sampleFortuneResponse, defeatedWhales, sampleCityInfo };
