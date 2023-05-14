import RightArrow from "../../Base/icons/RightArrow";
import { Popover, Transition } from "@headlessui/react";
import { useState } from "react";

type PreviousPageButtonProps = {
    showLeftArrow: boolean;
    onClickHandler: () => void;
}

function PreviousPageButton({ showLeftArrow, onClickHandler }: PreviousPageButtonProps) {
    const [isShowing, setIsShowing] = useState(false);

    return (
        <Popover className="absolute top-1/2 left-0 md:left-12 -translate-y-1/2 z-50">
            <div className="relative">
                <Popover.Button
                    type="button"
                    className={`rotate-180 transition-all opacity-80 bg-white hover:bg-white/80 md:bg-primary md:hover:bg-primary/70 hover:pr-3 md:hover:pr-4 py-3 px-2 rounded-l-full transform z-[60] md:border md:border-black/40 md:backdrop-blur-sm md:opacity-80 md:hover:opacity-100 md:py-[10px] md:px-5 md:rounded-full ${showLeftArrow ? '' : 'hidden'}`}
                    onMouseEnter={() => setIsShowing(true)}
                    onMouseLeave={() => setIsShowing(false)}
                    onClick={() => {
                        setTimeout(() => {
                            onClickHandler();
                        }, 100)
                    }}
                >
                    <RightArrow extraClasses="fill-black scale-75" />
                </Popover.Button>
                <Transition
                    show={isShowing}
                    enter="transition duration-100 ease-out"
                    enterFrom="transform scale-95 opacity-0"
                    enterTo="transform scale-100 opacity-100"
                    leave="transition duration-75 ease-out"
                    leaveFrom="transform scale-100 opacity-100"
                    leaveTo="transform scale-95 opacity-0"
                    className="absolute left-0 top-[10%] -translate-y-[130%] hidden md:block"
                >
                    <Popover.Panel
                        onMouseEnter={() => setIsShowing(true)}
                        onMouseLeave={() => setIsShowing(false)}
                        className={`relative text-center normal-case z-[100] text-white mt-4 bg-black rounded-lg shadow-sm py-3 px-4 w-36 text-[18px] md:leading-[20px] font-normal`}
                    >
                        <svg className={`absolute left-4 bottom-0 translate-y-3 w-6 h-6 transform text-black fill-current stroke-current`}
                            width="14" height="14"
                        >
                            <rect x="8" y="-10" width="14" height="14" transform="rotate(45)" />
                        </svg>
                        {`Previous Page`}
                    </Popover.Panel>
                </Transition>
            </div>
        </Popover>
    );
}

export default PreviousPageButton;