import { Popover, Transition } from "@headlessui/react";
import { useState } from "react";

type TagTooltipProps = {
  text?: string;
  disabled?: boolean;
  children: React.ReactNode;
};

function TagTooltip({ text, disabled, children }: TagTooltipProps) {
  const [isShowing, setIsShowing] = useState(false);

  return (
    <Popover>
      <Popover.Button
        type="button"
        className="relative"
        onClick={() => !disabled && setIsShowing(!isShowing)}
        onMouseEnter={() => !disabled && setIsShowing(true)}
        onMouseLeave={() => setIsShowing(false)}
      >
        {children}
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
          onClick={() => !disabled && setIsShowing(!isShowing)}
          onMouseEnter={() => !disabled && setIsShowing(true)}
          onMouseLeave={() => setIsShowing(false)}
          className={`absolute text-left normal-case z-30 left-1/2 -top-[4px] -translate-x-1/2 -translate-y-[150%] text-white mt-4 bg-black rounded-lg shadow-sm py-2 px-3 md:py-3 md:px-4 w-56 md:w-80 text-[13px] leading-[14px] md:text-[18px] md:leading-[20px] font-normal`}
        >
          <svg
            className={`absolute left-5 z-10 w-6 h-6 transform text-black bottom-0 translate-y-4 fill-current stroke-current translate-x-20 md:translate-x-32`}
            width="14"
            height="14"
          >
            <rect x="8" y="-10" width="14" height="14" transform="rotate(45)" />
          </svg>
          {text}
        </Popover.Panel>
      </Transition>
    </Popover>
  );
}

export default TagTooltip;
