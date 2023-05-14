/* eslint-disable @next/next/no-img-element */
import { forwardRef } from "react";
import {
  UserReport,
  WalletHighlightTopValue,
  WalletHighlightsCols,
  Planets,
} from "../../../../types/ApiClient";
import ReportHeader from "../base/ReportHeader";
import ReportFooter from "../base/ReportFooter";

interface WalletHighlightProps {
  nickName: string;
  userReport: UserReport;
  walletHighlight: WalletHighlightTopValue;
}

type HighlightType = "single value" | "with image";
interface ValueMapping {
  name: string;
  type: HighlightType;
  transformer: (value: number) => string;
  rarity: number;
}

function defaultTransformer(value: number) {
  return value.toString();
}

function dollarTransformer(value: number) {
  return "$" + value.toFixed(2);
}

function ethTransformer(value: number) {
  return value.toFixed(2) + " ETH";
}

function secondsTransformer(value: number) {
  const days = Math.floor(value / 86400);

  if (days > 0) {
    return days + (days > 1 ? " Days" : " Day");
  }

  // convert to hours
  const minutes = Math.floor(value / 60);

  // convert to minutes
  if (minutes < 60) {
    return minutes + (minutes > 1 ? " Mins" : " Min");
  }

  const hours = Math.floor(minutes / 60);
  return hours + (hours > 1 ? " Hrs" : " Hr");
}

const rightNumbers = [9, 8, 7, 6, 5, 4];
const valueMapping: Record<WalletHighlightsCols, ValueMapping> = {
  totalValue: {
    name: "Total Asset Value",
    type: "single value",
    transformer: dollarTransformer,
    rarity: 1,
  },
  tokenValue: {
    name: "Token Value",
    type: "single value",
    transformer: dollarTransformer,
    rarity: 1,
  },
  nftValue: {
    name: "Total NFT Asset Value",
    type: "single value",
    transformer: dollarTransformer,
    rarity: 2,
  },
  ethValue: {
    name: "ETH Value",
    type: "single value",
    transformer: ethTransformer,
    rarity: 1,
  },
  nftEarned: {
    name: "Total NFT Profit",
    type: "single value",
    transformer: ethTransformer,
    rarity: 5,
  },
  nftTopProfit: {
    name: "Highest Profit per NFT",
    type: "single value",
    transformer: ethTransformer,
    rarity: 3,
  },
  maxTrxValue: {
    name: "Top Txn Value",
    type: "single value",
    transformer: ethTransformer,
    rarity: 5,
  },
  maxTokenTrxValue: {
    name: "Top Token Value Per Txn",
    type: "single value",
    transformer: ethTransformer,
    rarity: 1,
  },
  maxNftTrxValue: {
    name: "Top NFT Value Per Txn",
    type: "single value",
    transformer: ethTransformer,
    rarity: 3,
  },
  totalTrxCount: {
    name: "Total Txn Count",
    type: "single value",
    transformer: defaultTransformer,
    rarity: 2,
  },
  totalNftCount: {
    name: "Total # of NFT traded",
    type: "single value",
    transformer: defaultTransformer,
    rarity: 3,
  },
  totalNftCollectionCount: {
    name: "Total # of NFT collections",
    type: "single value",
    transformer: defaultTransformer,
    rarity: 5,
  },
  totalTokenTypeCount: {
    name: "Total # of token types",
    type: "single value",
    transformer: defaultTransformer,
    rarity: 1,
  },
  flipTime: {
    name: "The Quickest Flip NFT",
    type: "with image",
    transformer: secondsTransformer,
    rarity: 13,
  },
  holdLongTime: {
    name: "The longest HodL NFT",
    type: "with image",
    transformer: secondsTransformer,
    rarity: 15,
  },
  diamondHand: {
    name: "The longest HodL NFT",
    type: "with image",
    transformer: secondsTransformer,
    rarity: 15,
  },
  flipperHero: {
    name: "The Quickest Flip NFT",
    type: "with image",
    transformer: secondsTransformer,
    rarity: 13,
  },
};

const fortuneHighLightParagraph: Record<Planets, Record<number, string>> = {
  venus: {
    1: "In financial astrology, the 1st House represents the wallet address itself, and Venus represents good fortune. You must already be holding sizable wealth as a result of your good track record.",
    2: "Way to go! The 2nd House represents assets and money, and Venus represents good fortune. You must have made some sharp investment decisions and had some good luck to harvest such great returns!",
    4: "You're a whale! The 4th House represents the wallet address' owner, which is YOU, and Venus represents good fortune. Your fine performance in the past has paid off, and you must be enjoying the results now.",
    8: "Congratulations! In financial astrology, the 8th House represents big amounts of investment returns, and Venus represents good fortune. Your sharp investment decisions and good luck have led you to harvest great returns!",
    5: "You're a savvy investor! In financial astrology, the 5th House represents the action of trading, and Venus represents good fortune. You must have invested like a pro, with robust information and a heavy stake to get such great results.",
  },
  uranus: {
    2: "In financial astrology, the 2nd House represents assets and money, and Uranus represents positive or innovative changes. Your smart investments will always bring cool results and keep your wallet happy.",
    5: "In financial astrology, the 5th House represents the action of trading, and Uranus represents positive changes. This wallet address carries the luck of earning through quick changing actions and you're clearly making the most of it.",
    8: "In financial astrology, the 8th House represents big amounts of investment returns, and Uranus represents positive changes. Your smart investments will always bring lucrative alpha with this wallet address. Keep up with the great work!",
  },
  sun: {
    2: "In financial astrology, the 2nd House represents assets and money, and Sun represents strong purpose. With purpose in building and earning, your wallet address is destined to hold huge assets.",
    8: "In financial astrology, the 8th House represents big amounts of investment returns, and Sun represents strong purpose. With strong purpose in earning money and leveraging resources, your wallet address is destined to hold huge assets!",
  },
  neptune: {
    2: `In financial astrology, the 2nd House represents assets and money, and Neptune is associated with the state of "overwhelming". It seems like your wallet address carries the energy of enlarging your assets and you're definitely on a roll!`,
    11: 'In financial astrology, the 11th House represents trading platforms, such as DEX, and Neptune is associated with the state of "overwhelming". Your wallet address was involved in taking massive actions on DEX, holding highly diversified assets.',
    8: `The 8th House represents big amounts of investment returns, and Neptune is associated with the state of "overwhelming". Your wallet address carries the energy of attracting positive returns and you're definitely making the most of it.`,
    3: '3nd House represents info and communication, and Neptune is associated with the state of "overwhelming". Clearly, your wallet address carries the energy for massive info collection, which serves as the foundation for your active trading.',
    5: `Neptune in your 5th House indicates that your wallet address carries abundant energy to inspire highly active trading. While this can be exciting and rewarding, it's important to balance your enthusiasm with prudence to avoid impulsive decisions.`,
  },
  mercury: {
    3: "Both Mercury and the 3rd House are related to info and analysis, so with Mercury in your 3rd House, your wallet address is great at collecting and processing information, which is a solid foundation for active trading and quick flips.",
    5: "In financial astrology, 5th House represents the action of trading, and Mercury is the planet of communication and thinking. This planetary placement brings in massive insight, which serves the foundation for diversified investments.",
  },
  mars: {
    5: "Mars in your 5th House suggests that you're a high-energy, gutsy investor who's not afraid to take risks. Your wallet address is a great side-kick in your pursuit of big returns, and you thrive on the fast-paced action of the markets.",
    3: "With Mars in your 3rd House,this address is a great side-kick for an investor who actively learns and diversely trades. You have a powerful drive and energy to pursue your goals with passion and determination.",
  },
  jupiter: {
    1: "Jupiter in your 1st House suggests that you have a lucky streak when it comes to financial matters. This address is the beneficiary of this good fortune, and you may have already made a fortune by being in the right place at the right time.",
    2: "Your address is in good hands! With Jupiter in your 2nd House, your wallet address has likely amassed great fortune already thanks to its innate ability to attract abundance and good luck.",
    4: "In financial astrology, 4th House represents the wallet's owner, that is YOU, and Jupiter is the planet of ever-expanding luck. You must have made a fortune already with sheer great luck!",
    8: "In financial astrology, 8th House represents big amount of investment returns, and Jupiter is the planet of ever-expanding luck. You must have made a fortune already with sheer great luck. ",
    5: "5th House represents the action of trading, and Jupiter is the planet of expansion and abundance. You must be an active trader with quick mind, and this address has likely benefited from your ability to act on these insights.",
  },
  saturn: {
    5: "With Saturn in your 5th House, your wallet address is in the hands of a value trader who believes in the long run and persists with grit. You have a patient approach to investing, and you're not afraid to take short-term losses for long-term gains.",
    2: "When the planet Saturn is found in the 2nd House of assets, it is associated with persistence. Your address can surely assist you in becoming a value trader who believes in the long-term and is unwavering in your approach.",
  },
  pluto: {},
  moon: {},
};

function getChartImage(house: number) {
  return "/images/report/highlight-charts/" + house + ".png";
}

function getSignImage(star: Planets) {
  return "/images/report/highlights/" + star.toLowerCase() + ".png";
}

function getChartImageClasses(house: number) {
  switch (house) {
    case 1:
      return "-translate-x-12 md:-translate-x-20 -translate-y-0 md:translate-y-4 md:scale-[120%]";
    case 2:
      return "-translate-x-12 md:-translate-x-16 scale-[90%] md:scale-[120%] -translate-y-4 md:translate-y-6";
    case 3:
      return "-translate-x-8 md:-translate-x-12 scale-[75%] md:scale-[100%] -translate-y-10 md:-translate-y-2";
    case 4:
      return "-translate-y-14 translate-x-5 md:translate-x-14 md:-translate-y-8 scale-[75%] md:scale-[90%]";
    case 5:
      return "-translate-y-4 translate-x-8 md:translate-x-14 md:translate-y-2 scale-[90%] md:scale-[110%]";
    case 6:
      return "-translate-y-4 translate-x-12 md:translate-x-14 md:-translate-y-2 scale-[90%] md:scale-[110%]";
    case 7:
      return "-translate-y-8 translate-x-12 md:translate-x-14 md:-translate-y-8 scale-[90%] md:scale-[110%]";
    case 8:
      return "-translate-y-20 translate-x-12 md:translate-x-14 md:-translate-y-16 scale-[90%] md:scale-[110%]";
    case 9:
      return "-translate-y-28 translate-x-6 md:translate-x-12 md:-translate-y-32 scale-[75%] md:scale-[95%]";
    case 10:
      return "-translate-x-6 md:-translate-x-4 -translate-y-28 md:-translate-y-28 scale-[80%] md:scale-[95%]";
    case 11:
      return "-translate-x-10 md:-translate-x-12 -translate-y-16 md:-translate-y-16 scale-[90%] md:scale-[120%]";
    case 12:
      return "-translate-x-8 md:-translate-x-4 -translate-y-8 md:-translate-y-6 scale-[90%] md:scale-[110%]";
    default:
      return "";
  }
}

function getSignPositionClasses(house: number) {
  switch (house) {
    case 1:
      return "top-28 left-8 md:top-36 md:left-0";
    case 2:
      return "top-36 left-12 md:top-52 md:left-8";
    case 3:
      return "top-40 left-20 md:top-56 md:left-20";
    case 4:
      return "top-40 right-[105px] md:top-56 md:right-[115px]";
    case 5:
      return "top-40 right-16 md:top-52 md:right-24";
    case 6:
      return "top-24 right-10 md:top-32 md:right-16";
    case 7:
      return "top-14 right-10 md:top-14 md:right-16";
    case 8:
      return "top-5 right-14 md:top-8 md:right-20";
    case 9:
      return "top-1 right-24 md:top-0 md:right-32";
    case 10:
      return "top-1 left-24 md:top-2 md:left-28";
    case 11:
      return "top-7 left-14 md:top-8 md:left-12";
    case 12:
      return "top-14 left-12 md:top-16 md:left-16";
    default:
      return "";
  }
}

function chartOnRight(house: number) {
  return rightNumbers.includes(house);
}

function getCurrentHighLightTypeAndValue(walletCol: WalletHighlightsCols) {
  if (!(walletCol in valueMapping)) {
    return {
      name: "Unknown",
      type: "single value",
      transformer: defaultTransformer,
    } as ValueMapping;
  }

  const info = valueMapping[walletCol];

  return info;
}

function getParagraph(house: number, star: Planets) {
  const parsedPlanet = star.toLowerCase() as Planets;

  return fortuneHighLightParagraph?.[parsedPlanet]?.[house] ?? "";
}

function getRarityParagraph(rarity: number) {
  if (rarity <= 5) {
    return `Only ${rarity}% users got this highlight!`;
  }

  return `${rarity}% users got this highlight!`;
}

function nth(n: number) {
  return ["st", "nd", "rd"][((((n + 90) % 100) - 10) % 10) - 1] || "th";
}

const WalletHighlight = forwardRef<HTMLDivElement, WalletHighlightProps>(
  ({ nickName, userReport, walletHighlight }, ref) => {
    const showChartOnRight = chartOnRight(walletHighlight.house);
    const walletHighLightInfo = getCurrentHighLightTypeAndValue(
      walletHighlight.col
    );
    const displayValue = walletHighLightInfo.transformer(walletHighlight.value);
    const highlightType = walletHighLightInfo.type;

    const chartImg = getChartImage(walletHighlight.house);
    const imgClasses = getChartImageClasses(walletHighlight.house);

    const signImg = getSignImage(walletHighlight.star);
    const signPosition = getSignPositionClasses(walletHighlight.house);

    const paragraph = getParagraph(walletHighlight.house, walletHighlight.star);
    const rarityParagraph = getRarityParagraph(walletHighLightInfo.rarity);

    return (
      <div
        className={`h-full min-h-screen bg-no-repeat bg-cover bg-[url('/images/report/wallet-highlights-mobile-bg.jpg')] md:h-auto md:min-h-0 md:bg-none`}
      >
        <div
          className="h-[675px] md:h-[1000px] lg:h-[900px] flex flex-col bg-center overflow-hidden w-screen pb-4 max-w-[1130px] md:rounded-xl relative bg-no-repeat bg-cover bg-[url('/images/report/wallet-highlights-mobile-bg.jpg')] md:bg-[url('/images/report/wallet-highlights-bg.png')] md:scale-[85%] md:-translate-y-20 md:-mb-32 lg:scale-[70%] lg:-translate-y-32 lg:-mb-56 xl:scale-[70%] xl:-translate-y-32 xl:-mb-56 2xl:scale-[85%] 2xl:-translate-y-14 2xl:-mb-20 3xl:scale-[100%] 3xl:translate-y-0 3xl:mb-0"
          ref={ref}
        >
          <ReportHeader
            nickName={nickName}
            address={userReport.publicAddress}
            ens={userReport.account.ens}
          />
          <div className="mx-auto mt-32 md:mt-36 mb-2">
            <h2 className="font-bold uppercase text-center text-lg leading-4 md:text-2xl md:leading-4">
              2022 Highlights
            </h2>
            <h3
              className={`font-michroma text-center text-primary md:text-[75px] md:leading-[100px] ${
                walletHighlight.keyword.length > 11
                  ? "text-[30px] leading-[35px]"
                  : "text-[42px] leading-[50px]"
              }`}
            >
              {walletHighlight.keyword}
            </h3>
            <p className="text-primary text-center mt-1 font-bold text-[14px] leading-[15px] md:mt-4 md:text-[18px]">
              {rarityParagraph}
            </p>
            <p className="px-2 md:px-16 mt-4 uppercase font-bold md:mt-6 text-[14px] mx-auto text-center leading-[18px] md:text-[18px] md:leading-[20px] md:max-w-3xl">
              <span className="border-b pb-1 border-b-white">
                {`What we found in your wallet's chart`}
              </span>
            </p>
          </div>
          <div
            className={`grid px-4 md:pl-2 md:pr-0 grid-cols-3 mt-4 md:mt-6 self-center max-w-lg relative reverse`}
          >
            {!showChartOnRight && (
              <>
                <div></div>
                <img
                  src={chartImg}
                  className={`absolute top-0 w-72 md:w-80 h-auto z-0 left-0 md:right-10 ${imgClasses}`}
                  alt="chart"
                />
                <img
                  src={signImg}
                  className={`absolute w-4 h-4 md:w-5 md:h-5 z-10 ${signPosition}`}
                  alt="sign"
                />
              </>
            )}
            <div className="z-10 relative col-span-2 pr-0 px-6 md:px-6 md:pt-6">
              <div className="text-2xl font-bold md:text-3xl md:leading-8">
                <div className="md:mb-2">
                  <span className="capitalize">{walletHighlight.star}</span> in
                  the
                </div>
                <span className="rounded-[4px] border border-white py-[1px] px-[2px] text-center">
                  {walletHighlight.house + nth(walletHighlight.house)} House
                </span>
              </div>
              <p className="text-sm leading-4 mt-2 md:mt-4 md:text-lg md:leading-5 pr-6 md:pr-4">
                {paragraph}
              </p>
            </div>
            {showChartOnRight && (
              <>
                <div></div>
                <img
                  src={chartImg}
                  className={`absolute top-0 w-72 md:w-80 h-auto z-0 right-0 md:right-10 ${imgClasses}`}
                  alt="chart"
                />
                <img
                  src={signImg}
                  className={`absolute w-4 h-4 md:w-5 md:h-5 z-20 ${signPosition}`}
                  alt="sign"
                />
              </>
            )}
          </div>
          {/* <div className={`mb-4
                ${highlightType === 'single value' ? 'mt-12 md:mt-20' : 'mt-10 md:mt-14'}`}
            > */}
          <div className={`my-auto md:mb-4 md:mt-auto pt-2 md:pt-4`}>
            <p className="uppercase font-bold text-center text-xs md:text-[15px] md:leading-[18px]">
              {nickName + "'s Highlights:"}
            </p>
            <div
              className="relative md:mx-auto mx-4 mt-2 max-w-lg backdrop-blur-sm py-2 md:py-5 pl-2 md:pl-4 rounded-lg border border-primary"
              style={{
                background:
                  "linear-gradient(180deg, rgba(221, 254, 21, 0.26) 0%, rgba(255, 255, 255, 0) 100%)",
              }}
            >
              <div className="absolute h-28 inset-x-0 translate-y-1 bottom-0 w-[98%] mx-1 rounded-lg border-b border-primary"></div>
              {highlightType === "single value" && (
                <div className="flex mt-2 mb-4">
                  <div className="m-auto text-center">
                    <div className="text-[16px] md:text-[20px] leading-[18px]">
                      {walletHighLightInfo.name}:
                    </div>
                    <div className="font-bold text-[42px] leading-[35px] mt-2 md:mt-2">
                      {displayValue}
                    </div>
                  </div>
                </div>
              )}
              {highlightType === "with image" && (
                <div className="grid grid-cols-3">
                  <div className="flex col-span-2 text-center">
                    <div className="m-auto p-4 md:p-6">
                      <div className="text-[16px] md:text-[20px] leading-[18px]">
                        {walletHighLightInfo.name}:
                      </div>
                      <h4 className="text-3xl md:text-[42px] leading-[44px] font-bold mt-1 md:mt-2">
                        {displayValue}
                      </h4>
                    </div>
                  </div>
                  <div className="flex border-l border-l-primary -my-2">
                    <div className="m-auto p-1 text-center overflow-hidden">
                      <div className="text-[11px]">
                        {walletHighlight.keyword === "flipTime"
                          ? "Flipped"
                          : "HODL"}{" "}
                        NFT:
                      </div>
                      {walletHighlight.imageUrl && (
                        <div className="aspect-square w-[76px] md:w-[82px] rounded-md m-auto mt-1 overflow-hidden">
                          <img
                            src={walletHighlight.imageUrl}
                            className="w-full h-auto bg-cover"
                            alt="NFT image"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          <ReportFooter
            extraClasses="mt-3 md:mt-3"
            referralCode={userReport.account.code}
          />
        </div>
      </div>
    );
  }
);

WalletHighlight.displayName = "WalletHighlight";
export default WalletHighlight;
