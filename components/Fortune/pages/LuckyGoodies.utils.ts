import {
  Flowers,
  FlowerImgs,
  LuckyNumbers,
  LuckyNumberImgs,
  LuckySigns,
  LuckySignsImgs,
  Gems,
  GemsImgs,
} from "./report.types";

const flowerImgsRefs: FlowerImgs = {
  Camellia: "camellia",
  Daffodil: "daffodil",
  Daisy: "daisy",
  Dandelion: "dandelion",
  Hyacinth: "hyacinth",
  Lily: "lily",
  Lotus: "lotus",
  Rose: "rose",
  "Sun flower": "sunflower",
  "Valley Lily": "valley-lily",
  Violet: "violet",
  "Chinese violet": "chinese-violet",
};

const luckyNumberImgsRef: LuckyNumberImgs = {
  0: "0",
  1: "1",
  2: "2",
  3: "3",
  4: "4",
  5: "5",
  6: "6",
  7: "7",
  8: "8",
  9: "9",
  10: "10",
  11: "11",
  12: "12",
  13: "13",
};

const luckySignImgsRef: LuckySignsImgs = {
  Aquarius: "aquarius",
  Cancer: "cancer",
  Capricorn: "capricorn",
  Gemini: "gemini",
  Leo: "leo",
  Libra: "libra",
  Pisces: "pisces",
  Sagittarius: "sagittarius",
  Scorpio: "scorpio",
  Aries: "aries",
  Virgo: "virgo",
  Taurus: "taurus",
};

const gemsImgsRef: GemsImgs = {
  Garnet: "jade",
  Amethyst: "amethyst",
  Aquamarine: "aquamarine",
  Diamond: "diamond",
  Emerald: "emerald",
  Moonstone: "moon-stone",
  Ruby: "ruby",
  Olivine: "olivine",
  Opal: "opal",
  Citrine: "citrine",
  Turquoise: "turquoise",
  Sapphire: "sapphire",
};

function getFlowerImg(flower: Flowers) {
  const base = "/images/report/flowers/";
  const suffix = ".png";

  if (flower in flowerImgsRefs) {
    return base + flowerImgsRefs[flower] + suffix;
  }

  return null;
}

function getLuckySignImg(sign: LuckySigns) {
  const base = "/images/report/signs/";
  const suffix = ".png";

  if (sign in luckySignImgsRef) {
    return base + luckySignImgsRef[sign] + suffix;
  }

  return null;
}

function getGemImg(gem: Gems) {
  const base = "/images/report/gems/";
  const suffix = ".png";

  if (gem in gemsImgsRef) {
    return base + gemsImgsRef[gem] + suffix;
  }

  return null;
}

function getLuckyNumberImg(number: LuckyNumbers) {
  const base = "/images/report/numbers/";
  const suffix = ".png";

  if (number in luckyNumberImgsRef) {
    return base + luckyNumberImgsRef[number] + suffix;
  }

  return null;
}

export { getFlowerImg, getLuckySignImg, getGemImg, getLuckyNumberImg };
