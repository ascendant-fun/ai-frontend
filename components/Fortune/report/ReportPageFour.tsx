/* eslint-disable @next/next/no-img-element */
import { ReportProps } from "./report.types";
import { forwardRef } from "react";
import ReportFooter from "./ReportFooter";
import ReportHeader from "./ReportHeader";
import PkCard from "./PkCard";
import { truncateStringInMiddle } from "../../../utils/truncateString";
import { UserReport } from "../../../types/ApiClient";

interface ReportPageFourProps extends ReportProps {
  targetUserReport: UserReport;
  showGradientText: boolean;
}

const ReportPageFour = forwardRef<HTMLDivElement, ReportPageFourProps>(
  (props, ref) => {
    const {
      nickName,
      userReport,
      renderMode,
      targetUserReport,
      showGradientText,
      hidden = false,
    } = props;
    const truncatedAddress =
      userReport.publicAddress !== undefined
        ? truncateStringInMiddle(userReport.publicAddress, 8, "******", 2, 4)
        : "";

    const truncatedTargetAddress = truncateStringInMiddle(
      targetUserReport.publicAddress,
      8,
      "******",
      2,
      4
    );

    return (
      <div
        className={`report-gradient overflow-hidden flex flex-col py-6 relative w-screen min-w-[360px] md:w-[370px] max-w-[420px] h-[780px] ${
          !renderMode ? "shadow-xl" : ""
        } ${hidden ? "hidden" : ""}`}
        ref={ref}
        id={renderMode ? "report-4-render" : "report-4-preview"}
      >
        <ReportHeader nickName={nickName} color="pink" />
        <h3 className="text-center text-xl px-6 leading-6 font-alfphabet mt-5">
          Crypto Wallets Battle Between
        </h3>
        <div className="space-y-4 pt-6 relative">
          {userReport.percentile > targetUserReport.percentile ? (
            <>
              <PkCard
                style="purple"
                address={truncatedAddress}
                userReport={userReport}
                nickName={nickName}
                showGradient={showGradientText}
              />
              <PkCard
                style="blue"
                address={truncatedTargetAddress}
                userReport={targetUserReport}
                nickName={targetUserReport.account.nickName ?? ""}
                showGradient={showGradientText}
              />
            </>
          ) : (
            <>
              <PkCard
                style="purple"
                address={truncatedTargetAddress}
                userReport={targetUserReport}
                nickName={targetUserReport.account.nickName ?? ""}
                showGradient={showGradientText}
              />
              <PkCard
                style="blue"
                address={truncatedAddress}
                userReport={userReport}
                nickName={nickName}
                showGradient={showGradientText}
              />
            </>
          )}
          <img
            src="/assets/beats.png"
            className="w-20 h-20 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
            alt="beats icon"
          />
        </div>
        <div className="h-12"></div>
        <div className="px-6 mt-auto">
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

ReportPageFour.displayName = "ReportPageThree";

export default ReportPageFour;
