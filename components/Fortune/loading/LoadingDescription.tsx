import { LoadingStages } from "../FortuneLoading";

type LoadingDescriptionProps = {
    loadingStage: LoadingStages;
}

const descriptions: Record<LoadingStages, {
    description: string;
    specialBorder: boolean;
    pc: {
        image: string;
        classes: string;
    };
    mobile: {
        image: string;
        classes: string;
    }
}> = {
    "1": {
        description: "Did you know that every object in the world, including your wallet, has its own astrology chart?",
        specialBorder: false,
        mobile: {
            image: '/images/loading/loading-1-mobile.gif',
            classes: "-translate-y-16"
        },
        pc: {
            image: '/images/loading/loading-1-pc.gif',
            classes: "-translate-y-[37%]"
        }
    },
    "2": {
        description: 'Affected by the patterns of stars when activated, your wallet carries energy and luck encoded by stars, signs and houses.',
        specialBorder: true,
        mobile: {
            image: '/images/loading/loading-2-mobile.gif',
            classes: "-translate-y-16"
        },
        pc: {
            image: '/images/loading/loading-2-pc.gif',
            classes: "-translate-y-[43%]"
        }
    },
    "3": {
        description: 'Affected by the patterns of stars when activated, your wallet carries energy and luck encoded by stars, signs and houses.',
        specialBorder: true,
        mobile: {
            image: '/images/loading/loading-2-mobile.gif',
            classes: "-translate-y-16"
        },
        pc: {
            image: '/images/loading/loading-2-pc.gif',
            classes: "-translate-y-[43%]"
        }
    },
    "4": {
        description: 'Affected by the patterns of stars when activated, your wallet carries energy and luck encoded by stars, signs and houses.',
        specialBorder: true,
        mobile: {
            image: '/images/loading/loading-2-mobile.gif',
            classes: "-translate-y-16"
        },
        pc: {
            image: '/images/loading/loading-2-pc.gif',
            classes: "-translate-y-[43%]"
        }
    },
    "5": {
        description: 'Using the principles of financial astrology, Ascendant delved into the fortunes of your wallet and answered everything you need to know about 2023.',
        specialBorder: false,
        mobile: {
            image: '/images/loading/loading-5-mobile.gif',
            classes: "-translate-y-20"
        },
        pc: {
            image: '/images/loading/loading-5-pc.gif',
            classes: "-translate-y-[43%]"
        }
    },
    "6": {
        description: '',
        specialBorder: false,
        mobile: {
            image: '',
            classes: ""
        },
        pc: {
            image: '',
            classes: ""
        }
    }
};

function getDescription(loadingStage: LoadingStages) {
    return descriptions?.[loadingStage]?.description ?? '';
}

function getBorder(loadingStage: LoadingStages) {
    return descriptions?.[loadingStage]?.specialBorder ? 'border-primary show-primary-arrow text-primary' : 'show-white-arrow border-white text-white';
}

function getInfo(loadingStage: LoadingStages) {
    return descriptions?.[loadingStage] ? descriptions?.[loadingStage] : descriptions?.[1];
}

function LoadingDescription({ loadingStage }: LoadingDescriptionProps) {
    // const description = getDescription(loadingStage);
    const border = getBorder(loadingStage);
    const info = getInfo(loadingStage);

    return (
        <div
            className={`transition-all arrow-box h-24 md:h-28 py-[10px] md:py-5 px-4 md:px-6 mt-6 md:mt-10 relative text-[17px] leading-[20px] z-20 rounded-md mx-6 md:mx-auto md:max-w-xl md:text-[22px] md:leading-[28px] border ${border}`}
        >
            {/* {description} */}
            <img
                className={`${info.mobile.classes} md:hidden mx-auto`}
                src={`${info.mobile.image}`}
                alt="Typing"
                width="290"
                height="100"
                loading="eager"
            />
            <img
                className={`${info.pc.classes} hidden md:block mx-auto`}
                src={`${info.pc.image}`}
                alt="Typing"
                width="600"
                height="100"
                loading="eager"
            />
        </div>
    );
}

export default LoadingDescription;