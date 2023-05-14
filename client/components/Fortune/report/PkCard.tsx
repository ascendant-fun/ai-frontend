/* eslint-disable @next/next/no-img-element */
import { UserReport } from "../../../../types/ApiClient";
import FortuneChart from './FortuneChart';
import { truncateStringInMiddle } from "../../../../utils/truncateString";

type CardStyle = 'purple' | 'blue';

interface PkCardProps {
    nickName: string;
    style: CardStyle;
    address: string;
    userReport: UserReport;
    showGradient: boolean;
}

function getGradientClasses(style: CardStyle, showGradient: boolean) {
    if (!showGradient) {
        return style === 'purple' ? 'text-[#F4FF71]' : 'text-[#FFFFFF]';
    }

    const baseClasses = 'bg-clip-text-new bg-gradient-to-b text-transparent';
    return style === 'purple' ? `${baseClasses} from-[#F4FF71] to-[#FBE200]` : `${baseClasses} from-[#FFFFFF] to-[#FFFFFF]/0`;
}

function PkCard({ nickName, style, address, userReport, showGradient = true }: PkCardProps) {
    const outerColorClasses = style === 'purple' ? 'from-main-300 to-main-500' : 'from-[rgba(17,112,255,0.2)] to-[rgba(17,112,255,0.5)]';
    const outerClasses = style === 'purple' ? 'rounded-l-lg ml-10' : ' rounded-r-lg mr-10';
    const borderClasses = style === 'purple' ? 'from-[#111111]/30 to-[#111111]/0 pl-1' : 'from-[rgba(255, 255, 255, 0)] to-[rgba(255, 255, 255, 0.2) pr-1';
    const starClasses = style === 'purple' ? '' : 'grayscale';
    const innerClasses = style === 'purple' ? 'pl-4 rounded-l-lg' : 'pr-4 flex-row-reverse rounded-r-lg';
    const chartClasses = style === 'purple' ? 'mr-[20px] ml-1' : 'ml-[20px] mr-4 pr-1';
    const bgImg = style === 'purple' ? 'left-9' : 'right-6';
    const percentageClasses = getGradientClasses(style, showGradient);

    const nameOnCard = nickName.length > 7
        ? nickName.substring(0, 7) + '...'
        : nickName;

    return (
        <div className={`overflow-hidden bg-gradient-to-r ${outerClasses} ${outerColorClasses}`}>
            <div className={`bg-gradient-to-r h-full py-1 grid ${borderClasses}`}>
                <div className={`bg-gradient-to-r flex py-2 ${innerClasses} ${outerColorClasses}`}>
                    <div className="mx-2 py-4 flex w-28 flex-col">
                        <div>
                            <p className={`font-bold break-all text-lg leading-5`}>{nameOnCard}&apos;s</p>
                            <p className="text-[14px]">Wallet</p>
                            <p className="break-all font-bold text-sm leading-[14px]">{address}</p>
                        </div>
                        <div className="mt-4">
                            <div
                                className={`text-5xl font-bold ${percentageClasses}`}
                            >
                                {`${userReport.percentile.toFixed(0)}%`}
                            </div>
                            <div className="flex">
                                {
                                    Array(userReport.star).fill(0).map((_, index) => (
                                        <img
                                            key={index}
                                            src="/assets/yellow-star.png"
                                            className={`${starClasses}`}
                                            width="20"
                                            height="20"
                                            alt="yellow star icon"
                                        />
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                    <div className={`${chartClasses} relative flex place-items-center max-w-[170px]`}>
                        <FortuneChart radarData={userReport.parsedRadar} showBackground={false} />
                        <img src="/assets/radar-dark.png" className={`absolute z-0 w-28 ${bgImg}`} alt="radar chart" />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PkCard;
