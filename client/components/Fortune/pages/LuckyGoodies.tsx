/* eslint-disable @next/next/no-img-element */
import { forwardRef } from "react";
import { UserReport } from "../../../../types/ApiClient";
import ReportHeader from "../base/ReportHeader";
import ReportFooter from "../base/ReportFooter";
import {
  getFlowerImg,
  getLuckySignImg,
  getGemImg,
  getLuckyNumberImg,
} from "./LuckyGoodies.utils";
import { NumberText } from "../../../../utils/constants";

interface LuckyGoodiesProps {
  nickName: string;
  userReport: UserReport;
}

const LuckyGoodies = forwardRef<HTMLDivElement, LuckyGoodiesProps>(
  ({ nickName, userReport }, ref) => {
    const flowerImg = getFlowerImg(userReport.luckyFlower);
    const signImf = getLuckySignImg(userReport.luckySign);
    const gemImg = getGemImg(userReport.luckyGem);
    const luckyNumberImg = getLuckyNumberImg(userReport.luckyNo);
    const numberString = NumberText[userReport.luckyNo];

    return (
      <div
        className={`h-full min-h-screen bg-no-repeat bg-cover bg-[url('/images/report/lucky-goodies-mobile-bg.jpg')] md:h-auto md:min-h-0 md:bg-none`}
      >
        <div
          className="h-[675px] md:h-[1000px] lg:h-[900px] bg-center md:bg-left flex flex-col overflow-hidden w-screen pb-4 max-w-[1130px] md:rounded-xl relative bg-no-repeat bg-cover bg-[url('/images/report/lucky-goodies-mobile-bg.jpg')] md:bg-[url('/images/report/lucky-goodies-bg.jpg')] md:scale-[85%] md:-translate-y-20 md:-mb-32 lg:scale-[70%] lg:-translate-y-32 lg:-mb-56 xl:scale-[70%] xl:-translate-y-32 xl:-mb-56 2xl:scale-[85%] 2xl:-translate-y-14 2xl:-mb-20 3xl:scale-[100%] 3xl:translate-y-0 3xl:mb-0"
          ref={ref}
        >
          <img
            src="/images/report/lucky-goodies-chart.png"
            className="absolute top-0 left-1/2 -translate-x-1/2 opacity-50 mix-blend-overlay -translate-y-[40%] md:-translate-y-1/2"
            alt="chart"
          />
          <img
            src="/images/report/stars-mobile-2.svg"
            className="absolute z-0 inset-0 mt-20 px-4 md:hidden"
            alt="stars"
          />
          <ReportHeader
            nickName={nickName}
            address={userReport.publicAddress}
            ens={userReport.account.ens}
          />
          <div className="mx-auto md:mx-0 mt-[120px] pb-4 md:pb-32 md:mt-36 flex flex-col">
            <h2 className="font-bold uppercase text-center text-lg leading-4 md:text-2xl md:leading-4">
              2023
            </h2>
            <h3
              className={`font-michroma mt-2 md:mt-4 px-2 text-center text-primary text-[45px] leading-[42px] md:text-[75px] md:leading-[60px] md:mx-5 lg:mx-10`}
            >
              Good Luck Charms
            </h3>
            <p className="px-8 md:px-0 mt-4 md:mt-14 text-[18px] mx-auto leading-[20px] md:text-[30px] md:leading-[36px] md:max-w-[40rem]">
              {`According to the astrology chart of your crypto address, we've put together a list of good luck charms that will make your 2023 even better!`}
            </p>
            <div className="mt-4 md:mt-8 mx-6 rounded-xl grid grid-cols-2 md:grid-cols-4 gap-x-1 gap-y-6 md:gap-y-4">
              <div className="relative px-4 py-2 h-32 md:h-auto flex flex-col">
                <div className="text-xs leading-[18px] relative z-10 md:text-lg md:leading-[22px] mx-auto">
                  Lucky No.
                </div>
                <div className="text-[22px] leading-[18px] relative z-10 font-bold md:text-[42px] md:leading-[32px] mx-auto md:mt-2">
                  {numberString}
                </div>
                <img
                  src="/images/report/lucky-goodies-lucky.png"
                  className="absolute w-[90px] md:w-[170px] right-0 bottom-0 translate-y-0 opacity-50 mix-blend-soft-light left-1/2 -translate-x-1/2 md:-translate-y-14"
                  alt="luck"
                />
                {luckyNumberImg && (
                  <img
                    src={luckyNumberImg}
                    className="absolute w-[100px] md:w-[180px] translate-y-4 right-0 bottom-0 left-1/2 -translate-x-1/2 md:translate-y-3"
                    alt="number"
                  />
                )}
              </div>
              <div className="relative px-4 py-2 h-32 md:h-auto flex flex-col md:translate-y-1/3">
                <div className="text-xs relative z-10 leading-[18px] md:text-lg md:leading-[22px] mx-auto">
                  Lucky Sign
                </div>
                <div className="text-[22px] relative z-10 leading-[18px] font-bold md:text-[42px] md:leading-[32px] mx-auto md:mt-2">
                  {userReport.luckySign}
                </div>
                <img
                  src="/images/report/lucky-goodies-sign.png"
                  className="absolute w-[110px] md:w-[200px] right-0 bottom-0 opacity-50 mix-blend-soft-light left-1/2 -translate-x-1/2 md:-translate-y-8"
                  alt="sign background"
                />
                {signImf && (
                  <img
                    src={signImf}
                    className="absolute z-0 w-[110px] md:w-[212px] right-0 bottom-0 translate-y-6 md:translate-y-10 left-1/2 -translate-x-1/2"
                    alt="sign"
                  />
                )}
              </div>
              <div className="relative px-4 py-2 h-32 md:h-auto flex flex-col">
                <div className="text-xs leading-[18px] relative z-10 md:text-lg md:leading-[22px] mx-auto">
                  Lucky Gem
                </div>
                <div className="text-[22px] leading-[18px] relative z-10 font-bold md:text-[42px] md:leading-[32px] mx-auto md:mt-2">
                  {userReport.luckyGem}
                </div>
                <img
                  src="/images/report/lucky-goodies-gem.png"
                  className="absolute w-[100px] md:w-[200px] right-0 bottom-0 opacity-70 mix-blend-soft-light left-1/2 translate-y-4 -translate-x-1/2 md:translate-y-8"
                  alt="sign background"
                />
                {gemImg && (
                  <img
                    src={gemImg}
                    className={`absolute w-[150px] md:w-[250px] right-0 bottom-0 translate-y-10 left-1/2 -translate-x-1/2 md:translate-y-20`}
                    alt="sign"
                  />
                )}
              </div>
              <div className="relative px-4 py-2 h-32 md:h-60 flex flex-col md:translate-y-1/3">
                <div className="text-xs relative z-10 leading-[18px] md:text-lg md:leading-[22px] mx-auto">
                  Lucky Flower
                </div>
                <div className="text-[22px] leading-[18px] relative z-10 font-bold md:text-[42px] md:leading-[32px] mx-auto md:mt-2">
                  {userReport.luckyFlower}
                </div>
                <img
                  src="/images/report/lucky-goodies-flower.png"
                  className={`absolute w-[135px] md:w-[218px] opacity-50 md:opacity-30 mix-blend-soft-light right-0 bottom-0 left-1/2 -translate-x-1/2`}
                  alt="flower"
                />
                {flowerImg && (
                  <img
                    src={flowerImg}
                    className="absolute w-[110px] md:w-[230px] right-0 bottom-0 translate-y-6 left-1/2 -translate-x-1/2 md:translate-y-1/3"
                    alt="flower"
                  />
                )}
              </div>
            </div>
          </div>
          <ReportFooter
            extraClasses="mt-auto"
            referralCode={userReport.account.code}
          />
        </div>
      </div>
    );
  }
);

LuckyGoodies.displayName = "LuckyGoodies";

export default LuckyGoodies;
