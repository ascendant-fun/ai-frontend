/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @next/next/no-img-element */
import { useEffect, useState, ChangeEvent, CSSProperties } from "react";
import { get } from "lodash";

import {
  Account,
  UserReport,
  WalletHighlightsData,
} from "../../../types/ApiClient";
import {
  getUserAvatar,
  getThemeInfo,
  getTokenFullName,
  getTokenImgSrc,
  getLuckyMonth,
  getBonanzaThemes,
  getDescriptionByTag,
  getNickName,
  getHighlightDescriptionByTag,
} from "../../../utils/utils";
import { truncateStringInMiddle } from "../../../utils/truncateString";
import EditIcon from "./icons/EditIcon";
import { useBaseModal } from "./BaseModal";
import CropImageModal from "./CropImageModal";
import TagTooltip from "./TagTooltip";
import { CoinMap, PlanetsMap } from "../../../utils/constants";

interface ForYouTagProps {
  className?: string;
  style?: CSSProperties;
}

const ForYouTag = ({ style, className }: ForYouTagProps) => (
  <span
    className={`w-[78px] h-[28px] text-black text-xs font-bold text-center rounded-sm flex items-center justify-center ${className}`}
    style={{ backgroundColor: "#DDFE15", ...style }}
  >
    For You!
  </span>
);

interface TagProps {
  text?: string;
  description?: string;
  style?: CSSProperties;
}

const Tag = ({ text, description, style }: TagProps) => (
  <div className="inline-block relative">
    <TagTooltip text={description} disabled={!description}>
      <span
        className="h-[22px] px-1 py-1 text-primary font-bold text-center rounded border flex items-center cursor-default hover:border-white"
        style={{
          borderColor: "#D84B8B",
          backgroundColor: "rgba(22, 21, 21, 0.6)",
          ...style,
        }}
      >
        {text}
      </span>
    </TagTooltip>
  </div>
);

interface FriendCardProps {
  id?: string;
  style?: CSSProperties;
  nickname: string;
  account: Account;
  showForYou?: boolean;
  showUpload?: boolean;
  highlight: WalletHighlightsData;
  report: UserReport;
  isCurrentUser?: boolean;
  onAccountChange?: (account: Account) => void;
}

const FriendCard = (props: FriendCardProps) => {
  const {
    id,
    style,
    showForYou,
    nickname,
    isCurrentUser,
    showUpload,
    highlight,
    report,
    onAccountChange,
  } = props;
  const luckyToken = JSON.parse(report.luckyToken ?? "{}");
  const unluckyToken = JSON.parse(report.unluckyToken ?? "{}");
  const radarInfo = JSON.parse(report.raderInfo ?? "{}");
  const topValues = JSON.parse(highlight.topValues ?? "{}");
  const trendTheme = report.theme?.startsWith("1")
    ? getThemeInfo(report.theme)
    : null;
  const luckyTokenName = getTokenFullName(luckyToken.name);
  const unluckyTokenName = getTokenFullName(unluckyToken.name);
  const luckyTokenImg = getTokenImgSrc(luckyToken?.name);
  const unluckyTokenImg = getTokenImgSrc(unluckyToken?.name);
  const luckyMonth = getLuckyMonth(report.luckyMonths);
  const bonanzaThemes = getBonanzaThemes(radarInfo, topValues, report.theme);

  const [account, setAccount] = useState<Account>({
    id: 0,
    code: "",
    ens: "",
    nickName: "",
    publicAddress: "",
  });

  useEffect(() => {
    if (props.account) {
      if (isCurrentUser) {
        setAccount({ ...props.account, nickName: nickname });
      } else {
        setAccount(props.account);
      }
    }
  }, [props.account, isCurrentUser, nickname]);

  const isOpen = useBaseModal(false);
  const [image, setImage] = useState<string>();

  // console.log(
  //   "account",
  //   account.nickName,
  //   trendTheme,
  //   topValues.length,
  //   bonanzaThemes
  // );

  const handleFile = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    const file = files?.item(0);
    const reader = new FileReader();

    reader.onload = () => {
      setImage(reader.result as string);
    };

    if (file) {
      reader.readAsDataURL(file);
    }

    // 👇️ reset file input
    e.target.value = "";

    isOpen.setter(true);
  };

  const getHighlights = () => {
    if (!topValues) {
      return "";
    }

    if (topValues.length === 1) {
      return (
        <span>
          {account.nickName} is an absolute{" "}
          <Tag
            text={`#${topValues[0].keyword}`}
            description={getHighlightDescriptionByTag(topValues[0].keyword)}
          />{" "}
          when trading in Web3.0!
        </span>
      );
    } else if (topValues.length === 2) {
      return (
        <span>
          {account.nickName} is an absolute{" "}
          <Tag
            text={`#${topValues[0].keyword}`}
            description={getHighlightDescriptionByTag(topValues[0].keyword)}
          />{" "}
          and{" "}
          <Tag
            text={`#${topValues[1].keyword}`}
            description={getHighlightDescriptionByTag(topValues[1].keyword)}
          />{" "}
          when trading in Web3.0!
        </span>
      );
    } else {
      return (
        <span>
          {account.nickName} is an absolute{" "}
          <Tag
            text={`#${topValues[0].keyword}`}
            description={getHighlightDescriptionByTag(topValues[0].keyword)}
          />{" "}
          ,{" "}
          <Tag
            text={`#${topValues[1].keyword}`}
            description={getHighlightDescriptionByTag(topValues[1].keyword)}
          />{" "}
          and{" "}
          <Tag
            text={`#${topValues[2].keyword}`}
            description={getHighlightDescriptionByTag(topValues[2].keyword)}
          />{" "}
          when trading in Web3.0!
        </span>
      );
    }
  };

  const getTrendTheme = () => {
    if (!trendTheme || topValues?.length) {
      return "";
    }

    if (trendTheme.name === "ToTheMoon") {
      return (
        <span>
          {account.nickName}'s monthly fortune scores will surge{" "}
          <Tag
            text={`#${trendTheme.name}`}
            description={getDescriptionByTag(trendTheme.name)}
          />{" "}
          in 2023.
        </span>
      );
    }

    if (trendTheme.name === "GoldenBullRun") {
      return (
        <span>
          {account.nickName}'s monthly fortune scores will have a{" "}
          <Tag
            text={`#${trendTheme.name}`}
            description={getDescriptionByTag(trendTheme.name)}
          />{" "}
          in 2023.
        </span>
      );
    }

    if (trendTheme.name === "BullishComeback") {
      return (
        <span>
          {account.nickName}'s monthly fortune scores will receive a{" "}
          <Tag
            text={`#${trendTheme.name}`}
            description={getDescriptionByTag(trendTheme.name)}
          />{" "}
          in 2023.
        </span>
      );
    }

    return (
      <span>
        {account.nickName}'s monthly fortune trend will rock like a{" "}
        <Tag
          text={`#${trendTheme.name}`}
          description={getDescriptionByTag(trendTheme.name)}
        />
        in 2023.
      </span>
    );
  };

  const getBonanzaTheme = () => {
    if (topValues?.length) {
      let tagLength = topValues?.length || 0;

      if (Number(tagLength) >= 2) {
        return (
          <span>
            Get ready to make a ton with{" "}
            {bonanzaThemes.length > 0 ? (
              <Tag
                text={`#${bonanzaThemes[0].type}`}
                description={getDescriptionByTag(bonanzaThemes[0].type)}
              />
            ) : null}
            !
          </span>
        );
      } else if (Number(tagLength) === 1) {
        return (
          <span>
            In 2023, {account.nickName} will be filled with good luck and make a
            fortune with{" "}
            {bonanzaThemes.length > 1 ? (
              <>
                <Tag
                  text={`#${bonanzaThemes[0].type}`}
                  description={getDescriptionByTag(bonanzaThemes[0].type)}
                />{" "}
                and{" "}
                <Tag
                  text={`#${bonanzaThemes[1].type}`}
                  description={getDescriptionByTag(bonanzaThemes[1].type)}
                />
              </>
            ) : (
              <Tag
                text={`#${bonanzaThemes[0].type}`}
                description={getDescriptionByTag(bonanzaThemes[0].type)}
              />
            )}
            !
          </span>
        );
      }
    } else {
      if (!trendTheme) {
        return (
          <span>
            {account.nickName} will be filled with good luck and make a fortune
            with{" "}
            <Tag
              text={`#${bonanzaThemes[0].type}`}
              description={getDescriptionByTag(bonanzaThemes[0].type)}
            />{" "}
            and{" "}
            <Tag
              text={`#${bonanzaThemes[1].type}`}
              description={getDescriptionByTag(bonanzaThemes[1].type)}
            />
            !
          </span>
        );
      }

      return (
        <span>
          In 2023, {account.nickName} will be filled with good luck and make a
          fortune with{" "}
          <Tag
            text={`#${bonanzaThemes[0].type}`}
            description={getDescriptionByTag(bonanzaThemes[0].type)}
          />{" "}
          and{" "}
          <Tag
            text={`#${bonanzaThemes[1].type}`}
            description={getDescriptionByTag(bonanzaThemes[1].type)}
          />
          !
        </span>
      );
    }
  };

  const getTagParagraph = () => {
    const hasHighlights = topValues.length > 0;
    const fortune = getTrendTheme();
    const bonanza = getBonanzaTheme();

    let highlight;

    if (hasHighlights) {
      highlight = getHighlights();
    }

    return (
      <div className="relative z-10 leading-normal">
        <span>
          With <Tag text={`#${get(PlanetsMap, report.personalityPlanet)}`} /> as
          the ruling star,{" "}
        </span>
        {highlight} {fortune} {bonanza}
      </div>
    );
  };

  const handleChange = (account: Account) => {
    setAccount({ ...account, nickName: nickname });
    onAccountChange && onAccountChange({ ...account, nickName: nickname });
  };

  return (
    <div
      id={id}
      className="relative w-full h-[450px] rounded-lg border border-white bg-no-repeat bg-cover"
      style={{
        backgroundImage: isCurrentUser
          ? "url(/images/report/lucky-friends-card-bg1.jpg)"
          : "url(/images/report/lucky-friends-card-bg2.jpg)",
        ...style,
      }}
    >
      <div className="absolute left-3 w-[306px] h-[130px] overflow-hidden">
        <img
          src={`/images/report/planets/${report.personalityPlanet}.png`}
          className="absolute -top-[180px] z-0 w-[306px] object-cover"
          style={{
            top: ["saturn", "uranus"].includes(report.personalityPlanet)
              ? "-60px"
              : "-180px",
            maxWidth: report.personalityPlanet === "saturn" ? "110%" : "100%",
            width: report.personalityPlanet === "saturn" ? "110%" : "100%",
            height: report.personalityPlanet === "saturn" ? "140px" : "auto",
            left: report.personalityPlanet === "saturn" ? "-16px" : "0",
          }}
          alt="illustration"
        />
      </div>
      {isCurrentUser && showForYou && (
        <div className="absolute top-12 -right-5">
          <span className="triangle absolute top-2 -right-[18px] z-0" />
          <ForYouTag className="relative md:flex z-10" />
        </div>
      )}
      <div className="relative border-b border-white flex justify-center items-center h-8 overflow-hidden">
        <div
          className="absolute w-full h-full rounded-t-lg"
          style={{
            background:
              "linear-gradient(180deg, rgba(9, 8, 48, 0.47) 0%, rgba(217, 217, 217, 0) 100%)",
            backdropFilter: "blur(10px)",
          }}
        />
        <img
          src="/images/report/lucky-friends-logo.png"
          width="285px"
          alt="logo"
          className="absolute top-0"
        />
      </div>
      {isCurrentUser && (
        <p className="absolute w-full text-center p-1 text-xs">
          www.ascendant.fun/{account.code}
        </p>
      )}
      <div className="relative mt-6 px-5 flex items-center">
        <div
          className="relative rounded p-1 min-w-[106px] w-[106px] h-[106px] border-[1px] "
          style={{
            borderColor: "rgba(255, 255, 255, 0.3)",
            background:
              "linear-gradient(180deg, rgba(196, 91, 245, 0.35) 0%, rgba(255, 255, 255, 0) 100%)",
          }}
        >
          <img
            src={getUserAvatar(account.avatar)}
            alt={account.nickName ?? ""}
            className="w-full h-full object-cover"
          />
          {isCurrentUser && showUpload && (
            <label
              htmlFor="file"
              className="absolute top-2 left-2 inline-flex w-[22px] h-[22px] rounded-full bg-white justify-center items-center cursor-pointer appearance-none"
            >
              <input
                type="file"
                id="file"
                onChange={handleFile}
                accept="image/png, image/jpeg"
                className="absolute w-[22px] h-[22px] hidden"
              />
              <EditIcon width={10} height={10} />
            </label>
          )}
        </div>
        <div className="flex flex-col ml-4">
          <h1
            className="font-bold text-3xl max-w-[160px]"
            style={{ display: "-webkit-box", lineClamp: 2 }}
          >
            {getNickName(account.nickName)}
          </h1>
          {account.ens ? (
            <p className="truncate">@{account.ens}</p>
          ) : (
            <p>
              @
              {truncateStringInMiddle(account.publicAddress, 7, "******", 2, 4)}
            </p>
          )}
        </div>
      </div>
      <div
        className="relative mx-[10px] mt-4 p-2 rounded-t-lg"
        style={{ maxHeight: "140px" }}
      >
        <img
          src="/images/report/lucky-friends-tag-bg.png"
          alt="Tag"
          className="absolute top-0 left-0 w-full"
        />
        {getTagParagraph()}
      </div>
      <div className="grid grid-cols-3 w-full absolute bottom-0 rounded-b-lg overflow-hidden">
        <div
          className="h-[106px] flex flex-col items-center"
          style={{
            background:
              "linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(0, 0, 0, 0.57) 100%)",
          }}
        >
          <h1 className="text-3xl font-bold mt-4">{luckyMonth.month}.</h1>
          <p>2023</p>
          <div className="mt-1 text-sm">
            <span
              className="rounded px-[6px] py-[2px] border text-[10px]"
              style={{ borderColor: "rgb(221, 254, 21)" }}
            >
              LUCKY MONTH
            </span>
          </div>
        </div>
        <div
          className="h-[106px] flex flex-col items-center"
          style={{
            background:
              "linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(0, 0, 0, 0.57) 100%)",
          }}
        >
          <img src={luckyTokenImg} width={52} height={52} alt="lucky token" />
          <p className="font-bold">
            {luckyTokenName
              ? get(CoinMap, luckyTokenName, luckyTokenName)
              : "-"}
          </p>
          <div className="mt-1 text-sm">
            <span
              className="rounded px-[6px] py-[2px] border text-[10px]"
              style={{ borderColor: "rgb(221, 254, 21)" }}
            >
              LUCKY TOKEN
            </span>
          </div>
        </div>
        <div
          className="h-[106px] flex flex-col items-center"
          style={{
            background:
              "linear-gradient(180deg, rgba(255, 3, 3, 0) 0%, rgba(155, 13, 13, 0.56) 100%)",
          }}
        >
          <img
            src={unluckyTokenImg}
            width={52}
            height={52}
            alt="unlucky token"
          />
          <p className="font-bold">
            {unluckyTokenName
              ? get(CoinMap, unluckyTokenName, unluckyTokenName)
              : "-"}
          </p>
          <div className="mt-1 text-sm">
            <span
              className="rounded px-[6px] py-[2px] border text-[10px]"
              style={{ borderColor: "#D84B8B" }}
            >
              UNLUCKY TOKEN
            </span>
          </div>
        </div>
      </div>
      <CropImageModal
        image={image}
        isOpen={isOpen}
        publicAddress={account.publicAddress}
        onClose={() => setImage("")}
        onSuccess={handleChange}
      />
    </div>
  );
};

export default FriendCard;
