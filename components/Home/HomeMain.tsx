import Image from "next/image";
import SocialIcons from "./SocialIcons";

function HomeMain() {
    return (
        <section className="min-h-screen relative overflow-hidden">
            <h1 className="hidden">ASCENDANT</h1>
            <div className="absolute top-28 sm:top-20 transform -translate-x-1/2 left-12 sm:left-48 z-10">
                <Image src='/images/earth.png' width="383" height="723" alt="Earth" />
            </div>
            <div className="absolute bottom-64 sm:bottom-48 right-10 z-10">
                <Image src='/images/logo-full.svg' width="695" height="96" alt="Full logo" />
            </div>
            <div className="absolute bottom-6 sm:bottom-24 right-4 sm:right-10 z-10">
                <SocialIcons />
            </div>
            <div className="absolute bottom-0 left-0">
                <Image src='/images/river-1.png' width={879.95} height={356} alt="River" className="transform -translate-x-1/4 translate-y-20 mix-blend-lighten" />
            </div>
            <div className="hidden sm:flex absolute bottom-0 right-0">
                <Image src='/images/river-2.png' width={879.95} height={419.59} alt="River" className="transform translate-x-6 translate-y-28 mix-blend-lighten" />
            </div>
            <div className="absolute top-10 sm:top-0 -right-48 sm:right-0">
                <Image src='/images/mountains.png' width={835} height={922.07} alt="Mountains" className="transform opacity-90 mix-blend-lighten" />
            </div>
        </section>
    );
}

export default HomeMain;