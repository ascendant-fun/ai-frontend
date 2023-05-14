import Image from "next/image";

function HomeAbout() {
    return (
        <>
            <section className="flex flex-col-reverse sm:grid sm:grid-cols-2 min-h-screen relative">
                <div className="py-20 px-4 md:px-14 max-w-md z-20 self-center">
                    <h2 className="text-primary/70 text-xl font-raleway uppercase">
                        <span className="mr-3">/</span>
                        About this Project
                    </h2>
                    <h3 className="mt-6 text-4xl space-y-2 font-gallient text-transparent bg-clip-text bg-gradient-to-t from-primary to-white">
                        Welcome to the
                        <br />
                        <span>Astrology World in Web3</span>
                    </h3>
                    <p className="mt-8">
                        Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi  eaque ipsa quae ab illo inventore veritatis et quasi
                    </p>
                    <Image src="/images/stars.png" width={88} height={88} alt="Stars" className="absolute hidden sm:block top-40 left-6 z-0" />
                </div>
                <div className="sm:mb-auto pt-14 max-w-3xl">
                    <Image src="/images/nft-sample-2.png" width={972.39} height={952} alt="Sample PFP NFT" className="relative z-10" />
                </div>
            </section>
            <div className="w-full primary-gradient h-[0.5px] z-0 hidden sm:block"></div>
        </>
    );
}

export default HomeAbout;