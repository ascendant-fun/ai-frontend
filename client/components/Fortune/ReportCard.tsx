/* eslint-disable @next/next/no-img-element */
import { UserReport } from "../../../types/ApiClient";
import { forwardRef } from "react";
import ReportPageOne from "./report/ReportPageOne";

interface ReportCardProps {
  nickName: string;
  userReport: UserReport | undefined;
  renderMode: boolean;
  hidden?: boolean;
}

/**
 * Don't use the next/image component, as it will mess up when exporting as an image
 */
const ReportCard = forwardRef<HTMLDivElement, ReportCardProps>(
  ({ nickName, userReport, renderMode, hidden = false }, ref) => {
    return (
      <div ref={ref} className="md:snap-center">
        {userReport && (
          <ReportPageOne
            nickName={nickName}
            userReport={userReport}
            renderMode={renderMode}
            hidden={hidden}
          />
        )}
      </div>
    );
  }
);
ReportCard.displayName = "ReportCard";

export default ReportCard;
