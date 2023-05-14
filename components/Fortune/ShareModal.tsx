import { BaseModal } from "../Base/BaseModal";
import { Binder } from "../../hooks/useBind";
import React from "react";
import Image from "next/image";
import { ShareIcon } from "@heroicons/react/24/outline";
import { ExportImageResult } from "../../utils/exportAsImage";
import { toast } from "react-toastify";
import { UserReport } from "../../types/ApiClient";

type TargetPage = 1 | 2 | 3 | 4;
interface ShareModal {
  nickName: string;
  isOpen: Binder<boolean>;
  targetPage: TargetPage;
  targetUserReport?: UserReport | undefined;
  userReport: UserReport | undefined;
  downloadHandler: (() => void) | undefined;
  exportImage?: () => Promise<ExportImageResult | undefined>;
}

interface ShareAction {
  icon: string | JSX.Element;
  text: string;
  href: string;
  onclickHandler?: (event: React.MouseEvent) => void;
  classes?: string;
  outerClasses?: string;
}

function ShareModal({
  nickName,
  isOpen,
  userReport,
  targetUserReport,
  targetPage,
  exportImage,
  downloadHandler,
}: ShareModal) {
  // get current full URL
  const origin =
    typeof window !== "undefined" && window.location.origin
      ? window.location.origin
      : "";

  const fullURL = `${origin}`;
  const sharingText = `Generate your Ascendant Fortune Report and discover your 2023 with me! #2023ASCFortune.`;

  function handleDownloadImg(event: React.MouseEvent) {
    event.preventDefault();

    if (downloadHandler === undefined) return;
    downloadHandler();
  }

  async function handleTriggerShare(event: React.MouseEvent) {
    event.preventDefault();

    if (
      navigator?.share === undefined ||
      exportImage === undefined
      //  || imageSrc.blob === null
    )
      return;

    const exportedImg = await exportImage();

    if (exportedImg?.blob === null || exportedImg?.blob === undefined) return;

    // get the file
    const file = new File(
      // [imageSrc.blob],
      [exportedImg?.blob],
      "report.png",
      { type: "image/png" }
    );

    const shareData = {
      title: "ASC Fortune Telling",
      text: `${sharingText} ${fullURL}/fortune/${userReport?.account.code}`,
      files: [file],
    };

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
  }

  // async function handleCopy(event: React.MouseEvent) {
  //     event.preventDefault();

  //     await navigator.clipboard.writeText(fullURL);
  //     toast.success('Link copied to clipboard!');
  // }

  const shareActions: ShareAction[] = [
    {
      icon: "/assets/download-icon.svg",
      text: "Download image",
      href: "#",
      onclickHandler: handleDownloadImg,
      classes: "pt-1",
      outerClasses: "md:hidden",
    },
    // {
    //     icon: <LinkIcon className="w-8 h-8" />,
    //     text: 'Copy link',
    //     href: '#',
    //     onclickHandler: handleCopy,
    // }
  ];

  const twitterSharingText = sharingText + " Get lucky with @Ascendant_astro";
  const telegramSharingText =
    "Generate your Ascendant Fortune Report and discover your 2023 with me!";
  const telegramUrl = new URL("https://t.me/share/url");
  telegramUrl.searchParams.set("url", fullURL);
  telegramUrl.searchParams.set("text", telegramSharingText);

  if (navigator?.share !== undefined) {
    shareActions.push(
      // {
      //     icon: '/assets/facebook.svg',
      //     text: 'Share to Facebook',
      //     href: 'fb://profile'
      // },
      // {
      //     icon: '/assets/twitter.svg',
      //     text: 'Share to Twitter',
      //     href: 'twitter://post?message=' + twitterSharingText,
      // },
      // {
      //     icon: '/assets/discord.svg',
      //     text: 'Share to Discord',
      //     href: 'discord://'
      // },
      // {
      //     icon: '/assets/telegram.svg',
      //     text: 'Share to Telegram',
      //     href: telegramUrl.href
      // },
      // {
      //     icon: '/assets/wechat.svg',
      //     text: 'Share to WeChat',
      //     href: 'weixin://',
      // },
      {
        icon: <ShareIcon className="w-8 h-8" />,
        text: "Share with friends",
        href: "#",
        onclickHandler: handleTriggerShare,
      }
    );
  } else {
    const twitterUrl = new URL("https://twitter.com/intent/tweet");
    twitterUrl.searchParams.set(
      "text",
      sharingText + " Get lucky with @Ascendant_astro"
    );

    const facebookUrl = new URL("https://www.facebook.com/sharer/sharer.php");
    facebookUrl.searchParams.set("u", fullURL);

    shareActions.push(
      {
        icon: "/assets/facebook.svg",
        text: "Share to Facebook",
        href: facebookUrl.href,
      },
      {
        icon: "/assets/twitter.svg",
        text: "Share to Twitter",
        href: twitterUrl.href,
      },
      {
        icon: "/assets/discord.svg",
        text: "Share to Discord",
        href: "https://discord.com/app",
      },
      {
        icon: "/assets/telegram.svg",
        text: "Share to Telegram",
        href: telegramUrl.href,
      }
    );
  }

  return (
    <BaseModal isOpen={isOpen} title="Share" size="xl">
      <div className="grid grid-cols-1">
        <div className="pt-2 px-2">
          <div className="flex justify-around md:grid md:grid-cols-2 space-y-1">
            {shareActions.map((shareAction) => (
              <div
                className={`py-3 px-2 rounded-xl transition hover:bg-transparent/30 ${
                  shareAction?.outerClasses ? shareAction.outerClasses : ""
                }`}
                key={shareAction.text}
              >
                <a
                  href={shareAction.href}
                  target="_blank"
                  rel="noreferrer"
                  className="flex space-x-4"
                  onClick={shareAction.onclickHandler ?? undefined}
                >
                  {typeof shareAction.icon === "string" ? (
                    <Image
                      src={shareAction.icon}
                      width="34"
                      height="34"
                      alt={shareAction.text}
                      className={`${
                        shareAction?.classes ? shareAction?.classes : ""
                      }`}
                    />
                  ) : (
                    shareAction.icon
                  )}
                  <span className="my-auto hidden md:block">
                    {shareAction.text}
                  </span>
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </BaseModal>
  );
}

export default ShareModal;
