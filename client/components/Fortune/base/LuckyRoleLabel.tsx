import ExclamationIcon from "../../Base/icons/ExclamationIcon";
import { Popover, Transition } from '@headlessui/react';
import { useState } from "react";

interface LuckyRoleLabelProps {
    label: string;
    description: string;
    position?: 'top' | 'bottom';
    extraClasses?: string;
    popoverClasses?: string;
}

function LuckyRoleLabel({ label, description, position = 'top', popoverClasses, extraClasses }: LuckyRoleLabelProps) {
    const [isShowing, setIsShowing] = useState(false);
    const classes = extraClasses !== undefined ? extraClasses : '';
    popoverClasses = popoverClasses !== undefined ? popoverClasses : '';
    const positionClasses = position === 'top' ? '-top-7 -translate-y-[130%] md:-translate-y-[155%]' : '';
    const popoverPointClasses = position === 'top' ? '-bottom-7' : '';

    return (
        <Popover className={`font-bold transition uppercase text-[10px] leading-[0px] py-2 md:text-[15px] md:leading-[17px] rounded-full px-2 border bg-black/[14%] shadow-sm backdrop-blur-lg border-white/30 group hover:bg-white hover:text-black ${classes}`}>
            <Popover.Button
                type="button"
                className="uppercase grid grid-flow-col items-center"
                onMouseEnter={() => setIsShowing(true)}
                onMouseLeave={() => setIsShowing(false)}
            >
                <ExclamationIcon classes="w-[9px] h-[9px] md:w-3 md:h-3 fill-white group-hover:fill-black mr-1" />
                <span>{label}</span>
            </Popover.Button>

            <Transition
                show={isShowing}
                enter="transition duration-100 ease-out"
                enterFrom="transform scale-95 opacity-0"
                enterTo="transform scale-100 opacity-100"
                leave="transition duration-75 ease-out"
                leaveFrom="transform scale-100 opacity-100"
                leaveTo="transform scale-95 opacity-0"
            >
                <Popover.Panel
                    onMouseEnter={() => setIsShowing(true)}
                    onMouseLeave={() => setIsShowing(false)}
                    className={`absolute normal-case z-30 left-1/2 -translate-x-1/2 text-white mt-4 bg-black rounded-lg shadow-sm p-2 md:w-48 text-[13px] leading-[14px] font-normal ${popoverClasses} ${positionClasses}`}
                >
                    <svg className={`absolute left-5 z-10 w-6 h-6 transform text-black -translate-y-3 fill-current stroke-current ${popoverPointClasses}`}
                        width="14" height="14"
                    >
                        <rect x="8" y="-10" width="14" height="14" transform="rotate(45)" />
                    </svg>
                    {description}
                </Popover.Panel>
            </Transition>
        </Popover>
    );
}

export default LuckyRoleLabel;