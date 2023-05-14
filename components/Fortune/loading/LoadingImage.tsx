import Image from "next/image";
import { LoadingStages } from "../FortuneLoading";

type LoadingImageProps = {
    loadingStage: LoadingStages;
}

const loadingImages: Record<LoadingStages, {
    src: string;
    class: string;
    srcMobile: string;
    classMobile: string;
}> = {
    "1": {
        src: "/images/loading/chart-1.png",
        class: 'w-[390px] h-[390px]',
        classMobile: 'w-[300px] h-[300px]',
        srcMobile: "/images/loading/chart-1.png",
    },
    "2": {
        src: "/images/loading/chart-2-pc.png",
        class: 'w-[450px] h-[390px]',
        classMobile: 'w-[345px] h-[340px]',
        srcMobile: "/images/loading/chart-2-mobile.png",
    },
    "3": {
        src: "/images/loading/chart-2-pc.png",
        class: 'w-[450px] h-[390px]',
        classMobile: 'w-[345px] h-[340px]',
        srcMobile: "/images/loading/chart-2-mobile.png",
    },
    "4": {
        src: "/images/loading/chart-2-pc.png",
        class: 'w-[450px] h-[390px]',
        classMobile: 'w-[345px] h-[340px]',
        srcMobile: "/images/loading/chart-2-mobile.png",
    },
    "5": {
        src: "/images/loading/chart-3-pc.png",
        class: 'w-[665px] h-[448px] -translate-x-12',
        classMobile: 'w-[340px] h-[300px] translate-x-2',
        srcMobile: "/images/loading/chart-3-mobile.png",
    },
    "6": {
        src: "",
        class: '',
        classMobile: '',
        srcMobile: "",
    }
};

function LoadingImage({ loadingStage }: LoadingImageProps) {
    const loadingImage = loadingImages[loadingStage];

    return (
        <>
            <div className={`md:hidden ${loadingImage.classMobile}`}>
                <Image
                    className="w-full h-auto"
                    src={loadingImage.srcMobile}
                    width="0"
                    height="0"
                    sizes="100vw"
                    alt="chart"
                    priority={true}
                />
            </div>
            <div className={`hidden md:block ${loadingImage.class}`}>
                <Image
                    className="w-full h-auto"
                    src={loadingImage.src}
                    width="0"
                    height="0"
                    sizes="100vw"
                    alt="chart"
                    priority={true}
                />
            </div>
        </>
    );
}

export default LoadingImage;