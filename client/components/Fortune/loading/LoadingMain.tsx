// import { useEffect, useState } from "react";
import { LoadingStages } from "../FortuneLoading";
import LoadingDescription from "./LoadingDescription";
import LoadingImage from "./LoadingImage";
import LoadingLabel from "./LoadingLabel";
// import { Transition } from "@headlessui/react";

type LoadingMainProps = {
    loadingStage: LoadingStages;
}

function LoadingMain({ loadingStage }: LoadingMainProps) {
    // const [isShowing, setIsShowing] = useState(true)

    // useEffect(() => {
    //     setIsShowing(false);
    //     const timer = setTimeout(() => {
    //         setIsShowing(true);
    //     }, 200);

    //     return () => clearTimeout(timer);
    // }, [loadingStage]);

    return (
        <>
            <LoadingDescription loadingStage={loadingStage} />
            <div className="mx-auto mt-10 md:mt-8 relative z-30 md:h-[390px]">
                <LoadingImage loadingStage={loadingStage} />
            </div>
            <div className="mt-4 md:mt-8">
                <LoadingLabel loadingStage={loadingStage} />
            </div>
            {/* <Transition
                appear={true}
                show={isShowing}
                enter="opacity-0 transition-all ease-in-out duration-100"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transition-all ease-in-out duration-75"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
                className="flex flex-col"
            >
                <div className="mx-auto mt-5 md:mt-4 relative z-30">
                    <LoadingImage loadingStage={loadingStage} />
                </div>
                <div className="mt-4 md:mt-8">
                    <LoadingLabel loadingStage={loadingStage} />
                </div>
            </Transition> */}
        </>
    );
}


export default LoadingMain;