import Image from "next/image";
import ActionButton from "../ActionButton";

function HomeMint() {
    return (
        <>
            <section className="flex flex-col-reverse sm:grid sm:grid-cols-2">
                <div className="sm:mt-auto max-w-3xl">
                    <Image src="/images/nft-sample.png" width={972.39} height={952} alt="Sample PFP NFT" className="sm:ml-8 sm:translate sm:translate-y-20 sm:translate-x-32 relative z-10" />
                </div>
                <div className="py-32 px-4 md:px-14 max-w-md z-20">
                    <h2 className="text-primary/70 text-xl font-raleway uppercase">
                        <span className="mr-3">/</span>
                        Headline
                    </h2>
                    <h3 className="mt-6 text-4xl space-y-2 font-gallient text-transparent bg-clip-text bg-gradient-to-t from-primary to-white">
                        Sed ut perspiciatis
                        <br />
                        <span>unde omnis</span>
                    </h3>
                    <p className="mt-8">
                        Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi  eaque ipsa quae ab illo inventore veritatis et quasi
                    </p>
                    <div className="mt-12">
                        <ActionButton title="Mint MY PFP" />
                    </div>
                </div>
            </section>
            <div className="w-full primary-gradient h-[0.5px] z-0 hidden sm:block"></div>
        </>
    );
}

export default HomeMint;