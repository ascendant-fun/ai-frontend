/* eslint-disable @next/next/no-img-element */
import { forwardRef } from "react";

import { UserReport } from "../../../../types/ApiClient";
import ReportHeader from "../base/ReportHeader";
import ReportFooter from "../base/ReportFooter";
import { getTokenImgSrc, getTokenFullName } from "../../../../utils/utils";

interface LuckyTokenProps {
  nickName: string;
  userReport: UserReport;
}

const LuckyToken = forwardRef<HTMLDivElement, LuckyTokenProps>(
  ({ nickName, userReport }, ref) => {
    const luckyToken = userReport.parsedLuckyToken;
    const tokenFullName = getTokenFullName(luckyToken?.name);
    const tokenImg = getTokenImgSrc(luckyToken?.name);
    const rating =
      luckyToken?.score === undefined ? 0 : Math.floor(luckyToken.score);

    return (
      <div
        className={`h-full min-h-screen bg-no-repeat bg-cover bg-[url('/images/report/lucky-token-mobile-bg.jpg')] md:h-auto md:min-h-0 md:bg-none`}
      >
        <div
          className="h-[675px] md:h-[1000px] lg:h-[900px] bg-center md:bg-left flex flex-col overflow-hidden w-screen pb-4 max-w-[1130px] md:rounded-xl relative bg-no-repeat bg-cover bg-[url('/images/report/lucky-token-mobile-bg.jpg')] md:bg-[url('/images/report/lucky-token-bg.jpg')] md:scale-[85%] md:-translate-y-20 md:-mb-32 lg:scale-[70%] lg:-translate-y-32 lg:-mb-56 xl:scale-[70%] xl:-translate-y-32 xl:-mb-56 2xl:scale-[85%] 2xl:-translate-y-14 2xl:-mb-20 3xl:scale-[100%] 3xl:translate-y-0 3xl:mb-0"
          ref={ref}
        >
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
          <div className="self-center mt-[120px] md:mt-36 relative z-10">
            <h2 className="font-bold uppercase text-center text-lg leading-4 md:text-2xl md:leading-4">
              2023
            </h2>
            <h3
              className={`font-michroma text-center text-primary text-[30px] leading-[40px] px-2 md:px-0 md:text-[65px] md:leading-[100px]`}
            >
              Best-matching Token
            </h3>
            <div className="relative mt-2 self-center hidden md:block">
              {Array.from({ length: 4 }, (_, i) => (
                <div
                  key={i}
                  className="text-[88px] text-center uppercase font-michroma font-medium leading-[84px]"
                >
                  {tokenFullName}
                </div>
              ))}
              <img
                src={tokenImg}
                className="w-[310px] mx-auto absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                alt="coin image"
              />
            </div>
            <p className="px-12 md:px-16 mt-2 md:mt-6 text-[22px] mx-auto leading-[26px] md:text-[30px] md:leading-[36px] md:max-w-3xl text-center">
              Your winning token among <br />
              <strong>10</strong> mainstream tokens
            </p>
            <div
              className="hidden mt-8 mb-2 md:flex max-w-[300px] mx-auto backdrop-blur-sm py-1 px-4 rounded-lg border border-primary"
              style={{
                background:
                  "linear-gradient(180deg, rgba(221, 254, 21, 0.26) 0%, rgba(255, 255, 255, 0) 100%)",
              }}
            >
              <label className="text-xl my-auto font-bold">
                Prospect Rating
              </label>
              <div className="flex ml-auto">
                <span className="text-primary mr-3 text-5xl leading-[55px] font-bold">
                  {rating}
                </span>
              </div>
            </div>
            <img
              src={tokenImg}
              className="mt-0 md:mt-4 w-[220px] mx-auto md:hidden"
              alt="coin image"
            />
            <div className="md:hidden mx-4 mt-0 md:mt-16 flex flex-col">
              <label className="font-michroma mx-auto text-[20px] leading-[24px]">
                {tokenFullName}
              </label>
              <div className="flex">
                <div
                  className="relative flex-none w-24 backdrop-blur-sm py-3 px-2 md:px-4 rounded-lg border border-primary"
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(221, 254, 21, 0.26) 0%, rgba(255, 255, 255, 0) 100%)",
                  }}
                >
                  <div className="absolute h-28 inset-x-0 translate-y-1 bottom-0 w-[98%] mx-1 rounded-lg border-b border-primary"></div>
                  <p className="uppercase font-bold text-center break-all">
                    {nickName.length > 6 ? "YOUR" : nickName + `'s`}
                    <br /> Wallet
                  </p>
                </div>
                <div className="w-full grid grid-flow-col">
                  <div className="border-t border-primary translate-y-1/2 translate-x-2"></div>
                  <div className="bg-primary self-center place-self-center w-12 h-12 rounded-full flex">
                    <span className="m-auto text-black text-[22px] font-bold">
                      {rating}
                    </span>
                  </div>
                  <div className="border-t border-primary translate-y-1/2 -translate-x-2"></div>
                </div>
                <div
                  className="relative flex flex-none w-24 backdrop-blur-sm py-3 px-2 md:px-4 rounded-lg border border-primary"
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(221, 254, 21, 0.26) 0%, rgba(255, 255, 255, 0) 100%)",
                  }}
                >
                  <div className="absolute h-28 inset-x-0 translate-y-1 bottom-0 w-[98%] mx-1 rounded-lg border-b border-primary"></div>
                  <p className="uppercase font-bold m-auto">
                    {`$` + luckyToken?.name}
                  </p>
                </div>
              </div>
            </div>
            <div className="text-center md:hidden uppercase text-[15px] leading-[18px] font-bold -translate-y-1">
              You deserve <br />
              each other!
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

LuckyToken.displayName = "LuckyToken";
export default LuckyToken;
