import Image from 'next/image'
import { ChevronRightIcon } from '@heroicons/react/24/outline';

const navigation = {
    legal: [
        { name: 'Privacy policy', href: '#' },
        { name: 'Terms of Serviced', href: '#' },
        { name: 'Legal Overview', href: '#' },
    ],
    social: [
        {
            name: 'Discord',
            href: '#',
        },
        {
            name: 'Twitter',
            href: 'https://twitter.com/ascendant_astro',
        },
    ],
}

function Footer() {
    return (
        <footer className="bg-light" aria-labelledby="footer-heading">
            <h2 id="footer-heading" className="sr-only">
                Footer
            </h2>
            <div className="mx-auto max-w-7xl py-8 px-4 sm:px-6 lg:py-10 lg:px-8">
                <div className="md:grid md:grid-cols-2 md:gap-8">
                    <div className="space-y-4 md:space-y-8 md:col-span-1">
                        <div className="flex space-x-1 sm:space-x-2">
                            <div className="w-5 h-5 sm:w-8 sm:h-8 md:w-14 md:h-14 relative">
                                <Image src="/images/logo.svg" alt="logo" fill />
                            </div>
                            <Image src="/images/logo-full.svg" width="212" height="49" alt="logo text" className="hidden sm:block" />
                            <Image src="/images/logo-text.svg" width={56.25} height="24" alt="logo text" className="block sm:hidden" />
                        </div>
                        <p className="text-xs sm:text-base md:ml-14 md:max-w-md text-gray-200">
                            Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium
                        </p>
                    </div>
                    <div className="mt-4 ml-auto md:flex md:flex-row-reverse gap-24 md:px-8 text-gray-200">
                        <div className="mt-12 md:mt-0">
                            <ul role="list" className="border-t border-gray-600 md:border-t-0 md:mt-4 md:space-y-4">
                                {navigation.social.map((item) => (
                                    <li key={item.name} className="border-b border-gray-600 py-3 md:border-b-0 md:py-1">
                                        <a href={item.href} target="_blank" className="flex justify-between text-xs sm:text-base hover:text-primary" rel="noreferrer">
                                            <span>{item.name}</span>
                                            <ChevronRightIcon className="w-4 h-4 md:hidden" />
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <ul role="list" className="md:mt-4 md:space-y-4">
                                {navigation.legal.map((item) => (
                                    <li key={item.name} className="border-b border-gray-600 py-3 md:border-b-0 md:py-1">
                                        <a href={item.href} className="flex justify-between text-xs sm:text-base hover:text-primary">
                                            <span>{item.name}</span>
                                            <ChevronRightIcon className="w-4 h-4 md:hidden" />
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="mt-12 pt-8">
                    <div className="text-[10px] md:text-xs text-center text-gray-400">
                        <p className="">
                            Ascendant is a registered trademark of Ascendant Inc. All Rights Reserved.
                        </p>
                        <p>All logos are registered trademarks of their respective owners. All contents of this document, unless otherwise credited, are copyright © 2022 Ascendant Inc.</p>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer;