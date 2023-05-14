import ExclamationIcon from "./icons/ExclamationIcon";
import { Popover, Transition } from "@headlessui/react";
import { useState } from "react";

function ClaimTooltip() {
    const [isShowing, setIsShowing] = useState(false)

    return (
        <Popover className={`my-auto ml-2 md:hidden`}>
            <Popover.Button
                type="button"
                className="my-auto ml-2"
                onMouseEnter={() => setIsShowing(true)}
                onMouseLeave={() => setIsShowing(false)}
            >
                <ExclamationIcon classes="w-[15px] h-[15px] fill-white/40 hover:fill-white/30" />
            </Popover.Button>

            <Transition
                show={isShowing}
                enter="transition duration-100 ease-out"
                enterFrom="transform scale-95 opacity-0"
                enterTo="transform scale-100 opacity-100"
                leave="transition duration-75 ease-out"
                leaveFrom="transform scale-100 opacity-100"
                leaveTo="transform scale-95 opacity-0"
                className="relative z-10"
            >
                <Popover.Panel
                    onMouseEnter={() => setIsShowing(true)}
                    onMouseLeave={() => setIsShowing(false)}
                    className={`absolute text-left normal-case left-1/2 -translate-x-2/3 text-white mt-4 bg-black rounded-lg shadow-sm py-2 px-3 md:px-4 w-52 md:w-64 text-[13px] leading-[14px] md:text-[18px] md:leading-[20px] font-normal`}
                >
                    <svg className={`absolute left-5 z-10 w-6 h-6 transform text-black -translate-y-4 fill-current stroke-current translate-x-28 md:translate-x-20`}
                        width="14" height="14"
                    >
                        <rect x="8" y="-10" width="14" height="14" transform="rotate(45)" />
                    </svg>
                    Additional points will be rewarded if you successfully claim the SBT
                </Popover.Panel>
            </Transition>
        </Popover>
    );
}

export default ClaimTooltip;