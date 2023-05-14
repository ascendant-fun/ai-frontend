import {
  LuckyNumbers,
  LuckyTokens,
} from "../client/components/Fortune/pages/report.types";
import {
  LuckyMonthValues,
  FortuneThemes,
  BonanzaRole,
} from "../types/ApiClient";

export type CoinImage = {
  fullName: string;
  img: string;
};

export const TokenList: Record<LuckyTokens, CoinImage> = {
  BTC: {
    fullName: "Bitcoin",
    img: "bitcoin",
  },
  ADA: {
    fullName: "Cardano",
    img: "cardano",
  },
  ETH: {
    fullName: "Ethereum",
    img: "ethereum",
  },
  XRP: {
    fullName: "Ripple",
    img: "ripple",
  },
  USDT: {
    fullName: "Tether",
    img: "tether",
  },
  BNB: {
    fullName: "BNB",
    img: "bnb",
  },
  BUSD: {
    fullName: "BUSD",
    img: "busd",
  },
  DOGE: {
    fullName: "Dogecoin",
    img: "dogecoin",
  },
  MATIC: {
    fullName: "Polygon",
    img: "polygon",
  },
  SOL: {
    fullName: "Solana",
    img: "solana",
  },
  LDO: {
    fullName: "Lido DAO",
    img: "lido",
  },
  OP: {
    fullName: "Optimism",
    img: "optimism",
  },
};

export const LuckyRoles = {
  trading: {
    index: 3,
    label: "Trading",
    description: "Trade FT, NFT and all kinds of crypto assets ",
  },
  airdrop: {
    index: 7,
    label: "Airdrop",
    description: "Earn through airdropped rewards",
  },
  mining: {
    index: 6,
    label: "Mining",
    description: "Earn through mining on POW blockchains",
  },
  influencing: {
    index: 10,
    label: "Influencing",
    description: "Earn benefits as an influencer",
  },
  connecting: {
    index: 11,
    label: "Connecting",
    description:
      "Earn middlemen rewards by connecting different parties to collaborate",
  },
  building: {
    index: 2,
    label: "BuidLing",
    description: "Earn through long-term, value-driven buidLing",
  },
};

export const NumberText: Record<LuckyNumbers, string> = {
  "0": "Zero",
  "1": "One",
  "2": "Two",
  "3": "Three",
  "4": "Four",
  "5": "Five",
  "6": "Six",
  "7": "Seven",
  "8": "Eight",
  "9": "Nine",
  "10": "Ten",
  "11": "Eleven",
  "12": "twelve",
  "13": "Thirteen",
};

export const FortuneThemeMapping: Record<
  FortuneThemes,
  {
    name: string;
    paragraph: string;
    memeImg: string;
    rarity: number;
    useOnly: boolean;
  }
> = {
  "1-1": {
    name: "GoldenBullRun",
    paragraph:
      "Looks like 2023 is truly blessed, as your monthly luck rating is off the charts and rising... Keep the FOMO down and stay sharp, this year is GOLDEN. ",
    memeImg: "1-2.png",
    rarity: 1,
    useOnly: true,
  },
  "1-2": {
    name: "ToTheMoon",
    paragraph:
      "Super high outlier is spotted among your monthly luck ratings in 2023. Something EPIC is about to happen, hang tight.  ",
    memeImg: "1-1.png",
    rarity: 10,
    useOnly: true,
  },
  "1-3": {
    name: "BullishComeback",
    paragraph:
      "Check this out! Your monthly luck rating graph is Nike-shaped: first down, then up! Trust the plan and you’ll be rewarded. ",
    memeImg: "1-3.png",
    rarity: 5,
    useOnly: true,
  },
  "1-4": {
    name: "RollerCoaster",
    paragraph:
      "2023 will be an exciting financial journey filled with healthy fluctuations. Ride this roller coaster with a strong strategy and the prize will be outstanding.",
    memeImg: "1-4.jpeg",
    rarity: 18,
    useOnly: false,
  },
  "1-5": {
    name: "SteadyBoat",
    paragraph:
      "Go steady, great luck is around the corner. Your monthly luck ratings are quite stable across 2023. It’s very simple - DIVERSIFY and WIN!",
    memeImg: "1-5.jpeg",
    rarity: 1,
    useOnly: true,
  },
  "2-1": {
    name: "",
    paragraph: "",
    memeImg: "",
    rarity: 1,
    useOnly: true,
  },
  "2-2": {
    name: "WinterWarrior",
    paragraph:
      "This address is a Winter Warrior that can endure the crypto winter even during the coldest time. Keep Building, Keep Holding, and the spring will come soon.",
    memeImg: "2-2.png",
    rarity: 6,
    useOnly: false,
  },
  "2-3": {
    name: "WenLambo",
    paragraph:
      "This address is exceptionally suitable for trading endeavors in 2023! You are BLESSED and the trajectory points upwards.",
    memeImg: "2-3.png",
    rarity: 10,
    useOnly: false,
  },
  "2-4": {
    name: "",
    paragraph: "",
    memeImg: "",
    rarity: 1,
    useOnly: true,
  },
  "2-5": {
    name: "",
    paragraph: "",
    memeImg: "",
    rarity: 1,
    useOnly: true,
  },
  "2-6": {
    name: "GoldenMiner",
    paragraph:
      "Mining is picking up its trend again and your crypto address is just right for it. You're going to have a great year by engaging in this activity. Mine your way into success!",
    memeImg: "2-6.jpeg",
    rarity: 10,
    useOnly: false,
  },
  "2-7": {
    name: "AirdropBeacon",
    paragraph:
      "This address is a true AIRDROP MAGNET! Hurry up and participate in airdrops events as much as possible, you will earn big!",
    memeImg: "2-7.png",
    rarity: 5,
    useOnly: false,
  },
  "2-8": {
    name: "",
    paragraph: "",
    memeImg: "",
    rarity: 1,
    useOnly: false,
  },
  "2-9": {
    name: "",
    paragraph: "",
    memeImg: "",
    rarity: 1,
    useOnly: false,
  },
  "2-10": {
    name: "Superstar",
    paragraph:
      "You are a born INFLUENCER. Astrology indicates how well you can influence people with insight and talent. In 2023, rise as a superstar and fulfil your destiny!",
    memeImg: "2-10.png",
    rarity: 8,
    useOnly: false,
  },
  "2-11": {
    name: "HumanRouter",
    paragraph:
      "Get ready for a prosperous year benefiting from your networks. Buidl with your capability to connect people, and you may find surprising rewards down the road.",
    memeImg: "2-11.jpeg",
    rarity: 5,
    useOnly: false,
  },
  "2-12": {
    name: "",
    paragraph: "",
    memeImg: "",
    rarity: 1,
    useOnly: false,
  },
};

export const MonthsInfo: Record<
  LuckyMonthValues,
  {
    month: string;
    year: string;
  }
> = {
  "1": {
    month: "Jan",
    year: "‘23",
  },
  "2": {
    month: "Feb",
    year: "‘23",
  },
  "3": {
    month: "Mar",
    year: "‘23",
  },
  "4": {
    month: "Apr",
    year: "‘23",
  },
  "5": {
    month: "May",
    year: "‘23",
  },
  "6": {
    month: "Jun",
    year: "‘23",
  },
  "7": {
    month: "Jul",
    year: "‘23",
  },
  "8": {
    month: "Aug",
    year: "‘23",
  },
  "9": {
    month: "Sep",
    year: "‘23",
  },
  "10": {
    month: "Oct",
    year: "‘23",
  },
  "11": {
    month: "Nov",
    year: "‘23",
  },
  "12": {
    month: "Dec",
    year: "‘23",
  },
};

export const BonanzaRoleList: BonanzaRole[] = [
  {
    key: 2,
    type: "BuidLing",
    label: "WinterWarrior",
  },
  {
    key: 3,
    type: "Trading",
    label: "WenLambo",
  },
  {
    key: 6,
    type: "Mining",
    label: "GoldenMiner",
  },
  {
    key: 7,
    type: "Airdrop",
    label: "AirdropBeacon",
  },
  {
    key: 10,
    type: "Influencing",
    label: "Superstar",
  },
  {
    key: 11,
    type: "Connecting",
    label: "HumanRouter",
  },
];

export const WalletHighlightDescriptionList = [
  {
    tag: "Rich Gang",
    description: "Total asset value is higher than $50,000!",
  },
  {
    tag: "Whale",
    description: "Total NFT asset value is higher than $15,000!",
  },
  {
    tag: "Degen King",
    description: "Total NFT profit for 2022 is larger than 3 eth!",
  },
  {
    tag: "GOAT",
    description: "Highest profit for a single NFT is larger than 1 eth!",
  },
  {
    tag: "Mega Spender",
    description: "Value of the biggest transaction is larger than 5 eth!",
  },
  {
    tag: "BlueChipBeliever",
    description: "Most expensive NFT ever bought is worth more than 2 eth!",
  },
  {
    tag: "Bullish HFT",
    description: "Total txn count for 2022 is more than 500!",
  },
  {
    tag: "Decentralizooor",
    description: "Total # of NFT traded is more than 40!",
  },
  {
    tag: "NFT Degen",
    description: "Total # of NFT collections traded is more than 15!",
  },
  {
    tag: "Flipper Hero",
    description: "The shortest flip time is within 3 days!",
  },
  {
    tag: "Diamond Hand",
    description: "The longest hodL duration is longer than 90 days!",
  },
];

export const TrendBonanzaDescriptionList = [
  {
    tag: "GoldenBullRun",
    type: "Trend",
    description:
      "Monthly luck ratings will keep rising all the way across 2023!",
  },
  {
    tag: "ToTheMoon",
    type: "Trend",
    description:
      "Super high outlier is spotted among the monthly luck ratings in the year 2023!",
  },
  {
    tag: "BullishComeback",
    type: "Trend",
    description:
      "Pattern of 2023 monthly luck ratings is nike-shaped: first down, then up!",
  },
  {
    tag: "RollerCoaster",
    type: "Trend",
    description:
      "2023 would be an exciting financial journey with some healthy fluctuations.",
  },
  {
    tag: "SteadyBoat",
    type: "Trend",
    description: "Monthly ratings of luck are quite steady across 2023.",
  },
  {
    tag: "SteadyBoat",
    type: "Trend",
    description: "Monthly ratings of luck are quite steady across 2023.",
  },
  {
    tag: "WenLambo",
    type: "Bonanza",
    description:
      "This wallet is exceptionally suitable for trading endeavors in 2023!",
  },
  {
    tag: "Airdrop",
    type: "Bonanza",
    description: "This wallet is perfect for attracting airdrops in 2023!",
  },
  {
    tag: "GoldenMiner",
    type: "Bonanza",
    description:
      "This crypto wallet is just right for mining, which is picking up its trend.",
  },
  {
    tag: "Influencing",
    type: "Bonanza",
    description: "This wallet is perfect for earning money as an influencer!",
  },
  {
    tag: "Connecting",
    type: "Bonanza",
    description:
      "This wallet and its owner will be benefiting greatly from connections and networks. ",
  },
  {
    tag: "Mining",
    type: "Bonanza",
    description:
      "This crypto wallet is just right for mining, which is picking up its trend.",
  },
  {
    tag: "BuidLing",
    type: "Bonanza",
    description:
      "This wallet and its owner are perfect for money earned from BuidLing and HodLing!",
  },
];

export const PlanetsMap = {
  jupiter: "Jupiter",
  mars: "Mars",
  mercury: "Mercury",
  moon: "Moon",
  neptune: "Neptune",
  pluto: "Pluto",
  saturn: "Saturn",
  sun: "Sun",
  uranus: "Uranus",
  venus: "Venus",
};

export const CelebrityMap = {
  ParisHilton: "Paris Hilton",
  StephenCurry: "Stephen Curry",
  JustinBieber: "Justin Bieber",
  TaylorGerring: "Taylor Gerring",
  GwynethPaltrow: "Gwyneth Paltrow",
  JustinSun: "Justin Sun",
  GaryVaynerchuk: "Gary Vaynerchuk",
  JimmyFallon: "Jimmy Fallon",
  SteveAoki: "Steve Aoki",
  BrainArmstrong: "Brain Armstrong",
};

export const CoinMap = {
  Bitcoin: "BTC",
  Ethereum: "ETH",
  BNB: "BNB",
  Cardano: "ADA",
  Ripple: "XRP",
  Dogecoin: "DOGE",
  Polygon: "MATIC",
  Solana: "SOL",
  "Lido DAO": "LDO",
  Optimism: "OP",
};

export const PrologueList = [
  "Legit as always, ",
  "Dope like a star, ",
  "Savvy like a pro, ",
];
