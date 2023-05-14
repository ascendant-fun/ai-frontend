import Image from "next/image";

function ExploreRelationships() {
  return (
    <div
      className="rounded-md border border-white/30 mx-4 backdrop-blur px-2 py-5 md:py-9 md:max-w-2xl md:mx-auto relative"
      style={{
        background:
          "radial-gradient(50% 50% at 50% 50%, rgba(36, 27, 69, 0.017) 0%, rgba(24, 22, 31, 0.054) 54.69%, rgba(0, 0, 0, 0.0869792) 100%)",
      }}
    >
      <Image
        className="absolute z-10 -right-[11%] top-[45%] hidden md:block"
        src="/images/about-us/line2.svg"
        alt="line"
        width="126"
        height="447"
      />
      <h2 className="text-primary text-center font-michroma text-2xl leading-8 md:text-[40px] md:leading-[48px]">
        Explore
        <br />
        Relationships
      </h2>
      <p className="mt-4 text-center text-xl leading-6 px-3 md:text-[22px] md:leading-[26px md:px-16">
        Ascendant helps users understand deeply how they connect with others and
        leads to more harmonious and fulfilling relationships.
      </p>
      <div className="flex flex-col space-y-2 mt-5 md:flex-row md:space-x-3 md:justify-center">
        <Image
          className="mx-auto md:hidden"
          src="/images/about-us/mobile/social-matching.png"
          alt="chart"
          width="312"
          height="137"
        />
        <Image
          className="mx-auto md:hidden"
          src="/images/about-us/mobile/relationship.png"
          alt="chart"
          width="312"
          height="137"
        />
        <Image
          className="mx-auto hidden md:block"
          src="/images/about-us/pc/relationship.png"
          alt="chart"
          width="290"
          height="182"
        />
        <Image
          className="mx-auto hidden md:block"
          src="/images/about-us/pc/social-matching.png"
          alt="chart"
          width="290"
          height="182"
        />
      </div>
    </div>
  );
}

export default ExploreRelationships;
