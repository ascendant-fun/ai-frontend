/* eslint-disable @next/next/no-img-element */
import { forwardRef } from "react";
import dynamic from "next/dynamic";
import { UserReport } from "../../../../types/ApiClient";
import ReportHeader from "../base/ReportHeader";
import ReportFooter from "../base/ReportFooter";
import { LuckyMonthValues } from "../../../../types/ApiClient";

interface LuckyMonthsProps {
  nickName: string;
  userReport: UserReport;
}

const LuckyMonthsChart = dynamic(() => import("../base/LuckyMonthsChart"), {
  ssr: false,
});
const predictedLuckyMonths: LuckyMonthValues[] = [4, 5, 10, 11, 12];

function getParagraph(maxMonth: string | undefined) {
  if (!maxMonth) return "";

  const parsedMaxMonth = parseInt(maxMonth) as LuckyMonthValues;
  const isMatched = predictedLuckyMonths.includes(parsedMaxMonth);

  if (isMatched) {
    return "Since your luckiest month falls within our projected timeframe for a market upswing (January, April, May, October, November, and December), we suggest further your investments in advance to maximize potential gains.";
  }

  return "Since your luckiest month coincides with our projected timeframe for a market downturn (February, March, June, July, August, and September), consider taking a short position during this time and reap significant profits.";
}

const LuckyMonths = forwardRef<HTMLDivElement, LuckyMonthsProps>(
  ({ nickName, userReport }, ref) => {
    const paragraph = getParagraph(userReport?.parsedLuckyMonths?.maxMonth);

    return (
      <div
        className={`h-full min-h-screen bg-no-repeat bg-cover bg-[url('/images/report/lucky-months-mobile-bg.jpg')] md:h-auto md:min-h-0 md:bg-none`}
      >
        <div
          className="h-[675px] md:h-[1000px] lg:h-[900px] bg-center md:bg-left flex flex-col overflow-hidden w-screen pb-4 max-w-[1130px] md:rounded-xl relative bg-no-repeat bg-cover bg-[url('/images/report/lucky-months-mobile-bg.jpg')] md:bg-[url('/images/report/lucky-months-bg.jpg')] md:scale-[85%] md:-translate-y-20 md:-mb-32 lg:scale-[70%] lg:-translate-y-32 lg:-mb-56 xl:scale-[70%] xl:-translate-y-32 xl:-mb-56 2xl:scale-[85%] 2xl:-translate-y-14 2xl:-mb-20 3xl:scale-[100%] 3xl:translate-y-0 3xl:mb-0"
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
          <div className="mx-auto mt-32 md:mt-36">
            <h2 className="font-bold uppercase text-center text-lg leading-4 md:text-2xl md:leading-4">
              2023
            </h2>
            <h3
              className={`font-michroma text-center text-primary text-[38px] leading-[50px] md:text-[75px] md:leading-[100px]`}
            >
              Fortune Trend
            </h3>
            <p className="px-10 md:px-16 mt-4 md:mt-6 text-center text-[22px] mx-auto leading-[26px] md:text-[30px] md:leading-[36px] md:max-w-3xl">
              Your fortune scores across
              <br /> 12 months in 2023
            </p>
            <div
              className="relative max-w-[90vw] md:max-w-4xl md:mx-auto mx-4 mt-12 text-xs leading-[14px] md:text-[20px] md:leading-6 backdrop-blur-sm py-3 px-2 md:px-4 rounded-lg border border-primary"
              style={{
                background:
                  "linear-gradient(180deg, rgba(221, 254, 21, 0.26) 0%, rgba(255, 255, 255, 0) 100%)",
              }}
              dangerouslySetInnerHTML={{
                __html: paragraph,
              }}
            ></div>
            <div className="relative">
              <div
                className="max-w-[90vw] md:max-w-[900px] md:mx-auto overflow-x-scroll md:overflow-x-hidden scrollbar-hide mx-4 text-xs leading-[14px] border-t-0 md:text-base md:leading-5 backdrop-blur-md py-3 px-2 md:py-6 md:px-6 rounded-lg border border-primary"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(0, 255, 133, 0.26) 0%, rgba(255, 255, 255, 0) 100%)",
                }}
              >
                {userReport.parsedLuckyMonths && (
                  <LuckyMonthsChart
                    luckyMonths={userReport.parsedLuckyMonths}
                  />
                )}
              </div>
              <div
                className="absolute bottom-2 right-8 md:hidden w-[43px] h-[49px]"
                // style={{
                //     background: 'linear-gradient(67.42deg, #142ECB 24.05%, rgba(217, 217, 217, 0) 209.98%)',
                //     filter: 'blur(20px)'
                // }}
              ></div>
              <svg
                width="43"
                height="49"
                className="absolute bottom-2 right-8 md:hidden"
                viewBox="0 0 43 49"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M38.5632 8.42561H28.5695C28.1591 8.42561 27.8262 8.11392 27.8262 7.72975C27.8262 7.34557 28.1591 7.03388 28.5695 7.03388H38.5632C38.9736 7.03388 39.3065 7.34557 39.3065 7.72975C39.3065 8.11392 38.9739 8.42561 38.5632 8.42561Z"
                  fill="white"
                />
                <path
                  d="M36.0656 11.5943C35.8753 11.5943 35.6851 11.5265 35.5399 11.3906C35.2496 11.1188 35.2496 10.6784 35.5399 10.4066L38.3992 7.72992L35.5399 5.05261C35.2496 4.78079 35.2496 4.34042 35.5399 4.06861C35.8303 3.7968 36.3007 3.79679 36.5911 4.06861L39.9757 7.23764C40.2661 7.50946 40.2661 7.94982 39.9757 8.22163L36.5911 11.3902C36.4462 11.5261 36.2559 11.5943 36.0656 11.5943Z"
                  fill="white"
                />
                <path
                  d="M10.8975 8.42559H1.52893C1.14422 8.42559 0.832092 8.11389 0.832092 7.72969C0.832092 7.34549 1.14422 7.03378 1.52893 7.03378H10.8975C11.2823 7.03378 11.5944 7.34549 11.5944 7.72969C11.5944 8.11389 11.2823 8.42559 10.8975 8.42559Z"
                  fill="white"
                />
                <path
                  d="M3.86995 11.5943C3.6915 11.5943 3.51321 11.5265 3.37713 11.3906L0.204151 8.22187C-0.0680502 7.95004 -0.0680502 7.50965 0.204151 7.23782L3.37713 4.06862C3.64933 3.79679 4.09031 3.79679 4.3625 4.06862C4.63469 4.34046 4.6347 4.78085 4.3625 5.05267L1.68207 7.73014L4.3625 10.407C4.6347 10.6788 4.6347 11.1192 4.3625 11.391C4.2264 11.526 4.04795 11.5943 3.86995 11.5943Z"
                  fill="white"
                />
                <path
                  d="M38.858 43.947L28.8981 46.6158C27.6035 46.9627 27.0219 46.5941 26.6743 45.8827C26.5625 45.6544 25.8202 42.9378 25.5551 42.6915C22.1784 39.9593 15.142 29.5429 14.8432 29.1003C14.7986 29.0334 14.7633 28.9609 14.7395 28.8837C11.9653 19.9832 12.4484 19.7828 13.1803 19.4784C14.0245 19.1297 14.9241 19.1612 15.7847 19.5748C17.6443 20.4667 18.9411 22.8802 19.5558 24.8979C19.7335 25.1298 19.918 25.3674 20.1014 25.603C19.0797 21.5877 17.1978 14.5902 15.8786 9.76196C15.2377 6.70038 16.5234 5.88101 17.3459 5.6606C17.6494 5.57928 17.9703 5.55675 18.2903 5.59663C18.1163 4.22385 19.1339 3.14354 20.2732 2.79129C21.6267 2.37644 23.2299 3.31081 23.7608 4.77917L27.2789 16.1722C27.5058 16.0176 27.6623 15.9258 28.1532 15.7729C29.5268 15.3457 31.1167 16.214 31.6101 17.5709L32.0857 19.0935C32.3159 18.9295 32.5818 18.8169 32.8853 18.7355C34.4656 18.3504 35.5947 19.1527 36.2404 21.1194C37.7633 25.756 39.4211 32.8987 39.6916 38.4029C39.7063 38.688 40.4378 41.7403 40.5237 42.1682C40.6666 42.8762 40.0263 43.634 38.858 43.947ZM28.5155 45.0023L38.3909 42.3562C38.5388 42.3001 38.6587 42.3227 38.8265 42.1521C38.7464 41.7918 38.0573 38.896 38.0371 38.4849C37.7732 33.1347 36.1543 26.1683 34.6659 21.637C34.2076 20.2403 33.7816 20.2122 33.2784 20.347C32.6406 20.5179 32.7843 21.2631 32.9169 21.758C33.0336 22.1936 32.7803 22.6433 32.347 22.7689L32.3302 22.7734C31.9025 22.888 31.4577 22.6446 31.325 22.2192L30.0408 18.1016C29.8776 17.6556 29.1872 17.2128 28.5835 17.3746C28.5771 17.3763 28.5706 17.378 28.5643 17.3802C28.1301 17.5061 27.9186 17.8025 27.8323 17.9644L28.5742 20.366C28.7095 20.8036 28.4638 21.2677 28.0266 21.4024C27.5685 21.5464 27.1249 21.292 26.9902 20.8547L22.1902 5.30583C21.941 4.61818 21.3775 4.21181 20.7631 4.37472C20.3476 4.48501 19.8 4.90957 19.9597 5.51325C20.214 6.47213 24.2317 20.1152 24.3435 20.4948L24.3457 20.5012C24.4747 20.9404 24.2237 21.4011 23.7847 21.531C23.3438 21.6597 22.8853 21.4089 22.7555 20.9704L18.9828 8.18722C18.7309 7.33252 18.2862 7.1078 17.7758 7.26157C16.9088 7.52317 17.3952 8.92144 17.4903 9.37345C19.7879 17.7774 22.5312 28.0052 22.4829 28.729C22.4596 29.0734 22.2154 29.3842 21.8855 29.4837C21.2803 29.6697 18.0384 25.6096 18.0093 25.5109C17.3975 23.4041 15.9409 20.776 14.3189 20.8943C14.6972 22.4616 15.4051 25.4354 16.2868 28.2725C17.0257 29.3614 23.5808 38.9599 26.6017 41.404C27.2241 41.9065 28.0422 44.8387 28.0922 44.9913C28.181 45.1124 28.3713 45.0207 28.5155 45.0023Z"
                  fill="white"
                />
              </svg>
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

LuckyMonths.displayName = "LuckyMonths";
export default LuckyMonths;
