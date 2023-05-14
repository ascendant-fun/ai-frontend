import Link from "next/link";
import * as React from 'react'

interface HeaderLink {
    name: string;
    href: string;
    scrollToElement?: boolean;
}

const scrollTo = (event: React.MouseEvent, elementSelector: string) => {
    event.preventDefault();
    const section = document.querySelector(elementSelector);

    if (section === null) {
        return;
    }

    section.scrollIntoView({ behavior: 'smooth', block: 'start' });
};

function HeaderLink({ name, href, scrollToElement }: HeaderLink) {
    if (scrollToElement === undefined) {
        scrollToElement = false;
    }

    if (scrollToElement === true) {
        return (
            <a
                href="#"
                className="text-primary my-auto hover:text-primary/80 font-raleway font-normal"
                onClick={(e) => scrollTo(e, href)}
            >
                {name}
            </a>
        );
    }

    return (
        <Link href={href} className="text-primary my-auto hover:text-primary/80 font-raleway font-normal">
            {name}
        </Link>
    );
}

export default HeaderLink;