import { LoadingStages } from "../FortuneLoading";

type LoadingLabelProps = {
  loadingStage: LoadingStages;
};

const loadingLabels: Record<LoadingStages, string> = {
  "1": "Chart of Satoshi (BTC founder)’s crypto address",
  "2": "",
  "3": "",
  "4": "",
  "5": "",
  "6": "",
};

function LoadingLabel({ loadingStage }: LoadingLabelProps) {
  const loadingLabel = loadingLabels[loadingStage];

  return (
    <p className="text-primary font-bold text-[14px] leading-[20px] md:text-[18px] md:leading-[20px] text-center relative z-20">
      {loadingLabel}
    </p>
  );
}

export default LoadingLabel;
