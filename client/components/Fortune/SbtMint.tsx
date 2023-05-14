/* eslint-disable @next/next/no-img-element */
import { UserReport } from "../../../types/ApiClient";
import MintSection from "./MintSection";
import { ClaimStatus } from "./FortuneResult";
import { Binder } from "../../hooks/useBind";
import ReportHeader from "./base/ReportHeader";
import ReportFooter from "./base/ReportFooter";

interface SbtMintProps {
  id?: string;
  userReport: UserReport;
  nickname: string;
  claimStatus: Binder<ClaimStatus>;
  isSbtMintInViewport: boolean;
  exportRandomImage: () => Promise<string | null>;
  isBenefitsModalOpen: Binder<boolean>;
}

function SbtMint({
  id,
  userReport,
  nickname,
  claimStatus,
  isSbtMintInViewport,
  exportRandomImage,
  isBenefitsModalOpen,
}: SbtMintProps) {
  return (
    <div
      className="bg-center md:bg-left flex flex-col overflow-hidden w-screen pb-4 max-w-[1130px] md:rounded-xl relative bg-no-repeat bg-cover md:scale-[85%] md:-translate-y-20 md:-mb-32 lg:scale-[70%] lg:-translate-y-32 lg:-mb-56 xl:scale-[70%] xl:-translate-y-32 xl:-mb-56 2xl:scale-[85%] 2xl:-translate-y-14 2xl:-mb-20 3xl:scale-[100%] 3xl:translate-y-0 3xl:mb-0"
      id={id ?? ""}
      style={{
        backgroundImage: "url('/images/report/sbt-bg.png')",
      }}
    >
      <img
        src="/images/report/stars.png"
        className="hidden md:block absolute inset-0 pt-32 px-8 z-0"
        alt="stars"
      />
      <img
        src="/images/report/stars-mobile.png"
        className="absolute inset-0 mt-20 px-4 md:hidden z-0"
        alt="stars"
      />
      <ReportHeader
        nickName={nickname}
        address={userReport.publicAddress}
        ens={userReport.account.ens}
      />
      <h3 className="text-[24px] mt-[100px] md:mt-32 leading-7 md:text-[60px] md:leading-[60px] text-primary text-center font-michroma relative z-10">
        Congratulations
      </h3>
      <p className="text-center text-[18px] leading-[20px] md:text-3xl md:leading-[36px] mt-1 md:mt-6 relative z-10">
        Your <strong>2023 fortune</strong> has been revealed!
      </p>
      <div className="mx-auto mt-3 md:mt-0 w-full px-2 md:px-8 py-2 md:py-6 relative z-10">
        <MintSection
          claimStatus={claimStatus}
          referralCode={userReport.account.code}
          planet={userReport.personalityPlanet}
          reportAddress={userReport.publicAddress}
          userReport={userReport}
          isSbtMintInViewport={isSbtMintInViewport}
          exportRandomImage={exportRandomImage}
          isBenefitsModalOpen={isBenefitsModalOpen}
        />
      </div>
      <ReportFooter
        extraClasses="mt-auto"
        referralCode={userReport.account.code}
      />
    </div>
  );
}

export default SbtMint;
