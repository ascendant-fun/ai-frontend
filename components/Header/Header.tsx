import Image from "next/image";
import WalletConnectButton from "../WalletConnectButton";
import HeaderLink from "./HeaderLink";
import Link from "next/link";
import { Disclosure, Transition } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/router";

const navigationLinks = [
  {
    name: "Fortune",
    href: "/fortune",
  },
  {
    name: "Roadmap",
    href: "#home-roadmap",
    scrollToElement: true,
  },
  {
    name: "Team",
    href: "#home-team",
    scrollToElement: true,
  },
];

function Header() {
  const router = useRouter();
  const isHome = router.route === "/";

  return (
    <>
      <Disclosure
        as="nav"
        className="bg-black/50 backdrop-blur-sm fixed top-0 w-full z-50"
      >
        {({ open }) => (
          <>
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
              <div className="relative flex h-16 items-center justify-between">
                <div className="flex ml-4 sm:ml-0 items-stretch justify-start">
                  <div className="flex flex-shrink-0 items-center">
                    <Link className="flex" href="/">
                      <Image
                        src={"/images/logo.svg"}
                        alt="logo"
                        width="24"
                        height="24"
                      />
                      <Image
                        src={"/images/logo-text.svg"}
                        alt="logo-text"
                        width="75"
                        height="32"
                      />
                    </Link>
                  </div>
                </div>
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                  <div className="hidden sm:ml-6 sm:block">
                    <div className="flex space-x-10">
                      {isHome &&
                        navigationLinks.map((navigationLink) => (
                          <HeaderLink
                            name={navigationLink.name}
                            href={navigationLink.href}
                            key={navigationLink.name}
                            scrollToElement={navigationLink.scrollToElement}
                          />
                        ))}
                      <WalletConnectButton />
                    </div>
                  </div>
                </div>
                <div className="absolute z-10 inset-y-0 right-0 flex items-center sm:hidden">
                  {/* Mobile menu button*/}
                  <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-primary hover:text-primary/80">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XMarkIcon
                        className="block h-6 w-6 transition"
                        aria-hidden="true"
                      />
                    ) : (
                      <Bars3Icon
                        className="block h-6 w-6 transition"
                        aria-hidden="true"
                      />
                    )}
                  </Disclosure.Button>
                </div>
              </div>
            </div>

            <Transition
              enter="transition duration-200"
              enterFrom="-translate-y-8"
              enterTo="translate-y-0"
              leave="transition duration-75"
              leaveFrom="translate-y-0"
              leaveTo="-translate-y-8"
            >
              <Disclosure.Panel className="sm:hidden">
                <div className="space-y-1 px-2 pt-2 pb-3 text-right">
                  {navigationLinks.map((item) => (
                    <Disclosure.Button
                      key={item.name}
                      as="a"
                      href={item.href}
                      className="block px-3 py-2 rounded-md text-base hover:text-gray-200"
                    >
                      {item.name}
                    </Disclosure.Button>
                  ))}
                  <div className="border-b w-6 ml-auto"></div>
                  <WalletConnectButton />
                </div>
              </Disclosure.Panel>
            </Transition>
            <div className="relative">
              <div className="primary-gradient h-[0.5px]"></div>
              <Image
                src="/images/circle.png"
                width="48"
                height="48"
                alt="Circle image"
                className="absolute left-1/2 transform -translate-x-1/2 -translate-y-6"
              />
            </div>
          </>
        )}
      </Disclosure>
    </>
  );
}

export default Header;
