/* eslint-disable @next/next/no-img-element */
import {
    Chart as ChartJS,
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend,
    ChartData
} from 'chart.js';
import { Radar } from 'react-chartjs-2';
import { RadarData } from '../../../../types/ApiClient';
import { useRef, useState } from 'react';

ChartJS.register(
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend,
);

ChartJS.defaults.backgroundColor = '#FFFFFF';
interface FortuneChartProps {
    radarData: RadarData | null;
    showBackground: boolean;
}

function getChartScore(score: number | undefined): number {
    if (score === undefined) return 0;

    if (score > 400) return 400;

    if (score < -400) return -400;

    return score;
}

function FortuneChart({ radarData, showBackground = true }: FortuneChartProps) {
    const chartRef = useRef<ChartJS<"radar", number[], string>>(null);
    const [imgSrc, setImgSrc] = useState<string>('');

    let chartData = [
        getChartScore(radarData?.[3]),
        getChartScore(radarData?.[7]),
        getChartScore(radarData?.[6]),
        getChartScore(radarData?.[10]),
        getChartScore(radarData?.[11]),
        getChartScore(radarData?.[2]),
    ];

    const data = {
        labels: ['Trading', 'Airdrop', 'Mining', 'Influencing', 'Connecting', 'Building'],
        datasets: [
            {
                label: 'Score',
                data: chartData,
                backgroundColor: 'transparent',
                borderColor: '#DDFE15',
                borderWidth: showBackground ? 1 : 1,
                pointBackgroundColor: '#DDFE15',
                pointBorderColor: '#DDFE15',
                pointBorderWidth: showBackground ? 1 : 0.5,

            },
        ],
    } as ChartData<"radar", number[], string>;

    function done() {
        if (chartRef.current === null) return;

        const src = chartRef.current.toBase64Image();
        setImgSrc(src);
    }

    return (
        <div className={`mx-auto my-auto z-10 relative transition-all flex ${showBackground ? 'w-[280px] h-[280px] md:w-[420px] md:h-[420px]' : 'w-[190px] h-[190px]'}`}>
            {
                !imgSrc && (
                    <Radar className="" ref={chartRef} data={data} options={{
                        responsive: true,
                        backgroundColor: '#FFFFFF',
                        layout: {
                            padding: 0,
                        },
                        scales: {
                            r: {
                                // max: 400,
                                // min: -400,
                                ticks: {
                                    callback: function () { return "" },
                                    backdropColor: "rgba(0, 0, 0, 0)",
                                },
                                angleLines: {
                                    color: showBackground ? 'rgba(255,255,255,0.2)' : 'transparent',
                                    // color: 'transparent',
                                },
                                grid: {
                                    offset: true,
                                    tickBorderDash: [1, 100],
                                    tickBorderDashOffset: 1,
                                    color: showBackground ? "rgba(255,255,255,0.2)" : 'transparent',
                                    // color: 'transparent',
                                },
                                // pointLabels: {
                                //     color: 'rgba(255, 255, 255, 1)',
                                //     padding: -3,
                                //     font: {
                                //         size: showBackground ? 14 : 8,
                                //         family: 'Montserrat',
                                //         weight: showBackground ? "700" : "500",
                                //     }
                                // },
                                pointLabels: {
                                    display: false
                                }
                            },
                        },
                        plugins: {
                            legend: {
                                display: false
                            },
                        },
                        animation: {
                            onComplete: function () {
                                done();
                            }
                        }
                    }}
                    />
                )
            }
            {
                imgSrc &&
                <img
                    src={imgSrc}
                    alt="radar chart"
                    className={`aspect-square ${!showBackground ? 'scale-110' : 'w-full my-auto'}`}
                />
            }
        </div>
    );
}

export default FortuneChart;
