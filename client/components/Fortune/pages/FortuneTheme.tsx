/* eslint-disable @next/next/no-img-element */
import { forwardRef } from "react";
import { UserReport } from "../../../../types/ApiClient";
import ReportHeader from "../base/ReportHeader";
import ReportFooter from "../base/ReportFooter";
import { getThemeInfo } from "../../../../utils/utils";

interface FortuneThemeProps {
  nickName: string;
  userReport: UserReport;
}

function getHashTagClass(hashTag: string) {
  if (hashTag.length >= 12) {
    return "text-[30px] leading-[50px] md:text-[50px] lg:text-[80px] md:leading-[150px]";
  }

  return "text-[40px] leading-[50px] md:text-[70px] lg:text-[100px] md:leading-[150px]";
}

function getRarityParagraph(rarity: number, useOnly: boolean) {
  if (useOnly) {
    return `Only ${rarity}% of users own this theme`;
  }

  return `${rarity}% of users own this theme`;
}

const FortuneTheme = forwardRef<HTMLDivElement, FortuneThemeProps>(
  ({ nickName, userReport }, ref) => {
    const fortuneTheme = getThemeInfo(userReport.theme);
    const paragraph = fortuneTheme.paragraph;
    const paragraphFont =
      paragraph.length > 100
        ? "text-[18px] leading-[22px] md:text-[26px] md:leading-[32px]"
        : "text-[22px] leading-[26px] md:text-[30px] md:leading-[36px]";
    const nameFont = getHashTagClass(fortuneTheme.name);

    const rarityParagraph = getRarityParagraph(
      fortuneTheme.rarity,
      fortuneTheme.useOnly
    );

    return (
      <div
        className={`h-full min-h-screen bg-no-repeat bg-cover bg-[url('/images/report/fortune-theme-mobile-bg.jpg')] md:h-auto md:min-h-0 md:bg-none`}
      >
        <div
          className="h-[675px] md:h-[1000px] lg:h-[900px] bg-center md:bg-left flex flex-col overflow-hidden w-screen pb-4 max-w-[1130px] md:rounded-xl relative bg-no-repeat bg-cover bg-[url('/images/report/fortune-theme-mobile-bg.jpg')] md:bg-[url('/images/report/fortune-theme-bg.jpg')] md:scale-[85%] md:-translate-y-20 md:-mb-32 lg:scale-[70%] lg:-translate-y-32 lg:-mb-56 xl:scale-[70%] xl:-translate-y-32 xl:-mb-56 2xl:scale-[85%] 2xl:-translate-y-14 2xl:-mb-20 3xl:scale-[100%] 3xl:translate-y-0 3xl:mb-0"
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
          <div className="relative z-10 mx-auto mt-32 md:mt-36">
            <h2 className="font-bold uppercase text-center text-lg leading-4 md:text-2xl md:leading-4">
              2023 Fortune Theme
            </h2>
            <h3
              className={`font-michroma text-center text-primary ${nameFont}`}
            >
              #{fortuneTheme.name}
            </h3>
            <p className="text-primary text-center mt-0 font-bold text-[14px] leading-[15px] md:-mt-2 md:text-[18px]">
              {rarityParagraph}
            </p>
            <p
              className={`px-10 md:px-16 mt-4 md:mt-4 mb-4 md:mb-8 mx-auto md:max-w-3xl ${paragraphFont}`}
            >
              {paragraph}
            </p>
            <div
              className="aspect-square relative rounded-lg flex mt-8 mb-0 md:my-auto mx-auto w-full max-w-[250px] md:max-w-[320px] p-1 border border-primary"
              style={{
                background:
                  "linear-gradient(180deg, rgba(0, 255, 133, 0.26) 0%, rgba(255, 255, 255, 0) 100%)",
              }}
            >
              <div className="absolute h-28 inset-x-0 translate-y-1 bottom-0 w-[98%] mx-1 rounded-lg border-b border-primary"></div>
              <img
                src={`/images/meme/` + fortuneTheme.memeImg}
                className="aspect-square rounded-lg p-1 mx-auto bg-cover"
                alt="meme image"
              />
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

FortuneTheme.displayName = "FortuneTheme";

export default FortuneTheme;
