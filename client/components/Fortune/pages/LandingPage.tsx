/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import TextInput from "../../Base/TextInput";
import BaseButton from "../../Base/BaseButton";
import LocationInput, { LocationValues } from "../LocationInput";
import useBind, { Binder } from "../../../hooks/useBind";
import { InputError } from "../../../../types/base";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { SetStateAction } from "react";
import { TascSummary, UserReport } from "../../../../types/ApiClient";
import { ErrorModal } from "../../Base/ErrorModal";
import { isAddress } from "ethers/lib/utils.js";
import ExclamationIcon from "../../Base/icons/ExclamationIcon";
import SocialButton from "../SocialButton";
import { validSocialMedias } from "../../../hooks/useSocialMedia";
import RightArrow from "../../Base/icons/RightArrow";
import Link from "next/link";
import { useRouter } from "next/router";
import { getAddressFromEns } from "../../../api/BackendService";
import { event } from "nextjs-google-analytics";
import { Address, useAccount } from "wagmi";
import { Transition } from "@headlessui/react";
import { useBaseModal } from "../../Base/BaseModal";
import { BenefitsModal } from "../base/BenefitsModal";

type LandingPageProps = {
  nickName: Binder<string>;
  location: Binder<LocationValues>;
  setUserReport: (value: SetStateAction<UserReport | undefined>) => void;
  goToPage: (pageNumber: number) => Promise<void>;
  invitationCode?: string;
  walletAddress: Binder<string>;
  walletEns: Binder<string>;
  isErrorModalOpen: Binder<boolean>;
  isBenefitsModalOpen: Binder<boolean>;
  tAscSummary: Binder<TascSummary>;
};

type TrackTokenButtonProps = {
  isBenefitsModalOpen: Binder<boolean>;
  tAscSummary: Binder<TascSummary>;
};

type ValidateWalletAddressResult = {
  address: string | null;
  ens: string | null;
};

interface ValidateLocationResult {
  isValid: boolean;
  location: LocationValues | null;
}

interface SocialMediaTypes {
  name: validSocialMedias;
  text: string;
  href: string;
}

const socialMedias: SocialMediaTypes[] = [
  {
    name: "twitter",
    text: "twitter",
    href: "https://twitter.com/Ascendant_astro",
  },
  {
    name: "telegram",
    text: "telegram",
    href: "https://t.me/ascendant_astro",
  },
  {
    name: "medium",
    text: "medium",
    href: "https://medium.com/@Ascendant",
  },
];

function LandingPage({
  nickName,
  location,
  goToPage,
  walletAddress,
  walletEns,
  isErrorModalOpen,
  isBenefitsModalOpen,
  tAscSummary,
}: LandingPageProps) {
  const nickNameError = useBind<InputError>({
    isInvalid: false,
    errorMsg: "",
  });
  const locationError = useBind<InputError>({
    isInvalid: false,
    errorMsg: "",
  });

  const walletAddressError = useBind<InputError>({
    isInvalid: false,
    errorMsg: "",
  });
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [showBottomChart, setShowBottomChart] = useState(false);
  const rawWalletAddress = useBind<string>(
    walletEns.value ? walletEns.value : walletAddress.value
  );

  const { address } = useAccount();
  const [isAddressInputDisabled, setIsAddressInputDisabled] = useState(false);

  const isSwitchWalletModalOpen = useBaseModal(false);

  useEffect(() => {
    if (!address || address == rawWalletAddress.value) return;

    rawWalletAddress.setter(address);
  }, [address, rawWalletAddress]);

  useEffect(() => {
    if (!address) {
      setIsAddressInputDisabled(false);
      return;
    }

    setIsAddressInputDisabled(true);
  }, [address]);

  const goToAboutUsPage = () => {
    router.push("/about-us");
    event("about_us_clicked", {
      category: "FortuneReport",
      label: "about us button clicked",
    });
  };

  const isNicknameValid = (value: string) => {
    if (value === "") {
      nickNameError.setter({
        isInvalid: true,
        errorMsg: "Please enter a nickname",
      });

      return false;
    }

    // only letters
    if (!/^[A-Za-z0-9]*$/.test(value)) {
      nickNameError.setter({
        isInvalid: true,
        errorMsg: "Please enter only letters and numbers",
      });

      return false;
    }

    // less than 20
    if (value.length >= 20) {
      nickNameError.setter({
        isInvalid: true,
        errorMsg: "Nickname cannot be more than 20 characters",
      });

      return false;
    }

    nickNameError.setter({
      isInvalid: false,
      errorMsg: "",
    });
    return true;
  };

  function validateLocation(): ValidateLocationResult {
    // make sure either location or current location is set
    if (location.value.lat === null || location.value.long === null) {
      locationError.setter({
        isInvalid: true,
        errorMsg: "Please enter a location",
      });

      return {
        isValid: false,
        location: null,
      };
    }

    return {
      isValid: true,
      location: location.value,
    };
  }

  async function validateWalletAddress(): Promise<ValidateWalletAddressResult> {
    const initialResponse = {
      address: null,
      ens: null,
    } as ValidateWalletAddressResult;

    const rawAddress = rawWalletAddress.value;
    if (!rawAddress) {
      return initialResponse;
    }

    // check if it's a valid address
    if (isAddress(rawAddress)) {
      return {
        address: rawAddress,
        ens: null,
      };
    }

    // check if it's ending with ".eth"
    if (!rawAddress.endsWith(".eth")) {
      return initialResponse;
    }

    setIsLoading(true);
    // if it's not a address, we just assume it's a ens
    const addressFromEns = await getAddressFromEns(rawAddress);

    setIsLoading(false);
    if (!addressFromEns || addressFromEns.length === 0) {
      return initialResponse;
    }

    return {
      address: addressFromEns,
      ens: rawAddress,
    };
  }

  async function getReportHandler(): Promise<void> {
    let hasError = false;

    event("take_test", {
      category: "FortuneReport",
      label: "take test button clicked",
    });

    // reset the ens
    walletEns.setter("");

    // check nickname
    if (!isNicknameValid(nickName.value)) {
      hasError = true;
    }

    // check lat and long are set
    const locationValidation = validateLocation();
    if (!locationValidation.isValid) {
      hasError = true;
    }

    if (hasError) return;
    if (locationValidation.location === null) return;

    // if there is no error, then we validate the address
    const validateAddressResult = await validateWalletAddress();
    if (!validateAddressResult.address) {
      toast.error("Please enter a valid wallet address or ENS");

      return;
    }

    // it's safe to set the wallet address here
    walletAddress.setter(validateAddressResult.address);

    // set the ens too if we have it
    if (validateAddressResult.ens) {
      walletEns.setter(validateAddressResult.ens);
    }

    // get data and go to the report page
    goToPage(2);
  }

  return (
    <div className="min-h-screen relative bg-no-repeat pb-16 bg-cover flex flex-col">
      <BenefitsModal isOpen={isBenefitsModalOpen} tAscSummary={tAscSummary} />
      <div className="absolute top-[10%] right-0 md:hidden z-30">
        <TrackTokenButton
          isBenefitsModalOpen={isBenefitsModalOpen}
          tAscSummary={tAscSummary}
        />
      </div>
      <div className="mx-auto w-full max-w-[475px] pt-8 relative">
        <img
          className="w-full relative z-0 px-4"
          src="/assets/logo.svg"
          alt="Logo"
        />
      </div>
      <img
        className="absolute z-10 px-4 md:px-0 top-14 left-1/2 md:top-1/2 -translate-x-1/2 md:-translate-y-[50%] lg:-translate-y-[45%] xl:-translate-y-[50%] 2xl:-translate-y-[45%] md:w-[600px] lg:w-[700px] 2xl:w-[780px]"
        src="/images/report/landing-ball.png"
        alt="ball"
      />
      <img
        className="absolute md:hidden z-0 px-2 top-24 left-0 w-screen"
        src="/images/report/landing-space-mobile.svg"
        alt="stars"
        loading="lazy"
      />
      <img
        className="absolute hidden md:block z-0 top-32 left-0 w-screen"
        src="/images/report/landing-space.svg"
        alt="stars"
        loading="lazy"
      />
      <div className="relative z-20 mx-6 pt-20 md:mt-0 md:pt-16 2xl:pt-20">
        <div className="absolute top-12 right-1/3 md:translate-x-[90%] xl:translate-x-[60%] hidden md:block z-30">
          <TrackTokenButton
            isBenefitsModalOpen={isBenefitsModalOpen}
            tAscSummary={tAscSummary}
          />
        </div>
        <p className="text-center text-secondary font-michroma text-[18px] md:text-[26px]">
          2023
        </p>
        <h1 className="text-secondary mx-auto font-michroma text-[26px] leading-[32px] text-center lg:text-[60px] lg:leading-[60px] 2xl:text-[70px] 2xl:leading-[72px]">
          Ascendant Fortune <br />
          <span className="text-[22px] lg:text-[60px]">
            based on wallet address
          </span>
        </h1>
        <p className="text-[12px] px-0 md:px-2 mt-2 md:mt-4 leading-[16px] md:text-[18px] xl:text-[23px] xl:leading-[26px] text-center max-w-2l mx-auto">
          On-chain astrology to fully unlock your <strong>2023 Fortune</strong>
          <br />
          FreeMint blessing SBT for extra luck!
        </p>
        <div className="max-w-lg mx-auto p-1 mt-12 md:mt-4 2xl:mt-8 md:border md:border-white/30 md:bg-gradient-radial md:backdrop-blur-lg md:rounded-md">
          <div className="flex flex-col gap-y-1 md:gap-y-2 md:px-12 md:py-5 2xl:py-8 md:border md:border-white/30 md:bg-gradient-radial md:backdrop-blur-lg md:rounded-md">
            <TextInput
              placeholder="Enter Your Nickname"
              name="nickname"
              value={nickName}
              error={nickNameError}
              label="Nickname"
              validationHandler={isNicknameValid}
            />
            <div>
              <LocationInput location={location} error={locationError} />
              <p className="text-[10px] mt-1 flex leading-3 md:text-[12px] md:leading-normal text-white/60">
                <ExclamationIcon classes="fill-white/60 w-3 h-3 mr-1 my-auto" />
                Enter your own physical location
              </p>
            </div>
            <div>
              <TextInput
                placeholder="Enter Wallet Address or ENS"
                name="address"
                value={rawWalletAddress}
                error={walletAddressError}
                label="Wallet Address"
                disabled={isAddressInputDisabled}
                title={
                  isAddressInputDisabled
                    ? "Disconnect your wallet in “Track tASC” to switch address"
                    : "Wallet Address"
                }
              />
              {isAddressInputDisabled && (
                <button
                  className=" text-primary border-b border-b-primary text-[10px] mt-1 flex leading-3 md:text-[12px] md:leading-3 px-1 pt-1"
                  onClick={() => isSwitchWalletModalOpen.setter(true)}
                >
                  Wanna switch wallet address?
                </button>
              )}
              {rawWalletAddress.value && walletAddressError.value.isInvalid && (
                <p className="text-red-300 text-[13px] px-1 pt-1 md:text-[15px]">
                  Please check for space or extra digits in the wallet address
                </p>
              )}
              <p className="text-[10px] mt-1 flex leading-3 md:text-[12px] md:leading-normal text-white/60">
                <ExclamationIcon classes="fill-white/60 w-3 h-3 mr-1 my-auto" />
                The wallet address must have transactions on Ethereum to be
                evaluated
              </p>
            </div>
            <div className="relative z-10 mx-auto w-full md:max-w-[212px] flex flex-col space-y-2 justify-center mt-4 2xl:mt-6">
              <BaseButton
                style="white"
                isLoading={isLoading}
                loadingText={"Generating..."}
                fullWidth={true}
                onClickHandler={getReportHandler}
              >
                Generate Report
              </BaseButton>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-4 pt-2 px-8 flex justify-between md:hidden">
        <div className="space-x-1">
          <Link
            href="/about-us"
            className="rounded-[4px] border border-white/30 px-4 py-2 font-bold text-xs"
            onClick={() => {
              event("about_us_clicked", {
                category: "FortuneReport",
                label: "about us button clicked",
              });
            }}
          >
            About Us
          </Link>
        </div>
        <div className="flex space-x-2">
          {socialMedias.map((socialMedia, index) => (
            <SocialButton
              key={index}
              name={socialMedia.name}
              text={socialMedia.text}
              href={socialMedia.href}
            />
          ))}
        </div>
      </div>
      <div className="hidden md:block transition-all absolute z-50 left-0 bottom-0 translate-y-[70%] group-social -translate-x-[60%] hover:translate-y-[60%] hover:-translate-x-1/2">
        <div
          className="bg-black border-[1px] border-secondary/70 transition-all rounded-full group-social-hover:blur-[50px] w-[412px] h-[412px] group-social-hover:w-[645px] group-social-hover:h-[645px]"
          style={{
            // border: '1px solid rgba(255, 255, 255, 0.28)',
            boxShadow: "inset 0px 0px 60px #4BB6D8",
          }}
        >
          <div className="relative w-full h-full z-10">
            <div className="absolute text-white right-[15%] top-[15%]">
              <div className="">
                <RightArrow
                  extraClasses="fill-white/50 -rotate-45 ml-4"
                  width={24}
                  height={28}
                />
                <label className="font-bold text-[15px]">Contact Us</label>
              </div>
            </div>
          </div>
        </div>
        <div className="z-20 absolute right-[30%] py-2 top-[16%] hidden transition-all group-social-hover:flex flex-col space-y-3">
          {socialMedias.map((socialMedia, index) => (
            <div key={index} className="flex space-x-4">
              <SocialButton
                key={index}
                name={socialMedia.name}
                text={socialMedia.text}
                href={socialMedia.href}
                showLabel={true}
              />
            </div>
          ))}
        </div>
      </div>
      <div
        className="hidden md:block z-50 transition-all absolute right-0 bottom-0 translate-y-[70%] group-social translate-x-[60%] cursor-pointer"
        onMouseEnter={() => setShowBottomChart(true)}
        onMouseLeave={() => setShowBottomChart(false)}
      >
        <div
          className="bg-black border-[1px] border-secondary/70 transition-all rounded-full group-social-hover:bg-white w-[412px] h-[412px]"
          style={{
            // border: '1px solid rgba(255, 255, 255, 0.28)',
            boxShadow: "inset 0px 0px 60px #4BB6D8",
          }}
        >
          <div
            className="relative w-full h-full z-10"
            onClick={goToAboutUsPage}
          >
            <div className="absolute text-white left-[20%] top-[15%]">
              <div>
                <RightArrow
                  extraClasses="fill-white/50 group-social-hover:fill-[#161515]/50 rotate-[225deg] ml-4"
                  width={24}
                  height={28}
                />
                <label className="font-bold text-[15px] group-social-hover:text-black">
                  About Us
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Transition
        appear={false}
        show={showBottomChart}
        enter="transition-all ease-in-out duration-500"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition ease-in-out duration-200"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <img
          className="absolute z-0 bottom-0 right-0 w-[300px] opacity-50 hidden md:block"
          src="/images/report/landing-chart.png"
          alt="chart"
        />
      </Transition>
      <ErrorModal isOpen={isErrorModalOpen}>
        <Image
          src="/assets/cake.svg"
          width="80"
          height="80"
          alt="cake icon"
          className="mx-auto"
        />
        <div className="text-center text-white/60 px-2 mt-2">
          <h3 className="text-lg font-bold uppercase">Wallet Bday Not Found</h3>
          <p className="mt-4">
            Please use a wallet with Ethereum transaction, which marks the
            official start of your relationship.
          </p>
        </div>
      </ErrorModal>
      <ErrorModal isOpen={isSwitchWalletModalOpen}>
        <div className="text-center text-white/60 px-2 mt-2">
          <p className="mt-3">
            {`If you can't switch your wallet address here, it means you have already connected your wallet through "Track tASC" feature in the upper right corner of the landing page. Please disconnect or switch your wallet there to proceed.`}
          </p>
        </div>
      </ErrorModal>
      <footer className="absolute w-full bottom-3 md:bottom-6 text-center z-10 pt-12">
        <p className="font-circular uppercase text-[11px] md:text-xs">
          Copyright © 2023 -- AScendant.fun, all rights reserved
        </p>
        <p className="font-circular uppercase text-[11px] md:text-xs">
          Nothing in the site constitutes professional / financial advice.
        </p>
      </footer>
      {/* Preload loading image */}
      <Image
        className="hidden"
        src="/images/loading/chart-1.png"
        width="0"
        height="0"
        sizes="100vw"
        alt="chart"
        priority={true}
      />
      <Image
        className="hidden"
        src="/images/loading/chart-2-pc.png"
        width="0"
        height="0"
        sizes="100vw"
        alt="chart"
        priority={true}
      />
      <Image
        className="hidden"
        src="/images/loading/chart-2-mobile.png"
        width="0"
        height="0"
        sizes="100vw"
        alt="chart"
        priority={true}
      />
      <Image
        className="hidden"
        src="/images/loading/chart-3-pc.png"
        width="0"
        height="0"
        sizes="100vw"
        alt="chart"
        priority={true}
      />
      <Image
        className="hidden"
        src="/images/loading/chart-3-mobile.png"
        width="0"
        height="0"
        sizes="100vw"
        alt="chart"
        priority={true}
      />
    </div>
  );
}

function TrackTokenButton({
  isBenefitsModalOpen,
  tAscSummary,
}: TrackTokenButtonProps) {
  return (
    <button
      className={`bg-black border-[1px] border-secondary/50 transition-all flex space-x-2 rounded-l-[999px] md:rounded-r-[999px] pl-4 pr-8 ${
        tAscSummary.value.totalScore === null
          ? "py-2 translate-x-4 md:py-4 md:px-[24px]"
          : "py-1 translate-x-6 md:py-3 md:px-[20px]"
      } md:translate-x-0 font-bold hover:bg-black/70`}
      onClick={() => isBenefitsModalOpen.setter(true)}
      style={{
        // border: '1px solid rgba(255, 255, 255, 0.28)',
        boxShadow: "inset 0px 0px 20px rgba(75, 182, 216, 0.88)",
      }}
    >
      <svg
        className="my-auto w-[17px] h-[15px] md:w-[27px] md:h-[24px]"
        viewBox="0 0 27 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M18.439 11.3334C18.0109 11.3334 17.5501 11.3334 17.122 11.3667V3.33333H17.089C17.122 3.23329 17.122 3.10005 17.122 3C17.122 0.933389 12.6768 0 8.56098 0C4.44512 0 0 0.933389 0 3C0 3.10005 9.68575e-08 3.23329 0.032905 3.33333H0V16.3333C0 18.3999 4.44512 19.3333 8.56098 19.3333C8.98908 19.3333 9.44995 19.3333 9.87805 19.3V21C9.87805 23.0666 14.3232 24 18.439 24C22.5549 24 27 23.0666 27 21V14.3333C27 12.2667 22.5549 11.3334 18.439 11.3334ZM15.5744 11.5C15.6732 11.4667 15.739 11.4334 15.8048 11.3667V11.4667C15.739 11.4667 15.6402 11.4667 15.5744 11.5ZM8.56098 1.33336C13.2695 1.33336 15.8049 2.50002 15.8049 3.00002C15.8049 3.50002 13.2696 4.66669 8.56098 4.66669C3.85238 4.66669 1.31707 3.50002 1.31707 3.00002C1.31707 2.50002 3.85238 1.33336 8.56098 1.33336ZM1.31707 4.70002C2.93052 5.59997 5.82805 6.00005 8.56098 6.00005C11.2939 6.00005 14.1915 5.60011 15.8049 4.70002V6.33338C15.8049 6.83338 13.2696 8.00005 8.56098 8.00005C3.85238 8.00005 1.31707 6.83338 1.31707 6.33338V4.70002ZM1.31707 8.03336C2.93052 8.9333 5.82805 9.33339 8.56098 9.33339C11.2939 9.33339 14.1915 8.93344 15.8049 8.03336V9.66672C15.8049 10.1667 13.2696 11.3334 8.56098 11.3334C3.85238 11.3334 1.31707 10.1667 1.31707 9.66672V8.03336ZM1.31707 11.3667C2.93052 12.2666 5.82805 12.6667 8.56098 12.6667C9.51588 12.6667 10.5037 12.6001 11.4256 12.5001C10.4708 12.9667 9.8781 13.5667 9.8781 14.3334V14.6334C9.45 14.6667 8.98913 14.6667 8.56103 14.6667C3.85249 14.6667 1.31713 13.5001 1.31713 13.0001L1.31707 11.3667ZM8.56098 18C3.85244 18 1.31707 16.8334 1.31707 16.3334V14.7C2.93052 15.5999 5.82805 16 8.56098 16C8.98908 16 9.44995 16 9.87805 15.9667V17.9667C9.44995 18 8.98908 18 8.56098 18ZM18.439 22.6667C13.7305 22.6667 11.1951 21.5 11.1951 21V19.3667C12.8086 20.2666 15.7061 20.6667 18.439 20.6667C21.172 20.6667 24.0695 20.2667 25.6829 19.3667V21C25.6829 21.5 23.1476 22.6667 18.439 22.6667ZM18.439 19.3334C13.7305 19.3334 11.1951 18.1667 11.1951 17.6667V16.0333C12.8086 16.9333 15.7061 17.3334 18.439 17.3334C21.172 17.3334 24.0695 16.9334 25.6829 16.0333V17.6667C25.6829 18.1667 23.1476 19.3334 18.439 19.3334ZM18.439 16C13.7305 16 11.1951 14.8334 11.1951 14.3334C11.1951 13.8334 13.7304 12.6667 18.439 12.6667C23.1476 12.6667 25.6829 13.8334 25.6829 14.3334C25.6829 14.8334 23.1476 16 18.439 16Z"
          fill="#DDFE15"
        />
      </svg>
      <label className="text-[13px] leading-[15px] my-auto md:text-[15px] md:leading-[18px]">
        {tAscSummary.value.totalScore === null ? "Track tASC" : "Your tASC"}
      </label>
      {tAscSummary.value.totalScore !== null && (
        <div className="h-[24px] md:h-[32px] rounded-full flex bg-secondary text-black px-2 md:px-2">
          <span className="m-auto text-[13px] leading-[15px] md:text-[15px] md:leading-[18px]">
            {tAscSummary.value.totalScore}
          </span>
        </div>
      )}
    </button>
  );
}

export default LandingPage;
