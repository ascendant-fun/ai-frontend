import Image from "next/image";

type LoadingBackgroundProps = {
    isComplete: boolean;
};

function LoadingBackground({ isComplete }: LoadingBackgroundProps) {
    return (
        <>
            {/* mountain */}
            <div className="absolute z-10 bottom-0 md:hidden w-full translate-y-[30%]">
                <Image
                    src="/images/loading/mountain-mobile.png"
                    className="w-full h-auto"
                    width="0"
                    height="0"
                    sizes="100vw"
                    alt="mountain"
                />
            </div>
            <div className="absolute z-0 bottom-0 hidden md:block w-full">
                <Image
                    src="/images/loading/mountain.png"
                    className="w-full h-auto"
                    width="0"
                    height="0"
                    sizes="100vw"
                    alt="mountain"
                />
            </div>
            {/* Space */}
            <div className="absolute z-0 md:hidden w-[90%] top-24 left-1/2 -translate-x-1/2">
                <Image
                    src="/images/loading/space-mobile.svg"
                    className="w-full h-auto"
                    width="0"
                    height="0"
                    sizes="100vw"
                    alt="space"
                />
            </div>
            <div className="absolute z-0 hidden md:block w-[90%] top-[25%] left-0">
                <Image
                    src="/images/loading/space.svg"
                    className="w-full h-auto"
                    width="0"
                    height="0"
                    sizes="100vw"
                    alt="space"
                />
            </div>
            <div className="absolute z-0 hidden md:block w-[90%] top-[20%] left-1/2 -translate-x-1/2">
                <Image
                    src="/images/loading/metereos.png"
                    className="w-full h-auto"
                    width="0"
                    height="0"
                    sizes="100vw"
                    alt="space"
                />
            </div>
            {/* balls */}
            <div className="absolute z-10 w-[300px] md:w-[396px] right-0 top-[230px] md:top-[320px] translate-x-[20%] md:right-[15%] md:translate-x-0">
                <Image
                    className="w-full h-auto"
                    src="/images/about-us/ball.png"
                    alt="chart"
                    width="0"
                    height="0"
                    sizes="100vw"
                />
            </div>
            <div className="absolute z-0 hidden md:block w-[105px] right-8 top-1/2 -translate-y-[100%]">
                <Image
                    className="w-full h-auto"
                    src="/images/about-us/ball.png"
                    alt="chart"
                    width="0"
                    height="0"
                    sizes="100vw"
                />
            </div>
            <div className="absolute z-0 hidden md:block w-[140px] left-[20%] top-1/2 -translate-y-[50%]">
                <Image
                    className="w-full h-auto"
                    src="/images/about-us/ball.png"
                    alt="chart"
                    width="0"
                    height="0"
                    sizes="100vw"
                />
            </div>
            <div className="absolute w-[59px] md:w-[53px] left-0 top-[300px] -translate-x-1/3 md:left-8 md:top-[420px]">
                <Image
                    className="w-full h-auto"
                    src="/images/about-us/ball.png"
                    alt="chart"
                    width="0"
                    height="0"
                    sizes="100vw"
                />
            </div>
            {/* chart */}
            {
                !isComplete && (
                    <div className="absolute z-0 w-[458px] md:w-[538px] top-0 left-1/2 -translate-x-1/2 -translate-y-12 md:-translate-y-[20%]">
                        <Image
                            className="w-full h-auto"
                            src="/images/loading/chart.svg"
                            alt="chart"
                            width="0"
                            height="0"
                            sizes="100vw"
                        />
                    </div>
                )
            }
        </>
    );
}

export default LoadingBackground;