import LoadingHeader from "./loading/LoadingHeader";
import LoadingBackground from "./loading/LoadingBackground";
import LoadingStatus from "./loading/LoadingStatus";
import { useEffect, useState } from "react";
import LoadingComplete from "./loading/LoadingComplete";
import LoadingMain from "./loading/LoadingMain";

export type LoadingStages = 1 | 2 | 3 | 4 | 5 | 6;

type FortuneLoadingProps = {
  showResult: boolean;
  takeMeToReport: () => void;
};

function FortuneLoading({ showResult, takeMeToReport }: FortuneLoadingProps) {
  const [currentStage, setCurrentStage] = useState<LoadingStages>(1);
  const [startAnimating, setStartAnimating] = useState(false);
  const [middleCounter, setMiddleCounter] = useState(0);
  const isComplete = currentStage === 6;

  useEffect(() => {
    setStartAnimating(true);
  }, []);

  useEffect(() => {
    if (!startAnimating) return;

    // animate first page
    let timer: NodeJS.Timer;

    if (currentStage === 1) {
      timer = setTimeout(() => {
        setCurrentStage(2);
      }, 6000);
    }
    // else if (currentStage === 2) {
    //     timer = setTimeout(() => {
    //         setCurrentStage(3);
    //     }, 1000);
    // } else if (currentStage === 3) {
    //     timer = setTimeout(() => {
    //         setCurrentStage(4);
    //     }, 1000);
    // }
    else if (currentStage === 2) {
      timer = setTimeout(() => {
        setCurrentStage(5);
      }, 6000);

      // // data returned
      // if (middleCounter >= 2 && showResult) {
      //     timer = setTimeout(() => {
      //         setCurrentStage(5);
      //     }, 3000);
      // } else {
      //     timer = setTimeout(() => {
      //         setMiddleCounter((currentCounter) => currentCounter + 1);
      //         setCurrentStage(2);
      //     }, 3000);
      // }
    } else if (currentStage === 5) {
      if (middleCounter >= 2 || showResult) {
        timer = setTimeout(() => {
          setCurrentStage(6);
        }, 6000);
      } else {
        timer = setTimeout(() => {
          setMiddleCounter((currentCounter) => currentCounter + 1);
          setCurrentStage(1);
        }, 6000);
      }
    }

    return () => clearTimeout(timer);
  }, [startAnimating, currentStage, showResult, middleCounter]);

  return (
    <div className={`flex justify-center md:pt-4`}>
      <div
        className={`bg-center flex flex-col md:bg-left overflow-hidden w-screen pb-4 max-w-[1130px] md:rounded-xl relative bg-no-repeat bg-cover md:scale-[85%] md:-translate-y-20 md:-mb-20 lg:scale-[75%] lg:-translate-y-20 lg:-mb-40 xl:scale-[80%] xl:-translate-y-20 xl:-mb-34 2xl:scale-[85%] 2xl:-translate-y-14 2xl:-mb-20 3xl:scale-[100%] 3xl:translate-y-0 3xl:mb-0 min-h-screen md:min-h-[830px] bg-[url('/images/loading/bg-mobile.jpg')] md:bg-[url('/images/loading/bg.jpg')]`}
      >
        <LoadingHeader />
        <LoadingBackground isComplete={isComplete} />
        <div className="h-[80px] md:h-[120px] w-full"></div>
        <LoadingStatus isComplete={isComplete} />
        <div className={`flex flex-col ${currentStage === 5 ? "" : "hidden"}`}>
          <LoadingMain loadingStage={5} />
        </div>
        <div className={`flex flex-col ${currentStage === 2 ? "" : "hidden"}`}>
          <LoadingMain loadingStage={2} />
        </div>
        <div className={`flex flex-col ${currentStage === 1 ? "" : "hidden"}`}>
          <LoadingMain loadingStage={1} />
        </div>
        {isComplete && <LoadingComplete onClickHandler={takeMeToReport} />}
      </div>
    </div>
  );
}

export default FortuneLoading;
