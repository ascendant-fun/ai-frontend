import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { Binder } from '../../../hooks/useBind';
import Image from 'next/image';
import Link from 'next/link';

interface AboutUsModalProps {
    isOpen: Binder<boolean>;
    benefitsOnClickHandle: () => void;
}

export function AboutUsModal({ isOpen, benefitsOnClickHandle }: AboutUsModalProps) {
    const { value: open, setter: setOpen } = isOpen;

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
                                className={`relative mt-0 transform mx-4 text-left shadow-xl transition-all w-full sm:my-8 sm:w-full rounded-xl md:max-w-[750px] bg-cover bg-no-repeat bg-[url('/images/report/info-modal-mobile-bg.jpg')] md:bg-[url('/images/report/info-modal-bg.jpg')] md:scale-[85%] 2xl:scale-100`}
                            >
                                <div className="absolute z-0 bottom-0 right-3 w-[58px] translate-y-1/2 md:right-16">
                                    <Image
                                        className="w-full h-auto"
                                        src="/images/about-us/ball-2.png"
                                        alt="chart"
                                        width="0"
                                        height="0"
                                        sizes="100vw"
                                    />
                                </div>
                                <div className="absolute hidden md:block z-0 top-[10%] right-0 w-[114px] translate-x-[50%]">
                                    <Image
                                        className="w-full h-auto"
                                        src="/images/about-us/ball-2.png"
                                        alt="chart"
                                        width="0"
                                        height="0"
                                        sizes="100vw"
                                    />
                                </div>
                                <div className="absolute z-50 top-0 right-0 pt-3 pr-3">
                                    <button
                                        type="button"
                                        className="rounded-md text-white transition transform hover:scale-110 hover:text-gray-300 focus:outline-none"
                                        onClick={() => setOpen(false)}
                                    >
                                        <span className="sr-only">Close</span>
                                        <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                                    </button>
                                </div>
                                <div className="relative overflow-hidden px-4 md:px-8 py-3 rounded-xl">
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
                                    <div className="absolute hidden md:block z-0 bottom-0 left-[10%] w-[114px] translate-y-[70%]">
                                        <Image
                                            className="w-full h-auto"
                                            src="/images/about-us/ball.png"
                                            alt="chart"
                                            width="0"
                                            height="0"
                                            sizes="100vw"
                                        />
                                    </div>
                                    <Dialog.Title as="h3" className="text-[22px] font-bold text-white text-center mt-4 md:mt-5">
                                        <div className="w-[190px] md:w-[240px] mx-auto">
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
                                    <div className="px-2 md:py-4 relative z-20">
                                        <div className="mt-5 flex flex-col">
                                            <p className="text-[16px] leading-[18px] mx-auto md:text-[20px] md:leading-[24px]">
                                                Ascendant early users and SBT holders will receive lucky points tASC, which can be exchanged for exclusive benefits
                                                (You can track your total total tASC&nbsp;
                                                <button
                                                    className="text-primary border-b border-b-primary"
                                                    onClick={benefitsOnClickHandle}
                                                >
                                                    here
                                                </button>
                                                )
                                            </p>
                                            <div className="mt-3 pb-5 space-y-2 md:space-y-3 border-b border-b-white/20 md:mt-6">
                                                <div className="gap-x-2 flex">
                                                    <div className="rounded-full aspect-square border my-auto md:my-0 text-primary text-[14px] font-bold leading-[14px] flex border-primary w-[22px] h-[22px] md:w-[26px] md:h-[26px] md:text-[16px] md:leading-[24px]">
                                                        <span className="m-auto">1</span>
                                                    </div>
                                                    <div className="text-[16px] leading-[18px] md:text-[20px] md:leading-[24px]">
                                                        <label className="text-primary font-bold">Early Product Adoption: </label>
                                                        beta products will be open to early adopters, learn more about our products&nbsp;
                                                        <Link className="text-primary border-b border-b-primary"
                                                            href={'/about-us'}
                                                            target="_blank"
                                                        >
                                                            here
                                                        </Link>
                                                    </div>
                                                </div>
                                                <div className="gap-x-2 flex">
                                                    <div className="rounded-full aspect-square border my-auto md:my-0 text-primary text-[14px] font-bold leading-[14px] flex border-primary w-[22px] h-[22px] md:w-[26px] md:h-[26px] md:text-[16px] md:leading-[24px]">
                                                        <span className="m-auto">2</span>
                                                    </div>
                                                    <div className="text-[16px] leading-[18px] md:text-[20px] md:leading-[24px]">
                                                        <label className="text-primary font-bold">Whitelist: </label>
                                                        for Ascendant community NFT
                                                    </div>
                                                </div>
                                                <div className="gap-x-2 flex">
                                                    <div className="rounded-full aspect-square border my-auto md:my-0 text-primary text-[14px] font-bold leading-[14px] flex border-primary w-[22px] h-[22px] md:w-[26px] md:h-[26px] md:text-[16px] md:leading-[24px]">
                                                        <span className="m-auto">3</span>
                                                    </div>
                                                    <div className="text-[16px] leading-[18px] md:text-[20px] md:leading-[24px]">
                                                        <label className="text-primary font-bold">Official Token: </label>
                                                        exchange to official token in the future
                                                    </div>
                                                </div>
                                                <div className="mt-2 md:mt-4 text-[16px] leading-[18px] md:text-[20px] md:leading-[24px]">
                                                    * Early participants and users with more points will be more weighted
                                                </div>
                                            </div>
                                        </div>
                                        <div className="mt-5 flex flex-col">
                                            <label className="text-[18px] leading-[16px] mx-auto font-bold md:text-[20px] md:leading-[24px]">
                                                Simple Rules
                                            </label>
                                            <div className="mt-4 pb-5 space-y-2 md:space-y-3 md:pr-14 md:mt-5">
                                                <div className="gap-x-2 flex">
                                                    <div className="rounded-full aspect-square border my-auto md:my-0 text-primary text-[14px] font-bold leading-[14px] flex border-primary w-[22px] h-[22px] md:w-[26px] md:h-[26px] md:text-[16px] md:leading-[24px]">
                                                        <span className="m-auto">1</span>
                                                    </div>
                                                    <div className="text-[16px] leading-[18px] md:text-[20px] md:leading-[24px]">
                                                        <label className="text-primary">10 tASC: </label>
                                                        for generating your 2023 Ascendant Fortune report
                                                    </div>
                                                </div>
                                                <div className="gap-x-2 flex">
                                                    <div className="rounded-full aspect-square border my-auto md:my-0 text-primary text-[14px] font-bold leading-[14px] flex border-primary w-[22px] h-[22px] md:w-[26px] md:h-[26px] md:text-[16px] md:leading-[24px]">
                                                        <span className="m-auto">2</span>
                                                    </div>
                                                    <div className="text-[16px] leading-[18px] md:text-[20px] md:leading-[24px]">
                                                        <label className="text-primary">50 tASC: </label>
                                                        for each invitee generating the report and claiming a SBT via your link
                                                    </div>
                                                </div>
                                                <div className="gap-x-2 flex">
                                                    <div className="rounded-full aspect-square border my-auto md:my-0 text-primary text-[14px] font-bold leading-[14px] flex border-primary w-[22px] h-[22px] md:w-[26px] md:h-[26px] md:text-[16px] md:leading-[24px]">
                                                        <span className="m-auto">3</span>
                                                    </div>
                                                    <div className="text-[16px] leading-[18px] md:text-[20px] md:leading-[24px]">
                                                        <label className="text-primary">100 tASC: </label>
                                                        for claiming your 2023 blessing SBT
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="mt-2 md:mt-4 text-[16px] leading-[18px] md:text-[20px] md:leading-[24px]">
                                            The rights to release tASC and set commercial rules belong to Ascendant and its community.
                                        </div>
                                    </div>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    );
}