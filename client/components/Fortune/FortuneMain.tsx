import { useState } from "react";
import { Transition } from "@headlessui/react";
import Head from "next/head";
import { NextSeo } from "next-seo";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { useInterval } from "react-use";

import { TascSummary, UserReport } from "../../../types/ApiClient";
import useBind from "../../hooks/useBind";
import RightArrow from "../Base/icons/RightArrow";
import LandingPage from "./pages/LandingPage";
import { WalletHighlightTopValues } from "../../../types/ApiClient";
import APIClient, { BirthdayNotFoundError } from "../../api/APIClient";
import { LocationValues } from "./LocationInput";
import { useBaseModal } from "../Base/BaseModal";
import { getEnsFromAddress } from "../../api/BackendService";
import { toCamelCase } from "../../../utils/utils";

type FortuneMainProps = {
  invitationCode?: string;
};

type LoadNotRequiredDataStatuses =
  | "not started"
  | "should load"
  | "loading"
  | "finished";

const FortuneWrapper = dynamic(() => import("./FortuneWrapper"), {
  ssr: false,
});

async function waitInterval(
  callback: () => Promise<boolean>,
  ms: number,
  maxIteration: number = 50
): Promise<void> {
  return new Promise((resolve, reject) => {
    let iteration = 0;

    const interval = setInterval(async () => {
      if (await callback()) {
        clearInterval(interval);
        resolve();
      }

      iteration++;
      if (iteration >= maxIteration) {
        clearInterval(interval);
        resolve();
      }
    }, ms);
  });
}

function FortuneMain({ invitationCode }: FortuneMainProps) {
  const router = useRouter();
  const { utmSource } = toCamelCase(router.query);
  // data needed
  const [userReport, setUserReport] = useState<UserReport>();
  const [walletHighlights, setWalletHighlights] =
    useState<WalletHighlightTopValues>();

  const [showMain, setShowMain] = useState(true);
  const [showResult, setShowResult] = useState(false);
  const [showLoading, setShowLoading] = useState(false);
  const [loadNotRequiredData, setLoadNotRequiredData] =
    useState<LoadNotRequiredDataStatuses>("not started");
  const isErrorModalOpen = useBaseModal(false);
  const isBenefitsModalOpen = useBaseModal(false);

  const tAscSummary = useBind<TascSummary>({
    totalScore: null,
    reportScore: null,
    sbtScore: null,
    inviteSbtCount: 0,
    inviteSbtScore: 0,
    communityLuckyDrawScore: 0,
  });

  const location = useBind<LocationValues>({
    lat: null,
    long: null,
    address: "",
  });
  const walletAddress = useBind<string>("");
  const nickName = useBind<string>("");
  const apiClient = new APIClient();
  const walletEns = useBind<string>("");

  async function getEns(address: string) {
    if (walletEns.value) return;

    try {
      const ens = await getEnsFromAddress(address);

      if (ens) {
        walletEns.setter(ens);
      }
    } catch (err) {
      // silent catch
    }
  }

  useInterval(
    () => {
      getNotRequiredData();
    },
    loadNotRequiredData === "should load" ? 1000 : null
  );

  async function getRequiredData() {
    // set loading state
    try {
      await getUserReport(location.value);
      const highlightResponse = await getWalletHighlights();
      await getEns(walletAddress.value);

      // unable to get the data the first time, wait in an interval
      if (!highlightResponse) {
        await waitInterval(getWalletHighlights, 10000, 2);
      }

      setShowResult(true);
      return true;
    } catch (err) {
      if (err instanceof BirthdayNotFoundError) {
        isErrorModalOpen.setter(true);

        // go back to landing page
        goToPage(1);

        return;
      }

      console.log(err);
      toast.error("Failed to get report from server, please try again later.");

      return false;
    }
  }

  async function getNotRequiredData() {
    if (location.value.lat === null || location.value.long === null) {
      toast.error("Could not find location");

      throw new Error("Could not find location");
    }

    if (!walletAddress.value) {
      toast.error("Please connect wallet first");

      throw new Error("Please connect wallet first");
    }

    setLoadNotRequiredData("loading");

    const fortuneResult = await apiClient.getFortuneResult(
      location.value.lat,
      location.value.long,
      walletAddress.value,
      nickName.value,
      utmSource as string,
      invitationCode,
      "get_report"
    );

    // check if we need to make additional API calls
    // data we need parsedLuckyToken && luckyMonths & theme
    let shouldUpdateReport = false;
    if (fortuneResult?.parsedLuckyToken) {
      shouldUpdateReport = true;
    }

    if (fortuneResult?.parsedLuckyMonths) {
      shouldUpdateReport = true;
    }

    if (fortuneResult?.theme) {
      shouldUpdateReport = true;
    }

    if (walletEns.value) {
      fortuneResult.account.ens = walletEns.value;
    }

    if (shouldUpdateReport) {
      setUserReport(fortuneResult);
    }

    // if not all data is returned, continue
    if (
      fortuneResult?.parsedLuckyToken === undefined ||
      fortuneResult.parsedLuckyToken === null ||
      fortuneResult?.parsedLuckyMonths === undefined ||
      fortuneResult.parsedLuckyMonths === null ||
      !fortuneResult?.theme
    ) {
      setLoadNotRequiredData("should load");
      return;
    }

    // data is here
    if (!shouldUpdateReport) {
      setUserReport(fortuneResult);
    }

    setLoadNotRequiredData("finished");
  }

  async function getUserReport(location: LocationValues) {
    if (location.lat === null || location.long === null) {
      toast.error("Could not find location");

      throw new Error("Could not find location");
    }

    if (!walletAddress.value) {
      toast.error("Please connect wallet first");

      throw new Error("Please connect wallet first");
    }

    const fortuneResult = await apiClient.getFortuneResult(
      location.lat,
      location.long,
      walletAddress.value,
      nickName.value,
      utmSource as string,
      invitationCode
    );

    // check if we need to make additional API calls
    if (
      fortuneResult?.parsedLuckyToken === undefined ||
      fortuneResult.parsedLuckyToken === null ||
      fortuneResult?.parsedLuckyMonths === undefined ||
      fortuneResult.parsedLuckyMonths === null ||
      !fortuneResult?.theme
    ) {
      setLoadNotRequiredData("should load");
    }

    if (walletEns.value) {
      fortuneResult.account.ens = walletEns.value;
    }

    setUserReport(fortuneResult);
  }

  async function getWalletHighlights() {
    if (!walletAddress.value) {
      toast.error("Please connect wallet first");

      throw new Error("Please connect wallet first");
    }

    const highlightResponse = await apiClient.getWalletHighlight(
      walletAddress.value
    );

    if (!highlightResponse.isReady) {
      return false;
    }

    setWalletHighlights(highlightResponse.data);
    return true;
  }

  async function goToPage(pageNumber: number) {
    switch (pageNumber) {
      case 1:
        setShowResult(false);
        setShowLoading(false);

        // clear the data
        setUserReport(undefined);
        setWalletHighlights(undefined);

        // delay, so that there is no layout shift
        await new Promise((resolve) =>
          setTimeout(() => {
            setShowMain(true);
            setUserReport(undefined);
            resolve(true);
          }, 600)
        );

        break;
      case 2:
        setShowMain(false);
        // revert to top of the screen
        if (window) {
          window.scrollTo({ top: 0 });
        }

        setShowLoading(true);
        break;
    }
  }

  const origin =
    typeof window !== "undefined" && window.location.origin
      ? window.location.origin
      : "";

  const fullURL = `${origin}`;
  const desc =
    "Generate your Ascendant Fortune Report and discover your 2023 with Ascendant. Freemint Blessing SBT and win tASC points!";

  return (
    <>
      <Head>
        <meta
          name="keywords"
          content="Ascendant NFT, Web3 Astrology, Numerology, Crypto, Zodiac, Astrology, Spiritual, Tarot, Metaphysics"
        />
        <meta
          name="twitter:image"
          content="https://i.ibb.co/jW81NSv/Frame-293-3-2.png"
        />
      </Head>
      <NextSeo
        title="2023 Ascendant Fortune Report"
        description={desc}
        canonical="https://www.ascendant.fun/"
        openGraph={{
          url: "https://www.ascendant.fun/",
          title: `2023 Ascendant Fortune based on wallet address`,
          description: desc,
          images: [
            {
              url: fullURL + "/assets/sharing-1679648576496.png",
              width: 812,
              height: 812,
              alt: "Ascendant Fortune",
              type: "image/png",
            },
          ],
        }}
        twitter={{
          handle: "@Ascendant_astro",
          site: "@site",
          cardType: "summary_large_image",
        }}
      />
      <section className="relative min-h-screen overflow-hidden bg-no-repeat bg-cover transition-all duration-200 bg-[url('/images/report/landing-bg.jpg')]">
        {(showResult || showLoading) && (
          <>
            <button
              className="absolute md:hidden z-20 w-8 h-8 top-3 left-4 transition-all rounded-full border backdrop-blur-sm border-white/40 p-2 group group-hover:border-white/70"
              onClick={() => goToPage(1)}
            >
              <RightArrow
                width={15}
                height={10}
                extraClasses="fill-white rotate-180 group-hover:fill-white/70"
              />
            </button>
          </>
        )}
        <Transition
          appear={true}
          show={showResult || showLoading}
          enter="delay-500 opacity-0 transition-all ease-in-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-all ease-in-out duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="w-full h-full absolute inset-0 bg-black/50" />
        </Transition>
        <Transition
          appear={false}
          show={showMain}
          enter="transform transition ease-in-out duration-500"
          enterFrom="-translate-x-full opacity-0"
          enterTo="translate-x-0 opacity-100"
          leave="transform transition ease-in-out duration-500"
          leaveFrom="translate-x-0 opacity-100"
          leaveTo="-translate-x-full opacity-0"
          className=""
        >
          <LandingPage
            nickName={nickName}
            location={location}
            setUserReport={setUserReport}
            walletEns={walletEns}
            goToPage={goToPage}
            walletAddress={walletAddress}
            isErrorModalOpen={isErrorModalOpen}
            isBenefitsModalOpen={isBenefitsModalOpen}
            tAscSummary={tAscSummary}
          />
        </Transition>
        <Transition
          appear={true}
          show={showResult || showLoading}
          enter="delay-500 opacity-0 transform transition ease-in-out duration-500"
          enterFrom="translate-x-full opacity-0"
          enterTo="translate-x-0 opacity-100"
          leave="transform transition ease-in-out duration-500"
          leaveFrom="translate-x-0 opacity-100"
          leaveTo="-translate-x-full opacity-0"
          className="md:-mt-6 h-full"
        >
          {(userReport || showLoading) && (
            <FortuneWrapper
              nickName={nickName.value}
              userReport={userReport}
              walletHighlights={walletHighlights ?? []}
              goToPage={goToPage}
              showLoading={showLoading}
              setShowLoading={setShowLoading}
              showResult={showResult}
              getRequiredData={getRequiredData}
              isBenefitsModalOpen={isBenefitsModalOpen}
              tAscSummary={tAscSummary}
            />
          )}
        </Transition>
      </section>
    </>
  );
}

export default FortuneMain;
