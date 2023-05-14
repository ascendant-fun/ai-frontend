/* eslint-disable @next/next/no-img-element */
import { forwardRef } from "react";
import { ReportProps } from "./report.types";
import ReportFooter from "./ReportFooter";
import ReportHeader from "./ReportHeader";
import FortuneChart from "./FortuneChart";

const ReportPageThree = forwardRef<HTMLDivElement, ReportProps>(
  ({ nickName, userReport, renderMode, hidden = false }, ref) => {
    return (
      <div
        className={`report-gradient overflow-hidden flex flex-col py-6 relative w-screen min-w-[360px] md:w-[370px] max-w-[420px] h-[780px] ${
          !renderMode ? "shadow-xl" : ""
        } ${hidden ? "hidden" : ""}`}
        ref={ref}
        id={renderMode ? "report-3-render" : "report-3-preview"}
      >
        <ReportHeader
          nickName={nickName}
          color="pink"
          address={userReport.publicAddress}
        />
        <h3 className="text-center text-[32px] leading-8 font-alfphabet mt-6">
          Fortune Index
        </h3>
        <p className="text-[14px] text-center mt-3 px-4">
          Your wallet’s strength and weakness across 6 Web3.0 roles
        </p>
        <div className="flex mt-4 relative max-w-[400px] mx-auto">
          <FortuneChart
            radarData={userReport.parsedRadar}
            showBackground={true}
          />
          <img
            src="/assets/radar.png"
            className="absolute left-3 -top-16 w-full sm:w-[400px] scale-[84%] z-0"
            alt="radar chart"
          />
        </div>
        <div className="h-8"></div>
        <div className="mt-auto px-4">
          {userReport?.accountID && (
            <ReportFooter
              renderMode={renderMode}
              accountID={userReport.accountID}
            />
          )}
        </div>
      </div>
    );
  }
);

ReportPageThree.displayName = "ReportPageThree";

export default ReportPageThree;
