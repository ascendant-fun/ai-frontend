import {
  FriendCard,
  UserReport,
  WalletHighlightTopValues,
} from "../../types/ApiClient";
import DownloadButton from "./DownloadButton";
import { useEffect, useRef, useState, Dispatch, SetStateAction } from "react";
import { exportAsImage } from "../../utils/exportAsImage";
import { useBaseModal } from "../Base/BaseModal";
import { toast } from "react-toastify";
import SocialButton from "./SocialButton";
import DownloadModal from "./DownloadModal";
import XIcon from "../Base/icons/XIcon";
import { useSocialMedia } from "../../hooks/useSocialMedia";
import { Pages } from "./pages/report.types";
import FortuneLoading from "./FortuneLoading";
import FortuneResult from "./FortuneResult";
import Image from "next/image";
import ShareTooltip from "../Base/ShareTooltip";
import { event } from "nextjs-google-analytics";
import { Binder } from "../../hooks/useBind";
import { TascSummary } from "../../types/ApiClient";
import APIClient from "../../api/APIClient";

interface FortuneWrapperProps {
  nickName: string;
  userReport: UserReport | undefined;
  goToPage: (pageNumber: number) => void;
  walletHighlights: WalletHighlightTopValues;
  showLoading: boolean;
  setShowLoading: Dispatch<SetStateAction<boolean>>;
  showResult: boolean;
  getRequiredData: () => void;
  isBenefitsModalOpen: Binder<boolean>;
  tAscSummary: Binder<TascSummary>;
}

export type PageDownloadList = {
  page: Pages;
  imageCount: number;
}[];

function FortuneWrapper({
  nickName,
  userReport,
  walletHighlights,
  goToPage,
  showResult,
  showLoading,
  setShowLoading,
  getRequiredData,
  isBenefitsModalOpen,
  tAscSummary,
}: FortuneWrapperProps) {
  const [isDownloading, setIsDownloading] = useState(false);
  const isDownloadModalOpen = useBaseModal(false);
  const [friendCards, setFriendCards] = useState<FriendCard[]>([]);
  const [currentImageSrc, setCurrentImageSrc] = useState("");
  const [shouldGetData, setShouldGetData] = useState(false);
  const [allowedShowResult, setAllowedShowResult] = useState(false);

  const personalityRef = useRef(null);
  const walletHighlightRef = useRef(null);
  const walletHighlight2Ref = useRef(null);
  const walletHighlight3Ref = useRef(null);
  const fortuneThemeRef = useRef(null);
  const luckyRoleRef = useRef(null);
  const luckyMonthsRef = useRef(null);
  const luckyTokenRef = useRef(null);
  const luckyGoodiesRef = useRef(null);
  const luckyFriendsRef = useRef(null);

  // navigation
  const socialMedias = useSocialMedia(userReport?.account.code ?? "");

  async function getFriendCards(address: string, reportId: string) {
    if (!address) {
      toast.error("Please connect wallet first");

      throw new Error("Please connect wallet first");
    }

    if (!reportId) {
      return;
    }

    const apiClient = new APIClient();
    const response = await apiClient.getFriendCards(address, reportId);

    setFriendCards(response);
  }

  // functions
  function takeMeToReport() {
    setShowLoading(false);
    setAllowedShowResult(true);

    if (userReport && userReport.id) {
      getFriendCards(userReport.account.publicAddress, userReport.id);
    }
  }

  function getPageList() {
    const downloadList: PageDownloadList = [
      {
        page: "personality",
        imageCount: 3,
      },
      {
        page: "lucky roles",
        imageCount: 1,
      },
    ];

    if (walletHighlightRef.current) {
      downloadList.push({
        page: "wallet highlight",
        imageCount: 3,
      });
    }

    if (walletHighlight2Ref.current) {
      downloadList.push({
        page: "wallet highlight 2",
        imageCount: 3,
      });
    }

    if (walletHighlight3Ref.current) {
      downloadList.push({
        page: "wallet highlight 3",
        imageCount: 3,
      });
    }

    if (fortuneThemeRef.current) {
      downloadList.push({
        page: "fortune theme",
        imageCount: 2,
      });
    }

    if (luckyMonthsRef.current) {
      downloadList.push({
        page: "lucky months",
        imageCount: 2,
      });
    }

    if (luckyTokenRef.current) {
      downloadList.push({
        page: "lucky token",
        imageCount: 2,
      });
    }

    if (luckyGoodiesRef.current) {
      downloadList.push({
        page: "lucky goodies",
        imageCount: 9,
      });
    }

    if (luckyFriendsRef.current) {
      downloadList.push({
        page: "lucky friends",
        imageCount: 4,
      });
    }

    return downloadList;
  }

  async function handleDownloadAll() {
    event("download_all_button_clicked", {
      category: "FortuneReport",
      label: "download all button clicked on pc",
    });

    const downloadList = getPageList();

    for (const page of downloadList) {
      await handleDownload(page.page, false, page.imageCount);
    }

    toast.success("Download successfully");
  }

  function getImgInfoFromPage(page: Pages) {
    let elementId, targetRef;
    let fileName = "report.png";

    switch (page) {
      case "personality":
        targetRef = personalityRef.current;
        fileName = "report-personality.png";
        elementId = "report-personality-preview";
        break;
      case "wallet highlight":
        targetRef = walletHighlightRef.current;
        fileName = "report-wallet-highlight.png";
        elementId = "report-wallet-highlight-preview";
        break;
      case "wallet highlight 2":
        targetRef = walletHighlight2Ref.current;
        fileName = "report-wallet-highlight-2.png";
        elementId = "report-wallet-highlight-3-preview";
        break;
      case "wallet highlight 3":
        targetRef = walletHighlight3Ref.current;
        fileName = "report-wallet-highlight-3.png";
        elementId = "report-wallet-highlight-3-preview";
        break;
      case "fortune theme":
        targetRef = fortuneThemeRef.current;
        fileName = "report-fortune-theme.png";
        elementId = "report-fortune-theme-preview";
        break;
      case "lucky roles":
        targetRef = luckyRoleRef.current;
        fileName = "report-lucky-roles.png";
        elementId = "report-lucky-roles-preview";
        break;
      case "lucky months":
        targetRef = luckyMonthsRef.current;
        fileName = "report-lucky-month.png";
        elementId = "report-lucky-month-preview";
        break;
      case "lucky token":
        targetRef = luckyTokenRef.current;
        fileName = "report-lucky-token.png";
        elementId = "report-lucky-token-preview";
        break;
      case "lucky goodies":
        targetRef = luckyGoodiesRef.current;
        fileName = "report-lucky-goodies.png";
        elementId = "report-lucky-goodies-preview";
        break;
      case "lucky friends":
        targetRef = document.getElementById("report-lucky-friends-preview");
        fileName = "report-lucky-friends.png";
        elementId = "report-lucky-friends-preview";
        break;
    }

    return {
      elementId,
      targetRef,
      fileName,
    };
  }

  async function handleDownload(
    page: Pages,
    showSuccessToast = true,
    imageCount: number = 3
  ) {
    setIsDownloading(true);
    const { targetRef, fileName, elementId } = getImgInfoFromPage(page);

    if (!targetRef) {
      setIsDownloading(false);
      return;
    }

    await new Promise((resolve) => setTimeout(resolve, 500));

    await exportAsImage(targetRef, fileName, elementId, true)
      .then(() => {
        if (showSuccessToast) {
          toast.success("Download successfully");
        }

        setIsDownloading(false);
      })
      .catch(() => {
        toast.error("Failed to generate image, please try again");
        setIsDownloading(false);
      });
  }

  useEffect(() => {
    if (!showLoading) return;

    setShouldGetData(true);
  }, [showLoading]);

  useEffect(() => {
    if (!shouldGetData) return;

    (async () => {
      await getRequiredData();
    })();
  }, [shouldGetData]);

  useEffect(() => {
    if (!showResult) {
      setAllowedShowResult(false);
    }
  }, [showResult]);

  return (
    <div className="md:pt-6 md:pb-24 relative flex flex-col space-y-0 min-h-screen">
      <div className="md:justify-end mt-2 hidden md:flex z-50 md:mt-8">
        <button
          className="fixed right-0 top-16 mr-5 group p-1"
          onClick={() => {
            setTimeout(() => {
              if (goToPage === undefined) return;
              goToPage(1);
            }, 0);
          }}
        >
          <XIcon
            width={18}
            height={18}
            extraClasses="fill-white transition group-hover:fill-white/30"
          />
        </button>
        <DownloadModal
          isOpen={isDownloadModalOpen}
          imageSrc={currentImageSrc}
        />
      </div>
      {allowedShowResult && (
        <div className="absolute z-[200] left-1/2 transform -translate-x-[70%] bottom-12 hidden md:flex px-2 space-x-3 md:items-center">
          <div className="relative hidden md:block">
            <Image
              src="/images/report/share-label.png"
              width="280"
              height="47"
              alt="label"
            />
            <span className="absolute top-3 left-4 text-black md:text-[12px] md:leading-[12px] md:pb-4 lg:text-[17px] lg:leading-[17px] xl:text-[18px] xl:leading-[18px]">
              Share report and earn tASC
            </span>
            <div className="absolute right-5 top-3">
              <ShareTooltip fill="black" />
            </div>
          </div>
          <DownloadButton
            onClickHandler={handleDownloadAll}
            loading={isDownloading}
          />
          {socialMedias.map((socialMedia, index) => (
            <SocialButton
              key={index}
              name={socialMedia.name}
              text={socialMedia.text}
              href={socialMedia.href}
            />
          ))}
          <DownloadModal
            isOpen={isDownloadModalOpen}
            imageSrc={currentImageSrc}
          />
        </div>
      )}
      {showLoading && (
        <FortuneLoading
          showResult={showResult}
          takeMeToReport={takeMeToReport}
        />
      )}
      {allowedShowResult && userReport && (
        <FortuneResult
          nickName={nickName}
          userReport={userReport}
          friendCards={friendCards}
          walletHighlights={walletHighlights}
          setCurrentImageSrc={setCurrentImageSrc}
          personalityRef={personalityRef}
          isDownloadModalOpen={isDownloadModalOpen}
          fortuneThemeRef={fortuneThemeRef}
          luckyRoleRef={luckyRoleRef}
          walletHighlightRef={walletHighlightRef}
          walletHighlight2Ref={walletHighlight2Ref}
          walletHighlight3Ref={walletHighlight3Ref}
          luckyMonthsRef={luckyMonthsRef}
          luckyTokenRef={luckyTokenRef}
          luckyGoodiesRef={luckyGoodiesRef}
          luckyFriendsRef={luckyFriendsRef}
          isDownloading={isDownloading}
          setIsDownloading={setIsDownloading}
          getPageList={getPageList}
          isBenefitsModalOpen={isBenefitsModalOpen}
          tAscSummary={tAscSummary}
        />
      )}
    </div>
  );
}

export default FortuneWrapper;
