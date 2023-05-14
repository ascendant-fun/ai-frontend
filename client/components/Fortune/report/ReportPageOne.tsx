/* eslint-disable @next/next/no-img-element */
import WhaleCard from "../WhaleCard";
import EmptyWhaleCard from "../EmptyWhaleCard";
import { ReportProps } from "./report.types";
import { forwardRef } from "react";
import ReportFooter from "./ReportFooter";
import ReportHeader from "./ReportHeader";

function getBackgroundImg(stars: string | number | undefined) {
  if (typeof stars === "string") {
    stars = parseInt(stars);
  }

  if (stars === 1) return "/assets/1-star-background.png";
  if (stars === 2) return "/assets/2-star-background.png";
  if (stars === 3) return "/assets/3-star-background.png";
  if (stars === 4) return "/assets/4-star-background.png";

  return "/assets/5-star-background.png";
}

const ReportPageOne = forwardRef<HTMLDivElement, ReportProps>(
  ({ nickName, userReport, renderMode, hidden = false }, ref) => {
    return (
      <div
        className={`report-gradient overflow-hidden grid w-screen min-w-[360px] md:w-[370px] max-w-[420px] h-[780px] ${
          !renderMode ? "shadow-xl" : ""
        } ${hidden ? "" : ""}`}
        ref={ref}
        id={renderMode ? "report-1-render" : "report-1-preview"}
      >
        <div
          className="px-6 py-6 bg-no-repeat relative flex flex-col bg-contain"
          style={{
            backgroundImage: `url(${getBackgroundImg(userReport.star)})`,
          }}
        >
          <ReportHeader
            nickName={nickName}
            color="yellow"
            address={userReport.publicAddress}
          />
          <h3 className="text-center text-[40px] leading-8 font-alfphabet mt-6">
            Beats <span>{userReport.percentile.toFixed(0)}% </span>
            <br />
            <span className="text-2xl">of web3 wallets</span>
          </h3>
          <div className="flex justify-center mt-8">
            {Array(userReport.star)
              .fill(0)
              .map((_, index) => (
                <img
                  key={index}
                  src="/assets/yellow-star.png"
                  width="64"
                  height="64"
                  alt="yellow stars icon"
                />
              ))}
          </div>
          <p className="text-center px-4 mt-10 leading-[18px]">
            This wallet defeated wallets of these whales:
          </p>
          <div className="flex justify-center space-x-2 mt-6">
            {!userReport.parsedDefeatedWhales ||
            userReport.parsedDefeatedWhales?.length === 0 ? (
              <EmptyWhaleCard />
            ) : (
              userReport.parsedDefeatedWhales?.map((defeatedWhale, index) => (
                <WhaleCard key={index} whale={defeatedWhale} />
              ))
            )}
          </div>
          <div className="h-4"></div>
          <div className="mt-auto">
            {userReport?.accountID && (
              <ReportFooter
                renderMode={renderMode}
                accountID={userReport.accountID}
              />
            )}
          </div>
        </div>
      </div>
    );
  }
);

ReportPageOne.displayName = "ReportPageOne";

export default ReportPageOne;
