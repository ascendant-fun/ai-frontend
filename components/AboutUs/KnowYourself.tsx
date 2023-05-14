import Image from "next/image";

function KnowYourself() {
  return (
    <div
      className="rounded-md border border-white/30 mx-4 backdrop-blur px-2 py-5 md:py-9 md:max-w-2xl md:mx-auto relative"
      style={{
        background:
          "radial-gradient(50% 50% at 50% 50%, rgba(36, 27, 69, 0.017) 0%, rgba(24, 22, 31, 0.054) 54.69%, rgba(0, 0, 0, 0.0869792) 100%)",
      }}
    >
      <Image
        className="absolute hidden md:block right-0 translate-x-2/3"
        src="/images/about-us/ball.png"
        alt="ball"
        width="49"
        height="49"
      />
      <Image
        className="absolute z-0 -left-[26%] top-[46%] hidden lg:block"
        src="/images/about-us/line1.svg"
        alt="line"
        width="530"
        height="324"
      />
      <h2 className="text-primary text-center font-michroma text-2xl leading-8 md:text-[40px] md:leading-[48px]">
        Know Yourself
      </h2>
      <p className="mt-4 text-center text-xl leading-6 px-3 md:text-[22px] md:leading-[26px md:px-16">
        {`Our platform empowers individuals to understand their unique strengths
        and challenges, giving them the mental fortitude to tackle life's
        obstacles with confidence and peace.`}
      </p>
      <div className="flex flex-col space-y-2 mt-5 md:mt-6 lg:flex-row lg:-translate-x-[25%] lg:space-x-3">
        <Image
          className="mx-auto lg:flex-none relative z-20 lg:justify-center lg:hidden"
          src="/images/about-us/pc/daily-fortune.png"
          alt="chart"
          width="290"
          height="137"
        />
        <Image
          className="mx-auto lg:flex-none lg:hidden"
          src="/images/about-us/pc/birth-chart-reading.png"
          alt="chart"
          width="290"
          height="137"
        />
        <Image
          className="mx-auto lg:flex-none lg:hidden"
          src="/images/about-us/pc/future-prediction.png"
          alt="chart"
          width="290"
          height="137"
        />
        <Image
          className="mx-auto lg:flex-none hidden lg:block"
          src="/images/about-us/pc/daily-fortune.png"
          alt="chart"
          width="290"
          height="137"
        />
        <Image
          className="mx-auto lg:flex-none hidden lg:block"
          src="/images/about-us/pc/birth-chart-reading.png"
          alt="chart"
          width="290"
          height="137"
        />
        <Image
          className="mx-auto lg:flex-none hidden lg:block"
          src="/images/about-us/pc/future-prediction.png"
          alt="chart"
          width="290"
          height="137"
        />
      </div>
    </div>
  );
}

export default KnowYourself;
