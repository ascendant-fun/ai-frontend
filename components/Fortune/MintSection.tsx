import Image from "next/image";
import { ClaimStatus, CLAIM_STATUS } from "./FortuneResult";
import { Binder } from "../../hooks/useBind";
import { useAccount } from "wagmi";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import WalletConnect from "./WalletConnect";
import { useRouter } from "next/router";
import ForwardIcon from "../Base/icons/ForwardIcon";
import CopyIcon from "../Base/icons/CopyIcon";
import SbtMintButton from "./base/SbtMintButton";
import { useNetwork, chain as allChains } from "wagmi";
import { UserReport } from "../../types/ApiClient";
import { CONTRACT_NETWORK, MAINNET } from "../../config";
import { useBaseModal } from "../Base/BaseModal";
import { event } from "nextjs-google-analytics";
import { ErrorModal } from "../Base/ErrorModal";
import LoadingIcon from "../Icon/Loading";

interface MintSectionProps {
  referralCode: string;
  claimStatus: Binder<ClaimStatus>;
  planet: string;
  reportAddress: string;
  userReport: UserReport;
  isSbtMintInViewport: boolean;
  exportRandomImage: () => Promise<string | null>;
  isBenefitsModalOpen: Binder<boolean>;
}

const personalityIdMap: Record<string, number> = {
  pluto: 1,
  saturn: 2,
  uranus: 3,
  sun: 4,
  moon: 5,
  jupiter: 6,
  mercury: 7,
  neptune: 8,
  mars: 9,
  venus: 10,
};

function findPersonalityId(planet: string) {
  return personalityIdMap[planet] ?? 1;
}

function MintSection({
  referralCode,
  claimStatus,
  planet,
  reportAddress,
  userReport,
  isSbtMintInViewport,
  exportRandomImage,
  isBenefitsModalOpen,
}: MintSectionProps) {
  const { address } = useAccount();
  const { chain } = useNetwork();
  const personalityId = findPersonalityId(planet);
  const [allowedToMint, setAllowedToMint] = useState(address !== undefined);
  const [isDifferentWallet, setIsDifferentWallet] = useState(false);
  const [isSharing, setIsSharing] = useState(false);

  const router = useRouter();
  const [shareUrl, setShareUrl] = useState("");

  const isErrorModalOpen = useBaseModal(false);

  const navigatorAllowed = navigator?.share !== undefined;

  const targetChain =
    CONTRACT_NETWORK === MAINNET ? allChains.mainnet : allChains.goerli;

  let protocol = "";
  if (window) {
    protocol = window.location.protocol;
  }

  useEffect(() => {
    if (!referralCode) return;

    const host = window.location.host;
    const baseUrl = `${host}`;

    setShareUrl(`${baseUrl}/fortune/${referralCode}`);
  }, [router.pathname, referralCode]);

  useEffect(() => {
    if (reportAddress === undefined || !isSbtMintInViewport) return;

    if (chain?.id !== targetChain.id) {
      setAllowedToMint(false);
      return;
    }

    if (address !== reportAddress) {
      if (!isDifferentWallet) {
        isErrorModalOpen.setter(true);
      }

      setIsDifferentWallet(true);
      setAllowedToMint(false);
    } else {
      setIsDifferentWallet(false);
      setAllowedToMint(true);
    }
  }, [
    address,
    reportAddress,
    chain?.id,
    isSbtMintInViewport,
    targetChain.id,
    isErrorModalOpen,
  ]);

  const twitterUrl = new URL("https://twitter.com/intent/tweet");
  const sharingText = `Generate your Ascendant Fortune Report and discover your 2023 with me! #2023ASCFortune.`;
  twitterUrl.searchParams.set(
    "text",
    sharingText + ` Get lucky with @Ascendant_astro. ${shareUrl}`
  );

  async function handleCopyLink() {
    await navigator.clipboard.writeText(shareUrl);
    toast.success("Link has copied to clipboard!");

    if (claimStatus.value !== CLAIM_STATUS.CLAIMED) {
      claimStatus.setter(CLAIM_STATUS.ACTIVE);
    }
  }

  async function handleShare() {
    // not on mobile
    if (!navigatorAllowed) {
      return;
    }

    setIsSharing(true);

    event("congratulation_share_button_clicked", {
      category: "FortuneReport",
      label: "share button clicked on congratulation page",
    });

    const origin =
      typeof window !== "undefined" && window.location.origin
        ? window.location.origin
        : "";

    const fullURL = `${origin}`;
    const sharingText = `Generate your Ascendant Fortune Report and discover your 2023 with me! #2023ASCFortune. Get lucky with @Ascendant_astro. ${fullURL}/fortune/${userReport?.account.code}`;

    // load the image
    try {
      const image = await exportRandomImage();
      let shareData;

      if (image) {
        const fetchedImage = await fetch(image);
        const blob = await fetchedImage.blob();

        if (blob === undefined || blob === null) {
          toast.error("Failed to share");

          return;
        }

        // get the file
        const file = new File(
          // [imageSrc.blob],
          [blob],
          "report.png",
          { type: blob.type }
        );

        shareData = {
          title: "ASC Fortune Telling",
          text: sharingText,
          files: [file],
        };
      } else {
        shareData = {
          title: "ASC Fortune Telling",
          text: sharingText,
        };
      }

      if (
        typeof navigator?.canShare === "function" &&
        !navigator.canShare(shareData)
      ) {
        toast.error(
          "Sharing is not supported on this device, please try to download manually."
        );

        return;
      }

      await navigator.share(shareData);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSharing(false);
    }
  }

  function handleInfoButtonClick() {
    isBenefitsModalOpen.setter(true);
  }

  return (
    <>
      <ErrorModal isOpen={isErrorModalOpen}>
        <div className="text-center text-white/60 px-2 mt-2">
          <h3 className="text-lg font-bold uppercase">Incorrect Wallet</h3>
          <p className="mt-4">
            Please use the same wallet address you generate this report for.{" "}
          </p>
          <p className="mt-3">
            If you prefer to use another address to mint the SBT, please kindly
            take the report again using this very address. Thanks!
          </p>
        </div>
      </ErrorModal>
      <div className="max-w-3xl bg-[#180a36]/50 mx-auto rounded-[8px] mb-2 py-4 px-4 md:py-6 md:px-10">
        <div className="flex justify-between">
          <div>
            <h4 className="text-[17px] md:text-[24px] leading-[18px] my-auto flex text-center">
              <span className="font-bold">Step &nbsp;1&nbsp;&nbsp;</span>
              <span className="my-auto">Share report and earn</span>
              <button
                className="text-primary border-b border-b-primary ml-1 md:ml-2"
                onClick={handleInfoButtonClick}
              >
                tASC
              </button>
            </h4>
            <p className="hidden md:block text-[15px] text-white/70 mt-3 md:pr-6">
              {`Reward for each invitee who generate the report through your customized link`}
            </p>
          </div>
          <div>
            {!navigatorAllowed && (
              <a
                href={twitterUrl.toString()}
                className="rounded-[4px] px-2 py-2 flex text-black bg-secondary hover:bg-secondary/70 md:px-6 md:py-3 md:translate-y-1/3"
                target="_blank"
                rel="noreferrer"
                style={{
                  boxShadow: "0px 0px 35px rgba(254, 203, 21, 0.5)",
                }}
                onClick={() => {
                  event("congratulation_share_button_clicked", {
                    category: "FortuneReport",
                    label: "share button clicked on congratulation page",
                  });
                }}
              >
                <div className="aspect-square my-auto">
                  <ForwardIcon extraClasses="fill-black" />
                </div>
                <span className="my-auto hidden md:block md:ml-2 font-bold">
                  Share
                </span>
              </a>
            )}
            {navigatorAllowed && (
              <button
                className="rounded-[4px] px-2 py-2 flex text-black bg-secondary hover:bg-secondary/70 md:px-6 md:py-3 md:translate-y-1/3"
                style={{
                  boxShadow: "0px 0px 35px rgba(254, 203, 21, 0.5)",
                }}
                onClick={handleShare}
              >
                <div className="aspect-square my-auto">
                  {isSharing ? (
                    <LoadingIcon
                      classes="text-black"
                      width="w-4"
                      height="h-4"
                    />
                  ) : (
                    <ForwardIcon extraClasses="fill-black" />
                  )}
                </div>
                <span className="my-auto hidden md:block md:ml-2 font-bold">
                  Share
                </span>
              </button>
            )}
          </div>
        </div>
        <div className="rounded-md inline-block font-bold pl-4 mt-1 md:mt-3 pr-2 py-2 md:py-4 border border-white/30 md:max-w-[500px]">
          <span className="break-all text-[12px] leading-[17px] md:text-[15px] md:leading-[18px]">
            {shareUrl}
          </span>
          <button
            className="pl-5 ml-auto pr-2 align-middle"
            onClick={handleCopyLink}
          >
            <CopyIcon extraClasses="fill-secondary hover:fill-secondary/70" />
          </button>
        </div>
      </div>
      <div className="bg-[#180a36]/50 mx-auto rounded-[8px] max-w-3xl grid grid-cols-1 md:grid-cols-2 pt-4 pb-2 px-4 md:pt-2 md:pr-2">
        <div className="md:my-8 md:pl-10 md:pr-1 md:py-8">
          <h4 className="text-[17px] leading-[18px] md:text-[24px] md:leading-[26px] my-auto flex md:flex-col text-center md:text-left">
            <div className="font-bold">{`Step 2`}&nbsp;&nbsp;</div>
            <div className="my-auto md:mt-3">
              Claim SBT for good luck and
              <span>
                <span className="hidden md:inline"> additional</span>
                <button
                  className="text-primary border-b border-b-primary ml-1 md:ml-2"
                  onClick={handleInfoButtonClick}
                >
                  tASC
                </button>
              </span>
            </div>
          </h4>
          <div className="mx-auto first:flex flex-col relative md:mt-14">
            <div className="flex mt-3 mb-3 md:mt-6 md:mb-0 md:hidden bg-black py-2 mx-14 rounded-xl">
              <Image
                src={`/images/sbts/${planet}.gif`}
                className="mx-auto"
                width={190}
                height={216}
                alt="SBT NFT"
              />
            </div>
            {!allowedToMint && (
              <div className="mt-3 px-10 md:px-8 md:pr-2 md:pl-0">
                <WalletConnect shouldBeConnected={!isDifferentWallet} />
              </div>
            )}
            {allowedToMint && address && (
              <SbtMintButton
                claimStatus={claimStatus}
                address={address}
                personalityId={personalityId}
              />
            )}
          </div>
        </div>
        <div className="hidden relative z-0 bg-black ml-[105px] pr-5 rounded-xl md:grid items-center">
          {/* <video autoPlay loop className="ml-auto" style={{ width: '221px', height: '252px' }}>
                        <source src={`/images/sbts/${planet}.mp4`} />
                    </video> */}
          <Image
            src={`/images/sbts/${planet}.gif`}
            className="ml-auto"
            width={221}
            height={252}
            alt="SBT NFT"
          />
        </div>
      </div>
    </>
  );
}

export default MintSection;
