/* eslint-disable @next/next/no-img-element */
import { forwardRef } from "react";

import { UserReport } from "../../../../types/ApiClient";
import ReportHeader from "../base/ReportHeader";
import ReportFooter from "../base/ReportFooter";
import FortuneChart from "../report/FortuneChart";
import LuckyRoleLabel from "../base/LuckyRoleLabel";
import { LuckyRoles } from "../../../../utils/constants";

interface LuckyRoleProps {
  nickName: string;
  userReport: UserReport;
}

const LuckyRole = forwardRef<HTMLDivElement, LuckyRoleProps>(
  ({ nickName, userReport }, ref) => {
    // const highestRole = findTheHighestRole(userReport.parsedRadar);

    return (
      <div
        className={`h-full min-h-screen bg-no-repeat bg-cover bg-[url('/images/report/lucky-role-mobile-bg.jpg')] md:h-auto md:min-h-0 md:bg-none`}
      >
        <div
          className="h-[675px] md:h-[1000px] lg:h-[900px] bg-center md:bg-left flex flex-col overflow-hidden w-screen pb-4 max-w-[1130px] md:rounded-xl relative bg-no-repeat bg-cover bg-[url('/images/report/lucky-role-mobile-bg.jpg')] md:bg-[url('/images/report/lucky-role-bg.jpg')] md:scale-[85%] md:-translate-y-20 md:-mb-32 lg:scale-[70%] lg:-translate-y-32 lg:-mb-56 xl:scale-[70%] xl:-translate-y-32 xl:-mb-56 2xl:scale-[85%] 2xl:-translate-y-14 2xl:-mb-20 3xl:scale-[100%] 3xl:translate-y-0 3xl:mb-0"
          ref={ref}
        >
          <img
            src="/images/report/lucky-roles-star.svg"
            className="absolute z-0 inset-0 mt-32 px-4 md:hidden"
            alt="stars"
          />
          <ReportHeader
            nickName={nickName}
            address={userReport.publicAddress}
            ens={userReport.account.ens}
          />
          <div className="self-center mt-32 md:mt-36 mb-1 relative z-10 flex flex-col">
            <h2 className="font-bold uppercase text-center text-lg leading-4 md:text-2xl md:leading-4">
              2023
            </h2>
            <h3
              className={`font-michroma text-center text-primary text-[42px] leading-[50px] md:text-[75px] md:leading-[100px]`}
            >
              Bonanza Outlook
            </h3>
            <p className="px-12 md:px-36 mt-4 md:mt-6 text-[22px] text-center mx-auto leading-[26px] md:text-[30px] md:leading-[36px] md:max-w-3xl">
              Your fortune scores across 6 Web3.0 bonanzas
            </p>
            <div className="flex -mt-0 md:mt-0 px-6 py-6 md:py-8 m:px-8 relative max-w-[400px] self-center">
              <FortuneChart
                radarData={userReport.parsedRadar}
                showBackground={true}
              />
              <img
                src="/images/report/radar-bg.png"
                className="absolute inset-0 w-[90%] left-1/2 -translate-x-1/2 sm:w-[400px] z-0"
                alt="radar chart"
              />
              <LuckyRoleLabel
                label={LuckyRoles.trading.label}
                description={LuckyRoles.trading.description}
                extraClasses="absolute z-20 top-5 md:top-8 left-[53%] md:left-[52%] transform"
                popoverClasses="w-32 -translate-x-[30%]"
              />
              <LuckyRoleLabel
                label={LuckyRoles.airdrop.label}
                description={LuckyRoles.airdrop.description}
                extraClasses="absolute z-20 right-2 top-[51%] md:-right-4 md:top-[52%] -translate-y-24 md:-translate-y-32 transform"
                popoverClasses="-translate-x-12 md:-translate-x-12 w-24 md:w-32"
                position="bottom"
              />
              <LuckyRoleLabel
                label={LuckyRoles.mining.label}
                description={LuckyRoles.mining.description}
                extraClasses="absolute z-20 right-2 bottom-[52%] md:right-2 md:bottom-[47%] translate-y-24 transform"
                popoverClasses="w-24 md:w-36 -translate-x-14 md:-translate-x-1/2"
              />
              <LuckyRoleLabel
                label={LuckyRoles.influencing.label}
                description={LuckyRoles.influencing.description}
                extraClasses="absolute z-20 bottom-7 left-[48%] md:bottom-8 md:left-[46%] transform -translate-x-full"
                popoverClasses="w-32 md:w-40 -translate-x-[30%]"
                position="bottom"
              />
              <LuckyRoleLabel
                label={LuckyRoles.connecting.label}
                description={LuckyRoles.connecting.description}
                extraClasses="absolute z-20 left-0 bottom-1/2 md:left-4 md:bottom-[45%] md:-translate-x-1/2 translate-y-24 transform"
                popoverClasses="w-48 -translate-x-[30%]"
                position="top"
              />
              <LuckyRoleLabel
                label={LuckyRoles.building.label}
                description={LuckyRoles.building.description}
                extraClasses="absolute z-20 left-0 top-1/2 md:left-10 md:top-[52%] md:-translate-x-1/2 -translate-y-24 md:-translate-y-32 transform"
                popoverClasses="w-48 -translate-x-[30%]"
                position="top"
              />
            </div>
            {/* <p className="px-16 relative z-20 text-center -mt-3 md:mt-6 text-[#15FEF0] text-[20px] mx-auto leading-[24px] md:text-[22px] md:leading-[26px] md:max-w-3xl">
                    Your wallet is best used for {highestRole}!
                </p> */}
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

LuckyRole.displayName = "LuckyRole";
export default LuckyRole;
