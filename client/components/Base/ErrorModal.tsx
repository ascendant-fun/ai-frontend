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

export function ErrorModal({
  children,
  isOpen,
  title,
  size = "lg",
}: BaseModalProps) {
  const { value: open, setter: setOpen } = isOpen;
  const sizeClass = getSizeClass(size);

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
          <div className="flex min-h-full justify-center text-center items-center mx-6">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel>
                <div
                  className={`relative mt-8 transform overflow-hidden bg-[#1A0D2A] px-4 p-6 text-left shadow-xl transition-all w-full rounded-xl border-4 border-white/10 ${sizeClass}`}
                >
                  <div>
                    {title !== undefined && (
                      <Dialog.Title
                        as="h3"
                        className="text-sm font-medium text-white text-center"
                      >
                        {title}
                      </Dialog.Title>
                    )}
                    <div className="text-gray-300 sm:py-4">{children}</div>
                  </div>
                </div>
                <div className="mt-4">
                  <button
                    type="button"
                    className="rounded-lg bg-[#1A0D2A] p-2 text-gray-400 transition transform hover:scale-110 hover:text-gray-500 focus:outline-none"
                    onClick={() => setOpen(false)}
                  >
                    <span className="sr-only">Close</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
