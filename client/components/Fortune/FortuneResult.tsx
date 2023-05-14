import {
  useRef,
  useState,
  MutableRefObject,
  Dispatch,
  SetStateAction,
  useEffect,
} from "react";
import { event } from "nextjs-google-analytics";

import {
  FriendCard,
  UserReport,
  WalletHighlightTopValues,
} from "../../../types/ApiClient";
import DownloadButton from "./DownloadButton";
import { exportAsImage } from "../../../utils/exportAsImage";
import ShareButton from "./ShareButton";
import { useBaseModal } from "../Base/BaseModal";
import { toast } from "react-toastify";
import SbtMint from "./SbtMint";
import { useScrollTo } from "../../hooks/useScrollTo";
import useBind from "../../hooks/useBind";
import { useIsInViewport } from "../../hooks/useIsInViewport";
import Personality from "./pages/Personality";
import NextPageButton from "./base/NextPageButton";
import PreviousPageButton from "./base/PreviousPageButton";
import FortuneTheme from "./pages/FortuneTheme";
import LuckyRole from "./pages/LuckyRole";
import WalletHighlight from "./pages/WalletHighlight";
import LuckyMonths from "./pages/LuckyMonths";
import { Pages } from "./pages/report.types";
import SocialShareModal from "./base/SocialShareModal";
import LuckyToken from "./pages/LuckyToken";
import LuckyGoodies from "./pages/LuckyGoodies";
import LuckyFriends from "./pages/LuckyFriends";
import { Binder } from "../../hooks/useBind";
import { PageDownloadList } from "./FortuneWrapper";
import { BenefitsModal } from "./base/BenefitsModal";
import { TascSummary } from "../../../types/ApiClient";

interface FortuneResultProps {
  nickName: string;
  userReport: UserReport;
  friendCards: FriendCard[];
  walletHighlights: WalletHighlightTopValues;
  personalityRef: MutableRefObject<null>;
  fortuneThemeRef: MutableRefObject<null>;
  luckyRoleRef: MutableRefObject<null>;
  walletHighlightRef: MutableRefObject<null>;
  walletHighlight2Ref: MutableRefObject<null>;
  walletHighlight3Ref: MutableRefObject<null>;
  luckyMonthsRef: MutableRefObject<null>;
  luckyTokenRef: MutableRefObject<null>;
  luckyGoodiesRef: MutableRefObject<null>;
  luckyFriendsRef: MutableRefObject<null>;
  setCurrentImageSrc: Dispatch<SetStateAction<string>>;
  isDownloadModalOpen: Binder<boolean>;
  isDownloading: boolean;
  setIsDownloading: Dispatch<SetStateAction<boolean>>;
  isBenefitsModalOpen: Binder<boolean>;
  tAscSummary: Binder<TascSummary>;
  getPageList: () => PageDownloadList;
}

export const CLAIM_STATUS = {
  DISABLED: "Disabled",
  ACTIVE: "Active",
  CLAIMING: "Claiming",
  CLAIMED: "Claimed",
};

type ObjectValues<T> = T[keyof T];
export type ClaimStatus = ObjectValues<typeof CLAIM_STATUS>;

function shouldShowLuckyMonthFirst(theme: string | null | undefined): boolean {
  if (!theme) return false;

  const startWithOne = theme.startsWith("1");

  return startWithOne;
}

function FortuneReport({
  nickName,
  userReport,
  friendCards,
  walletHighlights,
  setCurrentImageSrc,
  personalityRef,
  fortuneThemeRef,
  luckyRoleRef,
  walletHighlightRef,
  walletHighlight2Ref,
  walletHighlight3Ref,
  luckyMonthsRef,
  luckyTokenRef,
  luckyGoodiesRef,
  luckyFriendsRef,
  isDownloadModalOpen,
  isDownloading,
  setIsDownloading,
  getPageList,
  isBenefitsModalOpen,
  tAscSummary,
}: FortuneResultProps) {
  const isShareModalOpen = useBaseModal(false);

  const [sharingIsLoading, setSharingIsLoading] = useState(false);
  const showLuckyMonthFirst = shouldShowLuckyMonthFirst(userReport?.theme);

  // new
  const [currentSharingPage, setCurrentSharingPage] =
    useState<Pages>("personality");
  const sbtMintRef = useRef(null);

  // scroll
  const isPersonalityInViewport = useIsInViewport(personalityRef);
  const isWalletHighlightInViewport = useIsInViewport(walletHighlightRef);
  const isWalletHighlight2InViewport = useIsInViewport(walletHighlight2Ref);
  const isWalletHighlight3InViewport = useIsInViewport(walletHighlight3Ref);
  const isFortuneThemeInViewport = useIsInViewport(fortuneThemeRef);
  const isLuckyRoleInViewport = useIsInViewport(luckyRoleRef);
  const isLuckyMonthsInViewport = useIsInViewport(luckyMonthsRef);
  const isLuckyTokenInViewport = useIsInViewport(luckyTokenRef);
  const isLuckyGoodiesInViewport = useIsInViewport(luckyGoodiesRef);
  const isLuckyFriendsInViewport = useIsInViewport(luckyFriendsRef);
  const isSbtMintInViewport = useIsInViewport(sbtMintRef);

  const [personalityId, scrollToPersonality] = useScrollTo();
  const [walletHighlightId, scrollToWalletHighLight] = useScrollTo();
  const [walletHighlight2Id, scrollToWalletHighLight2] = useScrollTo();
  const [walletHighlight3Id, scrollToWalletHighLight3] = useScrollTo();
  const [fortuneThemeId, scrollToFortuneTheme] = useScrollTo();
  const [luckyRoleId, scrollToLuckyRole] = useScrollTo();
  const [luckyMonthsId, scrollToLuckyMonths] = useScrollTo();
  const [luckyTokenId, scrollToLuckyToken] = useScrollTo();
  const [luckyGoodiesId, scrollToLuckyGoodies] = useScrollTo();
  const [luckyFriendsId, scrollToLuckyFriends] = useScrollTo();
  const [mintSection, scrollToMintSection] = useScrollTo();

  // sbt mint
  const claimStatus = useBind<ClaimStatus>(CLAIM_STATUS.ACTIVE);

  // navigation
  const [shouldShowNavigation, _setShouldShowNavigation] = useState(true);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  // record report page views
  useEffect(() => {
    if (!isPersonalityInViewport) return;

    event("view_wallet_ruling_star", {
      category: "FortuneReport",
      label: "view wallet ruling star page",
    });
  }, [isPersonalityInViewport]);

  useEffect(() => {
    if (!isWalletHighlightInViewport) return;

    event("view_wallet_highlights", {
      category: "FortuneReport",
      label: "view highlight page",
    });
  }, [isWalletHighlightInViewport]);

  useEffect(() => {
    if (!isWalletHighlight2InViewport) return;

    event("view_wallet_highlights2", {
      category: "FortuneReport",
      label: "view highlight page",
    });
  }, [isWalletHighlight2InViewport]);

  useEffect(() => {
    if (!isWalletHighlight3InViewport) return;

    event("view_wallet_highlights3", {
      category: "FortuneReport",
      label: "view highlight page",
    });
  }, [isWalletHighlight3InViewport]);

  useEffect(() => {
    if (!isFortuneThemeInViewport) return;

    event("view_fortune_theme", {
      category: "FortuneReport",
      label: "view fortune theme page",
    });
  }, [isFortuneThemeInViewport]);

  useEffect(() => {
    if (!isLuckyRoleInViewport) return;

    event("view_bonanza_outlook", {
      category: "FortuneReport",
      label: "view Bonanza Outlook page",
    });
  }, [isLuckyRoleInViewport]);

  useEffect(() => {
    if (!isLuckyMonthsInViewport) return;

    event("view_lucky_trend", {
      category: "FortuneReport",
      label: "view lucky trend page",
    });
  }, [isLuckyMonthsInViewport]);

  useEffect(() => {
    if (!isLuckyTokenInViewport) return;

    event("view_lucky_token", {
      category: "FortuneReport",
      label: "view lucky token page",
    });
  }, [isLuckyTokenInViewport]);

  useEffect(() => {
    if (!isLuckyGoodiesInViewport) return;

    event("view_lucky_goodies", {
      category: "FortuneReport",
      label: "view lucky goodies page",
    });
  }, [isLuckyGoodiesInViewport]);

  useEffect(() => {
    if (!isLuckyFriendsInViewport) return;

    event("view_lucky_friends", {
      category: "FortuneReport",
      label: "view lucky friends page",
    });
  }, [isLuckyFriendsInViewport]);

  useEffect(() => {
    if (!isSbtMintInViewport) return;

    event("view_sbt_mint", {
      category: "FortuneReport",
      label: "view sbt mint page",
    });
  }, [isSbtMintInViewport]);

  function handlePreviousPage() {
    if (isPersonalityInViewport) {
      return;
    }

    if (isWalletHighlightInViewport) {
      event("click_wallet_highlight1_previous", {
        category: "FortuneReport",
        label: "click wallet highlight 1 previous page",
      });
      scrollToPersonality();
      return;
    }

    if (isWalletHighlight2InViewport) {
      event("click_wallet_highlight2_previous", {
        category: "FortuneReport",
        label: "click wallet highlight 2 previous page",
      });
      scrollToWalletHighLight();
      return;
    }

    if (isWalletHighlight3InViewport) {
      event("click_wallet_highlight3_previous", {
        category: "FortuneReport",
        label: "click wallet highlight 3 previous page",
      });
      scrollToWalletHighLight2();
      return;
    }

    const walletHighlightCount = walletHighlights?.length ?? 0;

    if (isFortuneThemeInViewport) {
      event("click_fortune_theme_previous", {
        category: "FortuneReport",
        label: "click fortune theme previous page",
      });

      if (walletHighlightCount > 2) {
        scrollToWalletHighLight3();
        return;
      } else if (walletHighlightCount > 1) {
        scrollToWalletHighLight2();
        return;
      } else if (walletHighlightCount > 0) {
        scrollToWalletHighLight();
        return;
      }

      scrollToPersonality();
      return;
    }

    if (isLuckyRoleInViewport) {
      event("click_lucky_role_previous", {
        category: "FortuneReport",
        label: "click lucky role previous page",
      });

      if (showLuckyMonthFirst) {
        scrollToLuckyMonths();
        return;
      }

      scrollToFortuneTheme();
      return;
    }

    if (isLuckyMonthsInViewport) {
      event("click_lucky_month_previous", {
        category: "FortuneReport",
        label: "click lucky month previous page",
      });

      if (showLuckyMonthFirst) {
        scrollToFortuneTheme();
        return;
      }

      scrollToLuckyRole();
      return;
    }

    if (isLuckyTokenInViewport) {
      event("click_lucky_token_previous", {
        category: "FortuneReport",
        label: "click lucky token previous page",
      });

      if (showLuckyMonthFirst) {
        scrollToLuckyRole();
        return;
      }

      scrollToLuckyMonths();
      return;
    }

    if (isLuckyGoodiesInViewport) {
      event("click_lucky_goodies_previous", {
        category: "FortuneReport",
        label: "click lucky goodies previous page",
      });

      scrollToLuckyToken();
      return;
    }

    if (isLuckyFriendsInViewport) {
      event("click_lucky_friends_previous", {
        category: "FortuneReport",
        label: "click lucky friends previous page",
      });
      scrollToLuckyGoodies();
      return;
    }

    if (isSbtMintInViewport) {
      event("click_sbt_mint_previous", {
        category: "FortuneReport",
        label: "click submit mint previous page",
      });

      scrollToLuckyFriends();
      return;
    }
  }

  function handleNextPage() {
    const highLightCount = walletHighlights?.length ?? 0;

    if (isPersonalityInViewport) {
      event("click_wallet_ruling_next", {
        category: "FortuneReport",
        label: "click wallet ruling next page",
      });

      if (highLightCount > 0) {
        scrollToWalletHighLight();
        return;
      }

      scrollToFortuneTheme();
      return;
    }

    if (highLightCount > 0) {
      if (isWalletHighlightInViewport) {
        event("click_wallet_highlight1_next", {
          category: "FortuneReport",
          label: "click wallet highlight 1 next page",
        });

        if (highLightCount > 1) {
          scrollToWalletHighLight2();
          return;
        }

        scrollToFortuneTheme();
        return;
      }

      if (isWalletHighlight2InViewport) {
        event("click_wallet_highlight2_next", {
          category: "FortuneReport",
          label: "click wallet highlight 2 next page",
        });

        if (highLightCount > 2) {
          scrollToWalletHighLight3();
          return;
        }

        scrollToFortuneTheme();
        return;
      }

      if (isWalletHighlight3InViewport) {
        event("click_wallet_highlight3_next", {
          category: "FortuneReport",
          label: "click wallet highlight 3 next page",
        });

        scrollToFortuneTheme();
        return;
      }
    }

    if (isFortuneThemeInViewport) {
      event("click_fortune_theme_next", {
        category: "FortuneReport",
        label: "click fortune theme next page",
      });

      if (showLuckyMonthFirst) {
        scrollToLuckyMonths();
        return;
      }

      scrollToLuckyRole();
      return;
    }

    if (isLuckyMonthsInViewport) {
      event("click_lucky_month_next", {
        category: "FortuneReport",
        label: "click lucky month next page",
      });

      if (showLuckyMonthFirst) {
        scrollToLuckyRole();
        return;
      }

      scrollToLuckyToken();
      return;
    }

    if (isLuckyRoleInViewport) {
      event("click_lucky_role_next", {
        category: "FortuneReport",
        label: "click lucky role next page",
      });

      if (showLuckyMonthFirst) {
        scrollToLuckyToken();
        return;
      }

      scrollToLuckyMonths();
      return;
    }

    if (isLuckyTokenInViewport) {
      event("click_lucky_token_next", {
        category: "FortuneReport",
        label: "click lucky token next page",
      });

      scrollToLuckyGoodies();
      return;
    }

    if (isLuckyGoodiesInViewport) {
      event("click_lucky_goodies_next", {
        category: "FortuneReport",
        label: "click lucky goodies next page",
      });

      scrollToLuckyFriends();
      return;
    }

    if (isLuckyFriendsInViewport) {
      event("click_lucky_friends_next", {
        category: "FortuneReport",
        label: "click lucky friends next page",
      });

      scrollToMintSection();
      return;
    }
  }

  function checkLeftArrow() {
    if (isPersonalityInViewport) {
      setShowLeftArrow(false);
    } else {
      setShowLeftArrow(true);
    }
  }

  const handleOnScroll = () => {
    // reset the timer
    // setShouldShowNavigation(true);

    // check if we should hide the previous and next navigation
    checkLeftArrow();
    checkRightArrow();
  };

  function checkRightArrow() {
    if (isSbtMintInViewport) {
      setShowRightArrow(false);
    } else {
      setShowRightArrow(true);
    }
  }

  function getImgInfoFromPage(page: Pages) {
    let elementId, targetRef;
    let fileName = "report.png";
    let imageCount = 2;

    switch (page) {
      case "personality":
        targetRef = personalityRef.current;
        fileName = "report-personality.png";
        elementId = "report-personality-preview";
        imageCount = 3;
        break;
      case "wallet highlight":
        targetRef = walletHighlightRef.current;
        fileName = "report-wallet-highlight.png";
        elementId = "report-wallet-highlight-preview";
        imageCount = 3;
        break;
      case "wallet highlight 2":
        targetRef = walletHighlight2Ref.current;
        fileName = "report-wallet-highlight-2.png";
        elementId = "report-wallet-highlight-3-preview";
        imageCount = 3;
        break;
      case "wallet highlight 3":
        targetRef = walletHighlight3Ref.current;
        fileName = "report-wallet-highlight-3.png";
        elementId = "report-wallet-highlight-3-preview";
        imageCount = 3;
        break;
      case "fortune theme":
        targetRef = fortuneThemeRef.current;
        fileName = "report-fortune-theme.png";
        elementId = "report-fortune-theme-preview";
        imageCount = 2;
        break;
      case "lucky roles":
        targetRef = luckyRoleRef.current;
        fileName = "report-lucky-roles.png";
        elementId = "report-lucky-roles-preview";
        imageCount = 1;
        break;
      case "lucky months":
        targetRef = luckyMonthsRef.current;
        fileName = "report-lucky-month.png";
        elementId = "report-lucky-month-preview";
        imageCount = 2;
        break;
      case "lucky token":
        targetRef = luckyTokenRef.current;
        fileName = "report-lucky-token.png";
        elementId = "report-lucky-token-preview";
        imageCount = 2;
        break;
      case "lucky goodies":
        targetRef = luckyGoodiesRef.current;
        fileName = "report-lucky-goodies.png";
        elementId = "report-lucky-goodies-preview";
        imageCount = 9;
        break;
      case "lucky friends":
        targetRef = document.getElementById("report-lucky-friends-preview");
        fileName = "report-lucky-friends.png";
        elementId = "report-lucky-friends-preview";
        imageCount = 4;
        break;
    }

    return {
      elementId,
      targetRef,
      fileName,
      imageCount,
    };
  }

  async function handleDownload(page: Pages, showSuccessToast = true) {
    setIsDownloading(true);
    const { targetRef, fileName, imageCount, elementId } =
      getImgInfoFromPage(page);

    if (targetRef === null || targetRef === undefined) {
      setIsDownloading(false);

      return;
    }

    await new Promise((resolve) => setTimeout(resolve, 500));

    exportAsImage(targetRef, fileName, elementId, true)
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

  async function exportRandomImage(): Promise<string | null> {
    const pages = getPageList();
    const randomPage = pages[pages.length - 1];

    if (!randomPage) {
      return null;
    }

    const { targetRef, fileName, elementId } = getImgInfoFromPage(
      randomPage.page
    );

    if (targetRef === null) {
      return null;
    }

    const exportedImage = exportAsImage(targetRef, fileName, elementId, false);

    return (await exportedImage).image;
  }

  async function handleDownloadModal(page: Pages) {
    event("download_button_clicked_" + page, {
      category: "FortuneReport",
      label: "download button clicked on mobile",
    });

    const { targetRef, fileName, imageCount, elementId } =
      getImgInfoFromPage(page);

    if (targetRef === null || targetRef === undefined) {
      setIsDownloading(false);

      return;
    }

    setIsDownloading(true);

    exportAsImage(targetRef, fileName, elementId, false, false)
      .then((src) => {
        if (src === undefined) {
          toast.error("Failed to generate image");

          return;
        }

        setCurrentImageSrc(src.image);
        setIsDownloading(false);
        isDownloadModalOpen.setter(true);
      })
      .catch(() => {
        toast.error("Failed to generate image");
      });
  }

  async function exportImage(page: Pages): Promise<string | undefined> {
    const { targetRef, fileName, imageCount, elementId } =
      getImgInfoFromPage(page);

    if (targetRef === null || targetRef === undefined) return;

    await new Promise((resolve) => setTimeout(resolve, 500));

    const result = await exportAsImage(targetRef, fileName, elementId, false);

    return result.image;
  }

  async function handleShare(page: Pages) {
    event("share_button_clicked_" + page, {
      category: "FortuneReport",
      label: "share button clicked on mobile",
    });

    // not on mobile
    if (navigator?.share === undefined) {
      setCurrentSharingPage(page);
      isShareModalOpen.setter(true);

      return;
    }

    const { targetRef, fileName, elementId } = getImgInfoFromPage(page);
    if (targetRef === null || targetRef === undefined) {
      return;
    }

    const origin =
      typeof window !== "undefined" && window.location.origin
        ? window.location.origin
        : "";

    const fullURL = `${origin}`;
    const sharingText = `Generate your Ascendant Fortune Report and discover your 2023 with me! #2023ASCFortune, Get lucky with @Ascendant_astro. ${fullURL}/fortune/${userReport?.account.code}`;

    setSharingIsLoading(true);

    exportAsImage(targetRef, fileName, elementId, false)
      .then(async (exportedImage) => {
        const imageUrl = exportedImage.image;
        if (imageUrl === undefined || imageUrl === null) {
          toast.error("Failed to generate image");

          return;
        }

        const fetchedImage = await fetch(imageUrl);
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

        const shareData = {
          title: "ASC Fortune Telling",
          text: sharingText,
          files: [file],
        };

        setSharingIsLoading(false);
        if (
          typeof navigator?.canShare === "function" &&
          !navigator.canShare(shareData)
        ) {
          toast.error(
            "Sharing is not supported on this device, please try to download manually."
          );

          return;
        }

        try {
          await navigator.share(shareData);
        } catch (e) {
          console.log(e);
        }
      })
      .catch((error) => {
        console.error(error);
        toast.error("Failed to export image");
      });
  }

  return (
    <>
      <BenefitsModal
        isOpen={isBenefitsModalOpen}
        tAscSummary={tAscSummary}
        targetAddress={userReport.publicAddress}
      />
      <div
        className={`transition-all ease-in-out ${
          shouldShowNavigation ? "" : "hidden md:block"
        }`}
      >
        <PreviousPageButton
          showLeftArrow={showLeftArrow}
          onClickHandler={handlePreviousPage}
        />
        <NextPageButton
          showRightArrow={showRightArrow}
          onClickHandler={handleNextPage}
        />
      </div>
      <div
        className={`grid grid-flow-col md:grid-rows-none justify-start gap-x-4 snap-x snap-mandatory md:pt-4 overflow-x-scroll scrollbar-hide`}
        onScroll={handleOnScroll}
      >
        {userReport && (
          <>
            <SocialShareModal
              isOpen={isShareModalOpen}
              userReport={userReport}
              page={currentSharingPage}
              downloadHandler={handleDownload}
              exportImage={exportImage}
            />
            {/* Personality */}
            <div
              className="snap-center w-screen flex relative justify-center md:px-4"
              id={personalityId}
            >
              <Personality
                nickName={nickName}
                userReport={userReport}
                ref={personalityRef}
              />
              <div className={`absolute right-4 top-3 z-50 md:hidden`}>
                <div className="space-x-1 flex">
                  <DownloadButton
                    loading={isDownloading}
                    onClickHandler={() => handleDownloadModal("personality")}
                  />
                  <ShareButton
                    loading={sharingIsLoading}
                    onClickHandler={() => handleShare("personality")}
                  />
                </div>
              </div>
            </div>
            {/* Wallet highlight */}
            {walletHighlights.length > 0 && walletHighlights[0] && (
              <div
                className="snap-center relative w-screen flex justify-center md:px-4"
                id={walletHighlightId}
              >
                <WalletHighlight
                  nickName={nickName}
                  userReport={userReport}
                  walletHighlight={walletHighlights[0]}
                  ref={walletHighlightRef}
                />
                <div className={`absolute right-4 top-3 z-50 md:hidden`}>
                  <div className="space-x-1 flex">
                    <DownloadButton
                      loading={isDownloading}
                      onClickHandler={() =>
                        handleDownloadModal("wallet highlight")
                      }
                    />
                    <ShareButton
                      loading={sharingIsLoading}
                      onClickHandler={() => handleShare("wallet highlight")}
                    />
                  </div>
                </div>
              </div>
            )}
            {walletHighlights.length > 1 && walletHighlights[1] && (
              <div
                className="snap-center relative w-screen flex justify-center md:px-4"
                id={walletHighlight2Id}
              >
                <WalletHighlight
                  nickName={nickName}
                  userReport={userReport}
                  walletHighlight={walletHighlights[1]}
                  ref={walletHighlight2Ref}
                />
                <div className={`absolute right-4 top-3 z-50 md:hidden`}>
                  <div className="space-x-1 flex">
                    <DownloadButton
                      loading={isDownloading}
                      onClickHandler={() =>
                        handleDownloadModal("wallet highlight 2")
                      }
                    />
                    <ShareButton
                      loading={sharingIsLoading}
                      onClickHandler={() => handleShare("wallet highlight 2")}
                    />
                  </div>
                </div>
              </div>
            )}
            {walletHighlights.length > 2 && walletHighlights[2] && (
              <div
                className="snap-center relative w-screen flex justify-center md:px-4"
                id={walletHighlight3Id}
              >
                <WalletHighlight
                  nickName={nickName}
                  userReport={userReport}
                  walletHighlight={walletHighlights[2]}
                  ref={walletHighlight3Ref}
                />
                <div className={`absolute right-4 top-3 z-50 md:hidden`}>
                  <div className="space-x-1 flex">
                    <DownloadButton
                      loading={isDownloading}
                      onClickHandler={() =>
                        handleDownloadModal("wallet highlight 3")
                      }
                    />
                    <ShareButton
                      loading={sharingIsLoading}
                      onClickHandler={() => handleShare("wallet highlight 3")}
                    />
                  </div>
                </div>
              </div>
            )}
            {/* Fortune Theme */}
            {userReport.theme !== null && (
              <div
                className="snap-center relative w-screen flex justify-center md:px-4"
                id={fortuneThemeId}
              >
                <FortuneTheme
                  nickName={nickName}
                  userReport={userReport}
                  ref={fortuneThemeRef}
                />
                <div className={`absolute right-4 top-3 z-50 md:hidden`}>
                  <div className="space-x-1 flex">
                    <DownloadButton
                      loading={isDownloading}
                      onClickHandler={() =>
                        handleDownloadModal("fortune theme")
                      }
                    />
                    <ShareButton
                      loading={sharingIsLoading}
                      onClickHandler={() => handleShare("fortune theme")}
                    />
                  </div>
                </div>
              </div>
            )}
            {/* Lucky Role */}
            {!showLuckyMonthFirst && (
              <div
                className="snap-center relative w-screen flex justify-center md:px-4"
                id={luckyRoleId}
              >
                <LuckyRole
                  nickName={nickName}
                  userReport={userReport}
                  ref={luckyRoleRef}
                />
                <div className={`absolute right-4 top-3 z-50 md:hidden`}>
                  <div className="space-x-1 flex">
                    <DownloadButton
                      loading={isDownloading}
                      onClickHandler={() => handleDownloadModal("lucky roles")}
                    />
                    <ShareButton
                      loading={sharingIsLoading}
                      onClickHandler={() => handleShare("lucky roles")}
                    />
                  </div>
                </div>
              </div>
            )}
            {/* Lucky Months */}
            {userReport?.parsedLuckyMonths &&
              userReport?.parsedLuckyMonths !== null && (
                <div
                  className="snap-center relative w-screen flex justify-center md:px-4"
                  id={luckyMonthsId}
                >
                  <LuckyMonths
                    nickName={nickName}
                    userReport={userReport}
                    ref={luckyMonthsRef}
                  />
                  <div className={`absolute right-4 top-3 z-50 md:hidden`}>
                    <div className="space-x-1 flex">
                      <DownloadButton
                        loading={isDownloading}
                        onClickHandler={() =>
                          handleDownloadModal("lucky months")
                        }
                      />
                      <ShareButton
                        loading={sharingIsLoading}
                        onClickHandler={() => handleShare("lucky months")}
                      />
                    </div>
                  </div>
                </div>
              )}
            {showLuckyMonthFirst && (
              <div
                className="snap-center relative w-screen flex justify-center md:px-4"
                id={luckyRoleId}
              >
                <LuckyRole
                  nickName={nickName}
                  userReport={userReport}
                  ref={luckyRoleRef}
                />
                <div className={`absolute right-4 top-3 z-50 md:hidden`}>
                  <div className="space-x-1 flex">
                    <DownloadButton
                      loading={isDownloading}
                      onClickHandler={() => handleDownloadModal("lucky roles")}
                    />
                    <ShareButton
                      loading={sharingIsLoading}
                      onClickHandler={() => handleShare("lucky roles")}
                    />
                  </div>
                </div>
              </div>
            )}
            {/* Lucky Token */}
            {userReport?.parsedLuckyToken && (
              <div
                className="snap-center relative w-screen flex justify-center md:px-4"
                id={luckyTokenId}
              >
                <LuckyToken
                  nickName={nickName}
                  userReport={userReport}
                  ref={luckyTokenRef}
                />
                <div className={`absolute right-4 top-3 z-50 md:hidden`}>
                  <div className="space-x-1 flex">
                    <DownloadButton
                      loading={isDownloading}
                      onClickHandler={() => handleDownloadModal("lucky token")}
                    />
                    <ShareButton
                      loading={sharingIsLoading}
                      onClickHandler={() => handleShare("lucky token")}
                    />
                  </div>
                </div>
              </div>
            )}
            {/* Lucky Goodies */}
            <div
              className="snap-center relative w-screen flex justify-center md:px-4"
              id={luckyGoodiesId}
            >
              <LuckyGoodies
                nickName={nickName}
                userReport={userReport}
                ref={luckyGoodiesRef}
              />
              <div className={`absolute right-4 top-3 z-50 md:hidden`}>
                <div className="space-x-1 flex">
                  <DownloadButton
                    loading={isDownloading}
                    onClickHandler={() => handleDownloadModal("lucky goodies")}
                  />
                  <ShareButton
                    loading={sharingIsLoading}
                    onClickHandler={() => handleShare("lucky goodies")}
                  />
                </div>
              </div>
            </div>
            {/* Lucky Friends */}
            <div
              className="snap-center relative w-screen flex justify-center md:px-4"
              id={luckyFriendsId}
            >
              <LuckyFriends
                nickName={nickName}
                userReport={userReport}
                friendCards={friendCards}
                ref={luckyFriendsRef}
              />
              <div className={`absolute right-4 top-3 z-50 md:hidden`}>
                <div className="space-x-1 flex">
                  <DownloadButton
                    loading={isDownloading}
                    onClickHandler={() => handleDownloadModal("lucky friends")}
                  />
                  <ShareButton
                    loading={sharingIsLoading}
                    onClickHandler={() => handleShare("lucky friends")}
                  />
                </div>
              </div>
            </div>
            <div
              className="snap-center relative w-screen flex justify-center md:px-4"
              id={luckyGoodiesId}
              ref={sbtMintRef}
            >
              <SbtMint
                id={mintSection}
                userReport={userReport}
                nickname={nickName}
                claimStatus={claimStatus}
                isSbtMintInViewport={isSbtMintInViewport}
                exportRandomImage={exportRandomImage}
                isBenefitsModalOpen={isBenefitsModalOpen}
              />
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default FortuneReport;
