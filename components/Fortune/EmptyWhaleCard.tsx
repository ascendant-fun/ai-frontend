/* eslint-disable @next/next/no-img-element */
function EmptyWhaleCard() {
    return (
        <div className="rounded-lg bg-[#1A0D2A] px-2 pb-4 pt-6 max-w-xs w-full border-[3px] border-white/10 flex flex-col">
            <img src="/assets/moon.svg" className="w-20 h-20 mx-auto" alt="Moon icon" />
            <p className="text-white/60 text-center text-base mt-3 leading-[18px]">“Sorry. There ain&apos;t no whale beaten by you. Babe, you can&apos;t become a whale without a whale-beaten wallet!”</p>
        </div>
    )
}

export default EmptyWhaleCard;