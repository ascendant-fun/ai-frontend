/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import BackButton from "./BackButton";
import KnowYourself from "./KnowYourself";
import ExploreRelationships from "./ExploreRelationships";
import NavigateProfit from "./NavigateProfit";

const desc =
  "About ascendant.fun - Apply astrology on-chain to enrich your daily life.";

const partnerList = [
  "/images/about-us/partners/alchemy.png",
  "/images/about-us/partners/arbitrum.png",
  "/images/about-us/partners/assure.png",
  "/images/about-us/partners/belincrypto.png",
  "/images/about-us/partners/bitizen.png",
  "/images/about-us/partners/blockbeats.png",
  "/images/about-us/partners/binance-chain.png",
  "/images/about-us/partners/defi-news.png",
  "/images/about-us/partners/dj.png",
  "/images/about-us/partners/okx.png",
  "/images/about-us/partners/astrological.png",
  "/images/about-us/partners/foxnews.png",
  "/images/about-us/partners/knn3.png",
  "/images/about-us/partners/lens.png",
  "/images/about-us/partners/moralis.png",
  "/images/about-us/partners/isar.png",
  "/images/about-us/partners/phaver.png",
  "/images/about-us/partners/tokenpocket.png",
  "/images/about-us/partners/unipass.png",
  "/images/about-us/partners/markerdao.png",
];

function Main() {
  const router = useRouter();

  const handleBackButton = () => {
    router.push("/");
  };

  return (
    <>
      <Head>
        <title>About us - Ascendant Web3 Astrology</title>
        <meta name="description" content={desc} />
        <meta
          name="keywords"
          content="Ascendant NFT, Web3 Astrology, Numerology, Crypto, Zodiac, Astrology, Spiritual, Tarot, Metaphysics"
        />
      </Head>
      <div className="min-h-screen bg-no-repeat bg-cover bg-[url('/images/about-us/background-mobile.jpg')] md:bg-[url('/images/about-us/background.jpg')]">
        <section className="relative min-h-[560px] md:min-h-screen flex">
          <div className="mx-auto w-full mt-4 md:pt-8 absolute top-0 z-10">
            <img
              className="w-full relative z-10 px-4"
              src="/assets/logo.svg"
              alt="Logo"
            />
          </div>
          <div className="w-full absolute max-w-[500px] z-0 top-16 left-1/2 -translate-x-1/2 md:max-w-none md:w-[700px] md:h-[700px] lg:w-[900px] lg:h-[900px] 2xl:w-[1000px] 2xl:h-[1000px] md:right-0 md:top-[15%] md:translate-x-0 lg:-translate-x-[15%] 2xl:-translate-x-[10%]">
            <Image
              className="w-full h-auto scale-[145%] md:scale-100"
              src="/images/about-us/chart.png"
              alt="chart"
              width="0"
              height="0"
              sizes="100vw"
            />
          </div>
          {/* Space */}
          <div className="w-full absolute inset-0 top-28 -translate-x-12 hidden md:block">
            <Image
              className="w-full h-auto scale-[140%] md:scale-100"
              src="/images/about-us/space.svg"
              alt="chart"
              width="0"
              height="0"
              sizes="100vw"
            />
          </div>
          {/* Star */}
          <div className="absolute w-[60px] md:w-[100px] left-1/2 -translate-x-1/2 bottom-2 md:bottom-12">
            <Image
              className="w-full h-auto scale-[140%] md:scale-100"
              src="/images/about-us/star.svg"
              alt="chart"
              width="0"
              height="0"
              sizes="100vw"
            />
          </div>
          <div className="absolute w-[40px] left-2 bottom-10 md:hidden">
            <Image
              className="w-full h-auto scale-[140%] md:scale-100"
              src="/images/about-us/star.svg"
              alt="chart"
              width="0"
              height="0"
              sizes="100vw"
            />
          </div>
          {/* Balls Section */}
          <div className="absolute z-10 right-0 w-[98px] bottom-0 translate-x-8 md:w-[200px] md:bottom-0 md:translate-y-2/3">
            <Image
              className="w-full h-auto"
              src="/images/about-us/ball.png"
              alt="chart"
              width="0"
              height="0"
              sizes="100vw"
            />
          </div>
          <div className="absolute z-10 w-[96px] hidden md:block bottom-2 left-1/4">
            <Image
              className="w-full h-auto"
              src="/images/about-us/ball.png"
              alt="chart"
              width="0"
              height="0"
              sizes="100vw"
            />
          </div>
          <div className="absolute z-10 w-[48px] hidden md:block top-[24%] left-[32%]">
            <Image
              className="w-full h-auto"
              src="/images/about-us/ball.png"
              alt="chart"
              width="0"
              height="0"
              sizes="100vw"
            />
          </div>
          <div className="absolute z-10 w-[57px] hidden md:block top-[23%] right-[35%] lg:right-[45%]">
            <Image
              className="w-full h-auto"
              src="/images/about-us/ball.png"
              alt="chart"
              width="0"
              height="0"
              sizes="100vw"
            />
          </div>
          <div className="absolute z-10 w-[79px] hidden md:block -bottom-6 right-1/4 lg:right-[45%]">
            <Image
              className="w-full h-auto"
              src="/images/about-us/ball.png"
              alt="chart"
              width="0"
              height="0"
              sizes="100vw"
            />
          </div>
          <div className="w-[95%] absolute top-0 z-0 -translate-y-1/2 left-1/2 -translate-x-1/2 md:left-0 md:top-28 md:w-[542px] md:h-[542px] md:-translate-x-[45%] md:translate-y-0 md:z-10">
            <div className="relative">
              <Image
                src="/images/about-us/ball-2.png"
                alt="Ball image"
                width="0"
                height="0"
                sizes="100vw"
                className="w-full h-auto"
              />
            </div>
          </div>
          <div className="absolute z-10 top-16 left-4 md:top-48">
            <BackButton onClickHandler={handleBackButton} />
          </div>
          <div className="my-auto mx-auto px-4 md:mx-0 z-10 pt-64 md:pt-0 md:translate-y-12 md:ml-40 md:border-l-4 md:border-l-[#D84B8B]">
            <h1 className="font-michroma text-center text-secondary text-[36px] leading-[37px] md:text-[70px] md:leading-[78px] md:text-left">
              Bring the sky <br className="hidden md:inline" />
              down to earth
            </h1>
            <p className="mt-4 px-2 text-center font-bold text-[22px] leading-[26px] md:text-[40px] md:leading-[40px] md:text-left md:font-normal md:max-w-md">
              Apply astrology on-chain to enrich your daily life.
            </p>
          </div>
        </section>
        <section className="mt-4 md:mt-24 md:px-44 relative">
          <div className="relative max-w-[260px] md:max-w-[480px] mx-auto md:ml-0">
            <Image
              className="w-full h-auto"
              src="/images/about-us/sign.png"
              width="0"
              height="0"
              sizes="100vw"
              alt="signs"
            />
          </div>
          <p className="pl-4 pr-2 md:px-0 font-michroma text-xl leading-[24px] mt-4 md:text-[29px] md:leading-[48px]">
            Ascendant is an innovative Web3 astrology ecosystem that blends AI
            with astrology to help you unlock the everyday magic within you and
            navigate the exciting world of Web3. Be prepared to have your
            FIRST-EVER personalized AI Astrologer.
          </p>
          <Image
            className="absolute hidden md:block top-[22%] right-12"
            src="/images/about-us/ball.png"
            alt="ball"
            width="96"
            height="96"
          />
          <Image
            className="absolute hidden md:block top-[15%] left-0 -translate-x-1/2"
            src="/images/about-us/ball.png"
            alt="ball"
            width="345"
            height="345"
          />
          <div className="md:hidden h-40 relative">
            <Image
              className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2"
              src="/images/about-us/star.svg"
              alt="chart"
              width="150"
              height="150"
            />
            <Image
              className="absolute left-[16%] -translate-x-1/3 top-1/3 -translate-y-1/2"
              src="/images/about-us/star.svg"
              alt="chart"
              width="80"
              height="80"
            />
            <Image
              className="absolute right-[16%] translate-x-1/3 bottom-0"
              src="/images/about-us/star.svg"
              alt="chart"
              width="80"
              height="80"
            />
          </div>
          <div className="relative">
            <div className="md:mt-24 relative z-30">
              <KnowYourself />
            </div>
            <div className="mt-10 relative z-20">
              <ExploreRelationships />
            </div>
            <div className="mt-10 relative z-10">
              <NavigateProfit />
            </div>
          </div>
        </section>
        <section className="max-w-[1128px] mx-auto mb-24 px-6 md:px-0">
          <h1
            style={{ fontFamily: "Michroma" }}
            className="text-center mt-24 mb-11 text-3xl"
          >
            Selected Partners & Media
          </h1>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-5">
            {partnerList.map((item) => (
              <div
                key={item}
                className="bg-white h-20 md:h-32 rounded-lg flex justify-center items-center"
              >
                <img
                  src={item}
                  className="max-w-[124px] max-h-[60px] md:max-w-[160px] md:max-h-[74px]"
                />
              </div>
            ))}
          </div>
        </section>
        <footer className="mt-10 pb-4">
          <p className="text-[11px] leading-[20px] font-circular text-center uppercase">
            Copyright © 2023 -- AScendant.fun, all rights reserved
          </p>
        </footer>
      </div>
    </>
  );
}

export default Main;
