/* eslint-disable @next/next/no-img-element */
import { Whale } from "../../../types/ApiClient";

function WhaleCard({ whale }: { whale: Whale }) {
    return (
        <div className="rounded-lg bg-[#1A0D2A] px-4 py-4 max-w-xs w-full border-[3px] border-white/10 flex flex-col">
            <div className="rounded-full mx-auto bg-gradient-to-br from-main to-[#1170FF] p-[4px]">
                <div
                    className={`rounded-full overflow-hidden bg-cover w-20 h-20`}
                    style={{
                        backgroundImage: `url('${whale.avatar ? '/assets/whales/' + whale.avatar : '/assets/whales/02-cz.jpg'}')`
                    }}
                >
                </div>
            </div>
            <div className="flex justify-center mt-4">
                {
                    Array(whale.star).fill(0).map((_, index) => (
                        <img
                            key={index}
                            src="/assets/yellow-star.png" className="grayscale"
                            width="24"
                            height="24"
                            alt="yellow star icon"
                        />
                    ))
                }
            </div>
            <p className="text-sm text-center mt-2">Beats {whale.percentile.toFixed(0) + '%'} of Web3 wallets</p>
        </div>
    );
}

export default WhaleCard;
