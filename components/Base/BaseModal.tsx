import { ReactNode } from "react";
import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import useBind, { Binder } from "../../hooks/useBind";

type ModalSize = "md" | "lg" | "xl" | "2xl" | "3xl";
interface BaseModalProps {
  children: ReactNode;
  isOpen: Binder<boolean>;
  title?: string;
  size?: ModalSize;
  background?: "default" | "special";
  onClose?: () => void;
}

// this should setup the base state
export function useBaseModal(initiallyOpen: boolean = true) {
  return useBind(initiallyOpen);
}

function getSizeClass(size: ModalSize) {
  if (size === "md") return "sm:max-w-md";
  if (size === "lg") return "sm:max-w-lg";
  if (size === "xl") return "sm:max-w-xl";
  if (size === "2xl") return "sm:max-w-2xl";
  if (size === "3xl") return "sm:max-w-3xl";
}

export function BaseModal({
  children,
  isOpen,
  title,
  size = "lg",
  onClose,
  background = "default",
}: BaseModalProps) {
  const { value: open, setter: setOpen } = isOpen;
  const sizeClass = getSizeClass(size);
  const backgroundColor =
    background === "default"
      ? "#1A0A2A"
      : "radial-gradient(60.59% 60.59% at 50% 39.41%, #241E1E 0%, #582580 25.94%, #140934 82.35%)";

  const handleClose = (value: boolean) => {
    setOpen(value);
    onClose && onClose();
  };

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={handleClose}>
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
          <div className="flex min-h-full items-end justify-center text-center sm:items-center">
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
                className={`relative mt-0 transform overflow-hidden rounded-t-[20px] px-4 py-3 text-left shadow-xl transition-all w-full sm:my-8 sm:w-full sm:rounded-xl ${sizeClass}`}
                style={{
                  background: backgroundColor,
                }}
              >
                <div className="absolute top-0 right-0 pt-4 pr-4">
                  <button
                    type="button"
                    className="rounded-md text-gray-400 transition transform hover:scale-110 hover:text-gray-500 focus:outline-none"
                    onClick={() => handleClose(false)}
                  >
                    <span className="sr-only">Close</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>
                <div>
                  {title !== undefined && (
                    <Dialog.Title
                      as="h3"
                      className="text-[22px] font-bold text-white text-center"
                    >
                      {title}
                    </Dialog.Title>
                  )}
                  <div className="text-gray-300 sm:py-4">{children}</div>
                </div>
                {/* <div className="grid place-items-center mt-6 md:hidden">
                                    <BaseButton style="dark-transparent" onClickHandler={() => setOpen(false)} fullWidth={true}>
                                        Cancel
                                    </BaseButton>
                                </div> */}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
