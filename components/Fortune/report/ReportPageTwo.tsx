/* eslint-disable @next/next/no-img-element */
import { forwardRef } from "react";

import { ReportProps } from "./report.types";
import ReportFooter from "./ReportFooter";
import ReportHeader from "./ReportHeader";

const availablePlanets = [
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

function getPlanetImg(planet: string, isPositive: boolean) {
  const base = "/assets/planets/";
  const ending = isPositive ? "-pos.png" : "-neg.png";

  // return a default one in case the planet is not found
  if (!availablePlanets.includes(planet)) {
    return base + "/sun" + ending;
  }

  return base + planet + ending;
}

function getPersonality(planet: string, isPositive: boolean) {
  return "A " + (isPositive ? "Positive" : "Negative") + " " + planet;
}

const ReportPageTwo = forwardRef<HTMLDivElement, ReportProps>(
  ({ nickName, userReport, renderMode, hidden = false }, ref) => {
    return (
      <div
        className={`bg-gradient-to-b from-main-700 via-main-600 to-main-800 flex flex-col relative overflow-hidden px-6 py-6 w-screen min-w-[360px] md:w-[370px] max-w-[420px] h-[780px] ${
          !renderMode ? "shadow-xl" : ""
        } ${hidden ? "hidden" : ""}`}
        ref={ref}
        id={renderMode ? "report-2-render" : "report-2-preview"}
      >
        <ReportHeader
          nickName={nickName}
          color="blue"
          address={userReport.publicAddress}
        />
        <h3 className="text-center font-alfphabet mt-6">
          <p className="text-base leading-8">Wallet Personality:</p>
          <p className="text-2xl">
            {getPersonality(userReport.personalityPlanet, userReport.score > 0)}
          </p>
        </h3>
        <div className="bg-no-repeat bg-cover bg-[url('/assets/planets/planet-background.png')]">
          <img
            src={getPlanetImg(
              userReport.personalityPlanet,
              userReport.score > 0
            )}
            className="mx-auto w-64 h-64 mt-3"
            alt="planet"
          />
        </div>
        <div className="rounded-lg bg-[#1A0D2A] mt-4 px-4 py-4 w-full border-[3px] border-white/10 flex flex-col">
          <p className="text-white text-[13px] leading-4">
            {userReport?.paragraph}
          </p>
        </div>
        <div className="mt-auto">
          {userReport.accountID && (
            <ReportFooter
              renderMode={renderMode}
              accountID={userReport.accountID}
            />
          )}
        </div>
      </div>
    );
  }
);

ReportPageTwo.displayName = "ReportPageTwo";

export default ReportPageTwo;
