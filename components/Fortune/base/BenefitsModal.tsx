import { Fragment, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { Binder } from "../../../hooks/useBind";
import Image from "next/image";
import { ClaimStatus } from "../FortuneResult";
import { Address, useAccount, chain as allChains } from "wagmi";
import WalletConnect from "../WalletConnect";
import { truncateStringInMiddle } from "../../../utils/truncateString";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { CONTRACT_NETWORK, MAINNET } from "../../../config";
import Link from "next/link";
import APIClient from "../../../api/APIClient";
import { TascSummary } from "../../../types/ApiClient";
import { toast } from "react-toastify";

interface BenefitsModalProps {
  isOpen: Binder<boolean>;
  claimStatus?: Binder<ClaimStatus>;
  tAscSummary: Binder<TascSummary>;
  targetAddress?: string;
}

type WalletInfoProps = {
  address: Address;
};

const apiClient = new APIClient();

export function BenefitsModal({
  isOpen,
  claimStatus,
  tAscSummary,
  targetAddress,
}: BenefitsModalProps) {
  const { value: open, setter: setOpen } = isOpen;
  const { address } = useAccount();

  const isReportGenerated =
    tAscSummary.value.reportScore !== null && tAscSummary.value.reportScore > 0;
  const isSBTClaimed =
    tAscSummary.value.sbtScore !== null && tAscSummary.value.sbtScore > 0;

  useEffect(() => {
    // function istAscSummaryDataReady() {
    //     if (tAscSummary.value.reportScore === null || tAscSummary.value.sbtScore === null) return false;

    //     return true;
    // }

    if (
      !address ||
      !isOpen.value ||
      (targetAddress !== undefined && address !== targetAddress)
    )
      return;

    async function getTascSummary() {
      if (address === undefined) return;

      try {
        const summary = await apiClient.getTascSummary(address.toString());

        tAscSummary.setter(summary);
      } catch (err) {
        console.error(err);
        toast.error("Failed to get tASC Summary");
      }
    }

    getTascSummary();
  }, [address, isOpen.value]);

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-neutral-800 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full justify-center text-center items-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel
                className={`relative max-h-[500px] md:max-h-fit overflow-y-scroll mt-0 transform mx-4 text-left shadow-xl overflow-hidden transition-all w-full sm:my-8 sm:w-full rounded-xl md:max-w-[750px] bg-cover bg-no-repeat bg-[url('/images/report/info-modal-mobile-bg.jpg')] md:bg-[url('/images/report/benefits-modal-bg.jpg')] md:scale-[85%] xl:scale-[90%] 3xl:scale-100`}
              >
                {/* <div className="absolute z-0 bottom-0 right-3 w-[58px] translate-y-1/2 md:hidden">
                                    <Image
                                        className="w-full h-auto"
                                        src="/images/about-us/ball-2.png"
                                        alt="chart"
                                        width="0"
                                        height="0"
                                        sizes="100vw"
                                    />
                                </div> */}
                <div className="absolute z-[110] top-0 right-0 pt-3 pr-3">
                  <button
                    type="button"
                    className="rounded-md text-white transition transform hover:scale-110 hover:text-gray-300 focus:outline-none"
                    onClick={() => setOpen(false)}
                  >
                    <span className="sr-only">Close</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>
                <div className="relative overflow-hidden px-4 md:px-6 py-3 rounded-xl">
                  <div className="absolute z-0 top-0 left-0 w-[269px] -translate-x-[30%] -translate-y-[35%] md:-translate-y-[50%]">
                    <Image
                      className="w-full h-auto"
                      src="/images/about-us/ball.png"
                      alt="chart"
                      width="0"
                      height="0"
                      sizes="100vw"
                    />
                  </div>
                  <div className="pb-4 md:py-4 relative z-20 flex flex-col">
                    <Dialog.Title
                      className={`flex relative z-50 justify-center text-[24px] leading-[24px] md:text-[38px] md:leading-[24px] font-bold text-white text-center mt-8 md:mt-5 ${
                        address ? "" : "invisible"
                      }`}
                    >
                      <div className="w-[190px] md:w-[240px] my-auto">
                        <Image
                          className="w-full relative z-0 px-4"
                          src="/assets/logo.svg"
                          alt="Logo"
                          width={0}
                          height={0}
                          sizes="100vw"
                        />
                      </div>
                    </Dialog.Title>
                    {(!address ||
                      (targetAddress !== undefined &&
                        address !== targetAddress)) && (
                      <>
                        <div className="w-[190px] md:w-[240px] my-auto absolute z-[110] top-10 left-1/2 -translate-x-1/2">
                          <Image
                            className="w-full relative"
                            src="/assets/logo.svg"
                            alt="Logo"
                            width={0}
                            height={0}
                            sizes="100vw"
                          />
                        </div>
                        <div className="w-full h-full flex absolute inset-0 z-[100] backdrop-blur-md bg-black/5 rounded-md scale-105">
                          <div className="m-auto">
                            {!address ? (
                              <div className="text-[24px] px-4 md:text-[40px] md:leading-[42px] font-bold max-w-md text-center">
                                Connect your wallet to reveal your tASC
                              </div>
                            ) : (
                              <div className="text-[20px] px-4 md:text-[30px] md:leading-[35px] font-bold max-w-md text-center">
                                Please use the same wallet address you generate
                                this report for
                              </div>
                            )}

                            <div className="mt-8 max-w-[240px] mx-auto">
                              <WalletConnect connectLabel="Connect My Wallet" />
                            </div>
                          </div>
                        </div>
                      </>
                    )}
                    <div className="flex justify-between mt-5 mb-6 md:mt-2 md:mb-10">
                      {address && (
                        <div className="my-auto">
                          <WalletInfo address={address} />
                        </div>
                      )}
                      <div className="flex space-x-3">
                        <div className="text-secondary font-bold text-[14px] md:text-[16px] leading-[24px] my-auto">
                          Total tASC:
                        </div>
                        <div className="rounded-lg border font-bold px-3 py-[2px] md:py-3 border-white bg-black/40 text-[24px] leading-[42px] md:text-[62px] md:leading-[42px]">
                          {tAscSummary.value.totalScore ?? 0}
                        </div>
                      </div>
                    </div>
                    <div className="rounded-lg relative bg-black/20 px-2 pt-1 pb-2 md:pt-4 md:pb-4 md:px-4 text-[12px] leading-[16px] md:text-[16px]">
                      <div
                        className="absolute top-0 left-2 md:left-4 font-bold -translate-y-[50%] py-[2px] px-2 md:px-4 md:py-[10px] rounded-[4px] md:rounded-lg border border-primary text-[12px] leading-[24px] md:text-[18px]"
                        style={{
                          background:
                            "linear-gradient(180deg, rgba(221, 254, 21, 0.26) 0%, rgba(255, 255, 255, 0) 100%)",
                        }}
                      >
                        2023 Ascendant Fortune Report
                      </div>
                      <div className="text-right border-b border-b-white/20 py-1">
                        Your tASC
                      </div>
                      <div className="border-b border-b-white/20 flex justify-between py-2 md:py-[10px]">
                        <div>
                          Generate 2023 fortune report{" "}
                          <span className="font-bold">(+20)</span>
                        </div>
                        <div
                          className={`flex space-x-5 ${
                            isReportGenerated ? "text-primary" : "text-danger"
                          }`}
                        >
                          {isReportGenerated ? (
                            <span>Completed</span>
                          ) : (
                            <span>To Be Completed</span>
                          )}
                          <span>+{tAscSummary.value.reportScore ?? 0}</span>
                        </div>
                      </div>
                      <div className="border-b border-b-white/20 flex justify-between py-2 md:py-[10px]">
                        <div>
                          Claim 2023 blessing SBT{" "}
                          <span className="font-bold">(+100)</span>
                        </div>
                        <div
                          className={`flex space-x-5 ${
                            isSBTClaimed ? "text-primary" : "text-danger"
                          }`}
                        >
                          {isSBTClaimed ? (
                            <span>Completed</span>
                          ) : (
                            <span>To Be Completed</span>
                          )}
                          <span>+{tAscSummary.value.sbtScore ?? 0}</span>
                        </div>
                      </div>
                      <div className="border-b border-b-white/20 flex justify-between py-2 md:py-[10px]">
                        <div>
                          Invite friends to participate
                          <br className="md:hidden" />
                          <span className="font-bold"> (+50/invitee)</span>
                          <div className="hidden md:block text-[12px] leading-[12px] mt-2 max-w-[300px]">
                            Qualified invitees need to generate their own
                            reports and claim sbt via your link
                          </div>
                        </div>
                        <div
                          className={`flex space-x-5 ${
                            tAscSummary.value.inviteSbtCount > 0
                              ? "text-primary"
                              : "text-danger"
                          }`}
                        >
                          {tAscSummary.value.inviteSbtCount === 0 ? (
                            <span># of invitee: 0</span>
                          ) : (
                            <span>
                              # of invitee: {tAscSummary.value.inviteSbtCount}
                            </span>
                          )}
                          {<span>+{tAscSummary.value.inviteSbtScore}</span>}
                        </div>
                      </div>
                      <div className="flex justify-between py-2 md:py-[10px]">
                        <div>
                          Community lucky draw
                          <span className="font-bold">(+200/winning)</span>
                        </div>
                        <div
                          className={`flex space-x-5 ${
                            tAscSummary.value.communityLuckyDrawScore > 0
                              ? "text-primary"
                              : "text-danger"
                          }`}
                        >
                          {tAscSummary.value.communityLuckyDrawScore === 0 ? (
                            <span># of Winning: 0</span>
                          ) : (
                            <span># of Winning: 1</span>
                          )}
                          <span>
                            +{tAscSummary.value.communityLuckyDrawScore ?? 0}
                          </span>
                        </div>
                      </div>
                    </div>
                    {/* <div className="flex mt-5 md:mt-3 space-x-4 font-bold px-2 md:px-4">
                                            <div className="rounded-lg px-2 py-[3px] md:px-3 md:py-2 border border-white/30 backdrop-blur-[10px] text-[12px] leading-[24px] md:text-[18px] opacity-60"
                                                style={{
                                                    background: 'linear-gradient(180deg, rgba(221, 254, 21, 0.12) 0%, rgba(255, 255, 255, 0) 100%)'
                                                }}
                                            >
                                                AI Astrology Reading
                                            </div>
                                            <div className="text-[12px] leading-[24px] md:text-[18px] my-auto">
                                                To Be Launched
                                            </div>
                                        </div>
                                        <div className="mt-6 flex space-x-2 md:mt-8">
                                            <svg width="16" height="13" viewBox="0 0 16 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M15.0346 12.0077C15.2039 11.7077 15.2886 11.3674 15.2797 11.0231C15.2709 10.6788 15.1687 10.3433 14.9842 10.0524L9.27241 0.906082C8.92038 0.342457 8.30277 0 7.63825 0C6.97374 0 6.35613 0.342457 6.0041 0.906082L0.292664 10.0524C0.0486148 10.443 -0.0473777 10.9082 0.0219836 11.3636C0.0914255 11.819 0.321693 12.2344 0.671103 12.5346C1.02044 12.8348 1.46586 12.9999 1.92647 12.9999H13.3497C13.694 13.0026 14.0327 12.9116 14.3294 12.7368C14.6261 12.5621 14.8699 12.3101 15.0346 12.0077ZM13.9107 11.3847C13.8561 11.4858 13.775 11.5701 13.676 11.6284C13.577 11.6867 13.4639 11.7168 13.349 11.7155H1.92651C1.77291 11.7157 1.62427 11.6609 1.50758 11.5609C1.39091 11.4609 1.3139 11.3225 1.29063 11.1706C1.26735 11.0187 1.29926 10.8635 1.38061 10.7331L7.09239 1.58686C7.20973 1.39893 7.41565 1.28474 7.63716 1.28474C7.85874 1.28474 8.06464 1.39893 8.18193 1.58686L13.8946 10.7331C13.9566 10.8299 13.9909 10.9417 13.9938 11.0566C13.9968 11.1715 13.9682 11.2849 13.9113 11.3847L13.9107 11.3847Z" fill="white" />
                                                <path d="M8.44055 9.5506C8.44055 9.99394 8.0811 10.3534 7.63775 10.3534C7.19441 10.3534 6.83496 9.99394 6.83496 9.5506C6.83496 9.10725 7.19441 8.7478 7.63775 8.7478C8.0811 8.7478 8.44055 9.10725 8.44055 9.5506Z" fill="white" />
                                                <path d="M7.63735 8.10539C7.80768 8.10539 7.97104 8.03775 8.09147 7.91727C8.21196 7.79685 8.27959 7.63349 8.27959 7.46315V4.89421C8.27959 4.66475 8.15716 4.45275 7.95847 4.338C7.75977 4.22327 7.51493 4.22327 7.31623 4.338C7.11754 4.45273 6.99512 4.66474 6.99512 4.89421V7.46315C6.99512 7.63348 7.06275 7.79684 7.18323 7.91727C7.30365 8.03776 7.46701 8.10539 7.63735 8.10539Z" fill="white" />
                                            </svg>
                                            <div className="text-[13px] leading-[14px] md:text-[14px] pr-20">
                                                Please expect a 10min lag for all stats regarding your benefits
                                            </div>
                                        </div> */}
                  </div>
                  <BenefitsInfo />
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}

function WalletInfo({ address }: WalletInfoProps) {
  const formattedAddress = truncateStringInMiddle(address, 6, "******", 2, 4);
  const targetChain =
    CONTRACT_NETWORK === MAINNET ? allChains.mainnet : allChains.goerli;

  return (
    <div className="flex space-x-1 bg-black/40 backdrop-blur-sm rounded-md md:bg-transparent md:backdrop-blur-0 md:rounded-none">
      <div className="md:bg-black/40 md:backdrop-blur-sm md:rounded-md font-bold text-[14px] md:text-[16px] leading-[24px] pl-5 pr-0 md:px-5 py-2">
        {formattedAddress}
      </div>
      <ConnectButton.Custom>
        {({ chain, openAccountModal, openChainModal }) => {
          return (
            <button
              className="my-auto transition md:bg-black/40 md:hover:bg-black/70 md:backdrop-blur-sm rounded-md border border-white px-3 md:px-[14px] py-3"
              onClick={() => {
                // wrong network
                if (targetChain.id !== chain?.id) {
                  openChainModal();
                  return;
                }

                openAccountModal();
              }}
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M13.2454 2.20019L10.0005 0.120487C9.76453 -0.0270096 9.4548 -0.041747 9.20402 0.0910076C8.9533 0.223767 8.8058 0.489225 8.8058 0.769481V1.99373L4.43989 1.99368C2.12419 1.99368 0.250977 3.88164 0.250977 6.1826V7.15606C0.250977 7.62803 0.634456 8.01157 1.10648 8.01157C1.57845 8.01157 1.96199 7.62809 1.96199 7.15606V6.1826C1.96199 4.81087 3.08295 3.6899 4.45469 3.6899H8.8206L8.82055 4.94362C8.82055 5.22388 8.96805 5.48934 9.21877 5.6221C9.33679 5.6811 9.46949 5.71058 9.58751 5.71058C9.73501 5.71058 9.8825 5.66632 10.0005 5.59257L13.2455 3.51286C13.4667 3.36536 13.5995 3.12938 13.5995 2.86386C13.5995 2.59839 13.4667 2.34767 13.2455 2.20017L13.2454 2.20019Z"
                  fill="#DDFE15"
                />
                <path
                  d="M12.5078 5.99097C12.0358 5.99097 11.6523 6.37445 11.6523 6.84647V7.81994C11.6523 9.19166 10.5313 10.3126 9.15956 10.3126H4.79365V9.07366C4.79365 8.79341 4.64615 8.52795 4.39543 8.39519C4.14471 8.26243 3.84972 8.26243 3.59894 8.42467L0.354005 10.5044C0.13276 10.6519 0 10.8879 0 11.1534C0 11.4189 0.13276 11.6696 0.354005 11.8024L3.59894 13.8821C3.7317 13.9706 3.86446 14.0001 4.01195 14.0001C4.14471 14.0001 4.26267 13.9706 4.3807 13.9116C4.63142 13.7789 4.77891 13.5134 4.77891 13.2331V12.0089H9.15957C11.4753 12.0089 13.3485 10.1209 13.3485 7.81998V6.84651C13.3485 6.37449 12.965 5.991 12.5077 5.991L12.5078 5.99097Z"
                  fill="#DDFE15"
                />
              </svg>
            </button>
          );
        }}
      </ConnectButton.Custom>
    </div>
  );
}

function BenefitsInfo() {
  return (
    <div className="px-1 md:px-2 md:py-4 relative z-20">
      <div className="mt-6 md:mt-8 flex flex-col">
        <div className="w-[90px] md:w-[125px] text-center font-bold -translate-y-[50%] py-[2px] px-2 md:px-4 md:py-[5px] rounded-[4px] md:rounded-lg border border-primary text-[12px] leading-[24px] md:text-[16px]">
          About tASC
        </div>
        <p className="text-[14px] leading-[16px] md:text-[16px] md:leading-[20px]">
          Ascendant early adopters and SBT holders receive lucky points tASC and
          exclusive benefits
        </p>
        <div className="mt-3 pb-5 space-y-4 md:space-y-3 border-b border-b-white/20 md:mt-6">
          <div className="gap-x-2 flex">
            <div className="rounded-full aspect-square border text-primary text-[14px] font-bold leading-[14px] flex border-primary w-[22px] h-[22px] md:w-[26px] md:h-[26px] md:text-[16px] md:leading-[24px]">
              <span className="m-auto">1</span>
            </div>
            <div className="text-[16px] leading-[18px] md:text-[16px] md:leading-[20px]">
              <label className="text-primary font-bold">
                Early Product Adoption:{" "}
              </label>
              beta products will be open to early adopters, learn more about our
              products&nbsp;
              <Link
                className="text-primary border-b border-b-primary"
                href={"/about-us"}
                target="_blank"
              >
                here
              </Link>
            </div>
          </div>
          <div className="gap-x-2 flex">
            <div className="rounded-full aspect-square border text-primary text-[14px] font-bold leading-[14px] flex border-primary w-[22px] h-[22px] md:w-[26px] md:h-[26px] md:text-[16px] md:leading-[24px]">
              <span className="m-auto">2</span>
            </div>
            <div className="text-[16px] leading-[18px] md:text-[16px] md:leading-[20px]">
              <label className="text-primary font-bold">Cosmic Pass: </label>
              whitelist for Ascendant NFT with access to the whole ecosystem
            </div>
          </div>
          <div className="gap-x-2 flex">
            <div className="rounded-full aspect-square border text-primary text-[14px] font-bold leading-[14px] flex border-primary w-[22px] h-[22px] md:w-[26px] md:h-[26px] md:text-[16px] md:leading-[24px]">
              <span className="m-auto">3</span>
            </div>
            <div className="text-[16px] leading-[18px] md:text-[16px] md:leading-[20px]">
              <label className="text-primary font-bold">Official Token: </label>
              exchange to official token in the future
            </div>
          </div>
          <div className="mt-2 md:mt-4 text-[16px] leading-[18px] md:text-[12px] md:leading-[20px] opacity-80">
            * Early participants and users with more points will be more
            weighted
          </div>
        </div>
      </div>
      <div className="mt-5 flex flex-col relative">
        <div className="absolute hidden md:block z-0 top-0 right-0 translate-x-1/2 -translate-y-[60%] w-[114px]">
          <Image
            className="w-full h-auto"
            src="/images/about-us/ball.png"
            alt="chart"
            width="0"
            height="0"
            sizes="100vw"
          />
        </div>
        <label className="text-[18px] leading-[16px] font-bold md:text-[20px] md:leading-[24px] text-center">
          Simple Rules to get tASC
        </label>
        <p className="mt-2 font-bold text-primary text-[16px] leading-[20px] text-center">
          !! Double incentive from&nbsp;
          <span className="border-b border-b-primary">March 29th 9am EST</span>
          &nbsp;to&nbsp;
          <span className="border-b border-b-primary">April 4th 9am EST</span>
          {' '}!!
        </p>
        <div className="mt-6 pb-5 space-y-4 md:space-y-3 md:pr-14 md:mt-5">
          <div className="gap-x-2 flex">
            <div className="rounded-full aspect-square border text-primary text-[14px] font-bold leading-[14px] flex border-primary w-[22px] h-[22px] md:w-[26px] md:h-[26px] md:text-[16px] md:leading-[24px]">
              <span className="m-auto">1</span>
            </div>
            <div className="text-[16px] leading-[18px] md:text-[16px] md:leading-[20px]">
              <label className="text-primary border-b border-b-primary">
                10 tASC:{" "}
              </label>
              for generating your 2023 Ascendant Fortune report
            </div>
          </div>
          <div className="gap-x-2 flex">
            <div className="rounded-full aspect-square border text-primary text-[14px] font-bold leading-[14px] flex border-primary w-[22px] h-[22px] md:w-[26px] md:h-[26px] md:text-[16px] md:leading-[24px]">
              <span className="m-auto">2</span>
            </div>
            <div className="text-[16px] leading-[18px] md:text-[16px] md:leading-[20px]">
              <label className="text-primary border-b border-b-primary">
                50 tASC:{" "}
              </label>
              for each invitee generating the report and claiming a SBT via your
              link
            </div>
          </div>
          <div className="gap-x-2 flex">
            <div className="rounded-full aspect-square border text-primary text-[14px] font-bold leading-[14px] flex border-primary w-[22px] h-[22px] md:w-[26px] md:h-[26px] md:text-[16px] md:leading-[24px]">
              <span className="m-auto">3</span>
            </div>
            <div className="text-[16px] leading-[18px] md:text-[16px] md:leading-[20px]">
              <label className="text-primary border-b border-b-primary">
                100 tASC:{" "}
              </label>
              for claiming your 2023 blessing SBT
            </div>
          </div>
        </div>
      </div>
      <div className="mt-2 mb-4 md:mt-4 text-[16px] leading-[18px] md:text-[12px] md:leading-[20px] opacity-80">
        The rights to release tASC and set commercial rules belong to Ascendant
        and its community.
      </div>
    </div>
  );
}
