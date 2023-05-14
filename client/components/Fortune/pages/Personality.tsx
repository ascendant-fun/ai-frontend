/* eslint-disable @next/next/no-img-element */
import { forwardRef } from "react";
import { UserReport } from "../../../../types/ApiClient";
import ReportHeader from "../base/ReportHeader";
import ReportFooter from "../base/ReportFooter";
import { Planets } from "../../../../types/ApiClient";

interface PersonalityProps {
  nickName: string;
  userReport: UserReport;
}

const availablePlanets: string[] = [
  "pluto",
  "saturn",
  "uranus",
  "sun",
  "moon",
  "jupiter",
  "mercury",
  "neptune",
  "mars",
  "venus",
];

const planetParagraphs: Record<
  Planets,
  {
    paragraph: string;
  }
> = {
  pluto: {
    paragraph:
      "With Pluto's desire for control, this wallet address may cultivate a cunning and manipulative mindset, making it an ideal tool for those who are ready to take on the market.",
  },
  saturn: {
    paragraph:
      "This wallet address is built to withstand bear markets; thanks to the grit it inherits from Saturn. Hold onto this wallet for the long haul, and you'll ultimately come out on top.",
  },
  uranus: {
    paragraph:
      "With Uranus as its guiding planet, this wallet address is a maverick in the world of finance, subject to sudden bursts of good fortune. Get ready to celebrate big wins!",
  },
  sun: {
    paragraph:
      "Your wallet address possesses the glory-driven and purposeful energy of Sun. The Sun’s blessing will keep motivating you on the way towards a big fortune.",
  },
  moon: {
    paragraph:
      "The Moon represents security and stability, making this wallet address perfect for stable yet lucrative investments.",
  },
  jupiter: {
    paragraph:
      "Your wallet address is blessed by the strong, durable and radiant energy of Jupiter, the most auspicious star in Astrology. Stable and recurring profits await for you.",
  },
  mercury: {
    paragraph:
      "A crypto address ruled by Mercury inspires sharp, logical, and strategic investment decisions, making it an essential wingman for any savvy investor.",
  },
  neptune: {
    paragraph:
      "A wallet address influenced by Neptune encourages intuition, fantasy, and spiritual connection when making investment decisions. Trust your instincts!",
  },
  mars: {
    paragraph:
      "A wallet address inspired by Mars is a bold risk-taker, driven by the planet's heart-racing energy. Expect to reap significant rewards with this wallet!",
  },
  venus: {
    paragraph:
      "Your wallet address is blessed by Venus, a planet of luxury and beauty, which naturally bridges you to shiny fortune and expensive purchases.",
  },
};

function findPersonalityParagraph(planet: string) {
  if (!availablePlanets.includes(planet)) {
    return "";
  }

  const targetPlanet = planet as Planets;

  return planetParagraphs?.[targetPlanet]?.paragraph ?? "";
}

type PlanetsType = Record<
  string,
  {
    imgWidth?: string;
    fontSize?: string;
    background: {
      mobile: string;
      pc: string;
    };
    celebrity: {
      name: string;
      img: string;
      title: string;
      quote: string;
    };
    rarity: number;
  }
>;

const planets: PlanetsType = {
  jupiter: {
    background: {
      mobile: "bg-[url('/images/report/personality-mobile-bg.jpg')]",
      pc: "md:bg-[url('/images/report/personality-bg.jpg')]",
    },
    celebrity: {
      name: "Eric Hughes",
      img: "/images/report/celebrities/eric.jpeg",
      title: "Creator of the Cyberpunk mailing list",
      quote:
        "The Cypherpunks are actively engaged in making the networks safer for privacy.",
    },
    rarity: 18,
  },
  neptune: {
    background: {
      mobile: "bg-[url('/images/report/personality-mobile-bg.jpg')]",
      pc: "md:bg-[url('/images/report/personality-bg.jpg')]",
    },
    celebrity: {
      name: "John Perry Barlow",
      img: "/images/report/celebrities/john.png",
      title: 'Author of "A Declaration of the Independence of Cyberspace"',
      quote: "We will create a civilization of the Mind in Cyberspace. ",
    },
    rarity: 2,
  },
  uranus: {
    imgWidth:
      "sm:w-[85%] scale-150 md:scale-100 -translate-y-[10%] sm:-translate-y-[30%]",
    fontSize: "text-[55px] leading-[80px] md:leading-[150px] md:text-[132px]",
    background: {
      mobile: "bg-[url('/images/report/personality-mobile-bg.jpg')]",
      pc: "md:bg-[url('/images/report/personality-bg.jpg')]",
    },
    celebrity: {
      name: "Timothy May",
      img: "/images/report/celebrities/timothy.png",
      title: 'Author of "The Crypto Anarchist Manifesto"',
      quote:
        "Just as printing altered the power of medieval guilds, so too will cryptologic methods alter our society.",
    },
    rarity: 5,
  },
  mercury: {
    fontSize:
      "text-[48px] leading-[80px] md:leading-[90px] md:text-[90px] lg:leading-[150px] lg:text-[132px]",
    background: {
      mobile: "bg-[url('/images/report/personality-mobile-bg-3.png')]",
      pc: "md:bg-[url('/images/report/personality-bg-3.png')]",
    },
    celebrity: {
      name: "Vitalik Buterin",
      img: "/images/report/celebrities/vitalik.png",
      title: "Programmer, writer, co-founder of Ethereum",
      quote:
        "Crypto itself has a lot of dystopian potential if implemented wrong.",
    },
    rarity: 5,
  },
  pluto: {
    fontSize: "text-[65px] leading-[80px] md:leading-[150px] md:text-[132px]",
    background: {
      mobile: "bg-[url('/images/report/personality-mobile-bg-3.png')]",
      pc: "md:bg-[url('/images/report/personality-bg-3.png')]",
    },
    celebrity: {
      name: "Julian Paul Assange",
      img: "/images/report/celebrities/julian.png",
      title: "Founder of WikiLeaks, Cryptopunk pioneer",
      quote: "Cryptography is the ultimate form of non-violent direct action.",
    },
    rarity: 22,
  },
  moon: {
    fontSize: "text-[65px] leading-[80px] md:leading-[150px] md:text-[132px]",
    background: {
      mobile: "bg-[url('/images/report/personality-mobile-bg-3.png')]",
      pc: "md:bg-[url('/images/report/personality-bg-3.png')]",
    },
    celebrity: {
      name: "Jude Milhon",
      img: "/images/report/celebrities/jude.png",
      title:
        "Leading woman in the Civil rights, hacking and cryptopunk movements",
      quote: "When you’re in cyberspace, no one knows what your sex is.",
    },
    rarity: 2,
  },
  venus: {
    fontSize: "text-[65px] leading-[80px] md:leading-[150px] md:text-[132px]",
    background: {
      mobile: "bg-[url('/images/report/personality-mobile-bg-2.jpg')]",
      pc: "md:bg-[url('/images/report/personality-bg-2.jpg')]",
    },
    celebrity: {
      name: "Jacob Appelbaum",
      img: "/images/report/celebrities/jacob.png",
      title: "Independent journalist, artist and hacker",
      quote:
        "I believe each person has the right to read and the right to speak freely without fear of surveillance.",
    },
    rarity: 8,
  },
  sun: {
    fontSize: "text-[65px] leading-[80px] md:leading-[150px] md:text-[132px]",
    background: {
      mobile: "bg-[url('/images/report/personality-mobile-bg-2.jpg')]",
      pc: "md:bg-[url('/images/report/personality-bg-2.jpg')]",
    },
    celebrity: {
      name: "Satoshi Nakamoto",
      img: "/images/report/celebrities/satoshi.png",
      title: "Bitcoin Inventor",
      quote:
        "We have proposed a system for electronic transactions WITHOUT relying on trust.",
    },
    rarity: 8,
  },
  mars: {
    fontSize: "text-[65px] leading-[80px] md:leading-[150px] md:text-[132px]",
    background: {
      mobile: "bg-[url('/images/report/personality-mobile-bg-2.jpg')]",
      pc: "md:bg-[url('/images/report/personality-bg-2.jpg')]",
    },
    celebrity: {
      name: "David Chaum",
      img: "/images/report/celebrities/david.png",
      title: "Godfather of cryptocurrency",
      quote: "Privacy is intimately tied to human potential.",
    },
    rarity: 8,
  },
  saturn: {
    imgWidth:
      "sm:w-[85%] scale-[200%] md:scale-[130%] -translate-y-[0%] sm:-translate-y-[10%]",
    fontSize: "text-[55px] leading-[80px] md:leading-[150px] md:text-[132px]",
    background: {
      mobile: "bg-[url('/images/report/personality-mobile-bg-3.png')]",
      pc: "md:bg-[url('/images/report/personality-bg-3.png')]",
    },
    celebrity: {
      name: "Tim Berners-Lee",
      img: "/images/report/celebrities/tim.png",
      title: "Inventor of WWW",
      quote:
        "The spirit of blockchain is decentralized, returning power from central authority to each individual.",
    },
    rarity: 12,
  },
};

function getPersonalityBackground(planet: string) {
  let background;
  if (planets?.[planet]?.background !== undefined) {
    background = planets[planet].background;
  } else {
    background = planets["saturn"].background;
  }

  return background?.mobile + " " + background?.pc;
}

function getPersonalityMobileBackground(planet: string) {
  if (planets?.[planet]?.background !== undefined) {
    return planets[planet].background?.mobile;
  }

  return planets["saturn"].background?.mobile;
}

function getPlanetImgPosition(planet: string) {
  if (planets?.[planet]?.imgWidth !== undefined) {
    return planets[planet].imgWidth;
  }

  return "sm:w-[85%] scale-110 md:scale-100 -translate-y-[32%] sm:-translate-y-[57%]";
}

function getPlanetFontSize(planet: string) {
  if (planets?.[planet]?.fontSize !== undefined) {
    return planets[planet].fontSize;
  }

  return "text-[50px] md:text-[132px]";
}

function getCelebrity(planet: string) {
  if (planets?.[planet]?.celebrity !== undefined) {
    return planets[planet].celebrity;
  }

  return planets["saturn"].celebrity;
}

function getPlanetImg(planet: string) {
  const base = "/images/report/planets/";
  const ending = ".png";

  // return a default one in case the planet is not found
  if (!availablePlanets.includes(planet)) {
    return base + "/sun" + ending;
  }

  return base + planet + ending;
}

function getRarityParagraph(planet: string) {
  let rarity = 0;
  if (planets?.[planet]?.rarity !== undefined) {
    rarity = planets?.[planet]?.rarity;
  }

  if (rarity <= 12) {
    return `Only ${rarity}% users have this ruling star!`;
  }

  return `${rarity}% users have this ruling star!`;
}

const Personality = forwardRef<HTMLDivElement, PersonalityProps>(
  ({ nickName, userReport }, ref) => {
    const paragraph = findPersonalityParagraph(userReport.personalityPlanet);
    const paragraphFont =
      paragraph.length > 135
        ? "px-12 text-[19px] leading-[26px] md:text-[30px] md:leading-[36px]"
        : "px-8 text-[25px] leading-[28px] md:text-[30px] md:leading-[36px]";
    const background = getPersonalityBackground(userReport.personalityPlanet);
    const mobileBackground = getPersonalityMobileBackground(
      userReport.personalityPlanet
    );
    const celebrity = getCelebrity(userReport.personalityPlanet);

    const rarityParagraph = getRarityParagraph(userReport.personalityPlanet);

    return (
      <div
        className={`h-full min-h-screen bg-no-repeat bg-cover ${mobileBackground} md:h-auto md:min-h-0 md:bg-none`}
      >
        <div
          className={`h-[675px] md:h-[1000px] lg:h-[900px] bg-center md:bg-left flex overflow-hidden w-screen pb-4 max-w-[1130px] md:rounded-xl relative bg-no-repeat bg-cover md:scale-[85%] md:-translate-y-20 md:-mb-32 lg:scale-[70%] lg:-translate-y-32 lg:-mb-56 xl:scale-[70%] xl:-translate-y-32 xl:-mb-56 2xl:scale-[85%] 2xl:-translate-y-14 2xl:-mb-20 3xl:scale-[100%] 3xl:translate-y-0 3xl:mb-0 ${background}`}
          ref={ref}
        >
          <ReportHeader
            nickName={nickName}
            address={userReport.publicAddress}
            ens={userReport.account.ens}
          />
          <img
            src={getPlanetImg(userReport.personalityPlanet)}
            className={`transform z-0 left-1/2 -translate-x-1/2 absolute w-full ${getPlanetImgPosition(
              userReport.personalityPlanet
            )}`}
            alt="planet"
          />
          <img
            src="/images/report/stars.png"
            className="hidden md:block absolute inset-0 pt-48 px-8"
            alt="stars"
          />
          <img
            src="/images/report/stars-mobile.png"
            className="absolute inset-0 mt-40 px-4 md:hidden"
            alt="stars"
          />
          <div className="z-20 relative mt-48 md:mt-[17rem] flex flex-col mx-auto text-center">
            <h2 className="font-bold uppercase text-lg leading-4 md:text-2xl md:leading-5">
              Ruling Star of wallet address
            </h2>
            <h3
              className={`font-michroma uppercase text-primary ${getPlanetFontSize(
                userReport.personalityPlanet
              )}`}
            >
              {userReport.personalityPlanet}
            </h3>
            <p className="text-primary text-center font-bold mt-2 text-[14px] leading-[15px] md:mt-8 md:text-[18px]">
              {rarityParagraph}
            </p>
            <p
              className={`mt-4 md:mt-6 mx-auto text-center md:max-w-3xl font-sans font-normal ${paragraphFont}`}
            >
              {paragraph}
            </p>
            <div className="mt-auto max-w-[720px] mx-auto md:mt-">
              <div
                className="relative backdrop-blur-sm mx-4 mt-2 py-2 px-2 md:px-4 rounded-lg border border-primary"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(221, 254, 21, 0.26) 0%, rgba(255, 255, 255, 0) 100%)",
                }}
              >
                <div className="absolute h-28 inset-x-0 translate-y-1 bottom-0 w-[98%] mx-1 rounded-lg border-b border-primary"></div>
                <p className="uppercase font-bold text-[13px] leading-4 md:text-base md:leading-[18px] text-primary">
                  Crypto giant sharing the same ruling star:
                </p>
                <div className="flex mt-2 md:mt-4">
                  <img
                    src={celebrity.img}
                    className="rounded-full md:my-auto w-8 h-8 md:w-20 md:h-20 inline-block object-cover border border-white"
                    alt=""
                  />
                  <div className="px-4 text-left">
                    <p className="font-bold text-sm leading-[18px] md:text-xl md:leading-6">
                      “{celebrity.quote}”
                    </p>
                    <div className="text-xs leading-[18px] md:text-[13px] md:leading-4 mt-1">
                      <p>
                        —{celebrity.name},{" "}
                        <span className="italic">{celebrity.title}</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <ReportFooter
                extraClasses="mt-3 md:mt-5"
                referralCode={userReport.account.code}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
);

Personality.displayName = "Personality";
export default Personality;
