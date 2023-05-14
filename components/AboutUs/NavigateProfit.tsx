import Image from "next/image";

function NavigateProfit() {
  return (
    <div
      className="rounded-md border border-white/30 mx-4 backdrop-blur px-2 py-5 md:py-9 md:max-w-2xl md:mx-auto"
      style={{
        background:
          "radial-gradient(50% 50% at 50% 50%, rgba(36, 27, 69, 0.017) 0%, rgba(24, 22, 31, 0.054) 54.69%, rgba(0, 0, 0, 0.0869792) 100%)",
      }}
    >
      <h2 className="text-primary text-center font-michroma text-2xl leading-8 md:text-[40px] md:leading-[48px]">
        Understand <br /> Market
      </h2>
      <p className="mt-4 text-center text-xl leading-6 px-3  md:text-[22px] md:leading-[26px md:px-16">
        Financial astrology goes way-back.However volatile and unpredictable the
        market may seem to be, the law may already reside in correlation with
        celestial movement. Ascendant will provide useful astrology tools to
        facilitate understanding the market and making important decisions.
      </p>
      <div className="flex flex-col space-y-2 mt-5 md:mt-6 md:flex-row md:space-x-3 md:justify-center">
        <Image
          className="mx-auto md:hidden"
          src="/images/about-us/pc/wallet-fortune-telling.png"
          alt="chart"
          width="290"
          height="137"
        />
        <Image
          className="mx-auto md:hidden"
          src="/images/about-us/pc/token-evaluation.png"
          alt="chart"
          width="290"
          height="137"
        />
        <Image
          className="mx-auto hidden md:block"
          src="/images/about-us/pc/wallet-fortune-telling.png"
          alt="chart"
          width="290"
          height="137"
        />
        <Image
          className="mx-auto hidden md:block"
          src="/images/about-us/pc/token-evaluation.png"
          alt="chart"
          width="290"
          height="137"
        />
        <Image
          className="mx-auto md:hidden"
          src="/images/about-us/pc/token-forecast.png"
          alt="chart"
          width="290"
          height="137"
        />
        <Image
          className="mx-auto hidden md:block"
          src="/images/about-us/pc/token-forecast.png"
          alt="chart"
          width="290"
          height="137"
        />
      </div>
    </div>
  );
}

export default NavigateProfit;
