type Pages =
  | "personality"
  | "wallet highlight"
  | "wallet highlight 2"
  | "wallet highlight 3"
  | "fortune theme"
  | "lucky roles"
  | "lucky months"
  | "lucky token"
  | "lucky goodies"
  | "lucky friends";

type Flowers =
  | "Camellia"
  | "Dandelion"
  | "Chinese violet"
  | "Daisy"
  | "Hyacinth"
  | "Lily"
  | "Rose"
  | "Valley Lily"
  | "Sun flower"
  | "Violet"
  | "Lotus"
  | "Daffodil";
type FlowerImgs = Record<Flowers, string>;

type Gems =
  | "Garnet"
  | "Amethyst"
  | "Aquamarine"
  | "Diamond"
  | "Emerald"
  | "Moonstone"
  | "Ruby"
  | "Olivine"
  | "Opal"
  | "Citrine"
  | "Turquoise"
  | "Sapphire";
type GemsImgs = Record<Gems, string>;

type LuckyNumbers = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13;
type LuckyNumberImgs = Record<LuckyNumbers, string>;

type LuckySigns =
  | "Aquarius"
  | "Cancer"
  | "Capricorn"
  | "Gemini"
  | "Leo"
  | "Libra"
  | "Pisces"
  | "Sagittarius"
  | "Scorpio"
  | "Aries"
  | "Virgo"
  | "Taurus";
type LuckySignsImgs = Record<LuckySigns, string>;

type LuckyTokens =
  | "BTC"
  | "ETH"
  | "USDT"
  | "BNB"
  | "BUSD"
  | "XRP"
  | "ADA"
  | "DOGE"
  | "MATIC"
  | "SOL"
  | "LDO"
  | "OP";

export type {
  Pages,
  Flowers,
  FlowerImgs,
  Gems,
  GemsImgs,
  LuckyNumbers,
  LuckyNumberImgs,
  LuckySigns,
  LuckySignsImgs,
  LuckyTokens,
};
