import Image from "next/image";
import { TestItemProps } from "./TestItem";
import React, { useState } from "react";
import { useStyleMediaQuery } from "../../../hooks/useStyleMediaQuery";
import dynamic from "next/dynamic";

// had to use css for the translate values, as tailwind would not recognize dynamically generated values
const defaultPersonalityTests: TestItemProps[] = [
    {
        question: 'Will I have a lot of money',
        imageSrc: '/images/tests/wealth.png',
        imageTitle: 'Wealth',
        style: {
            transform: "translateY(-0px)",
            opacity: '100%',
        }
    },
    {
        question: 'What are the characteristics of my true love?',
        imageSrc: '/images/tests/true-love.png',
        imageTitle: 'True Love',
        style: {
            transform: "translateY(-40px)",
            opacity: '100%',
        }
    },
    {
        question: "What's my biggest strengths?",
        imageSrc: '/images/tests/strength.png',
        imageTitle: 'Strength',
        style: {
            transform: "translateY(-80px)",
            opacity: '100%',
        }
    },
    {
        question: 'What major should I choose?',
        imageSrc: '/images/tests/wealth.png',
        imageTitle: 'Knowledge',
        style: {
            transform: "translateY(-120px)",
            opacity: '100%',
        }
    },
];
// const totalTestsCount = defaultPersonalityTests.length;
//no ssr, because it's dependent on the window object
const TestItem = dynamic(() => import("./TestItem"), { ssr: false });

function HomeTests() {
    const [personalityTests, setPersonalityTests] = useState(defaultPersonalityTests);
    const { matches: isMdAndHigher } = useStyleMediaQuery({
        minOrMax: 'min',
        widthOrHeight: 'width',
        value: 768
        // value: "theme('screens.md')" // how could we use the tailwind breakpoint here?
    });

    const onScrollHandler = (e: React.UIEvent): void => {
        if (!isMdAndHigher) return;

        const currEle = e.currentTarget;

        // calculate the height that needs to be added
        const scrollPerc = currEle.scrollLeft / (currEle.scrollWidth - currEle.clientWidth);
        const shift = scrollPerc * 45;

        // set the new values for all the children
        const targetTests = [...personalityTests];
        for (const index in targetTests) {
            targetTests[index].style.transform = "translateY(" + (-index * 40 + shift) + "px)"
            // targetTests[index].style.opacity = (index * shift + 50) + '%';
        }

        setPersonalityTests(targetTests);
    }

    return (
        <>
            <section className="min-h-screen my-28 overflow-hidden">
                <div className="mx-2 border-2 p-6 sm:max-w-xl rounded-full relative sm:-translate-x-10">
                    <h2 className="text-3xl sm:text-4xl text-center font-gallient text-transparent bg-clip-text bg-gradient-to-t from-primary to-white">Astro personality test</h2>
                    <Image src="/images/sun.png" width="92" height="92" alt="sun" className="absolute -right-8 sm:-right-2 top-0 mix-blend-lighten" />
                    <Image src="/images/sun.png" width="92" height="92" alt="sun" className="absolute -left-8 sm:-left-2 top-0 mix-blend-lighten" />
                </div>
                <div className="pt-48 px-12 grid grid-flow-col overflow-x-scroll scrollbar-hide snap-x md:snap-none" onScroll={onScrollHandler}>
                    {
                        personalityTests.map(personalityTest => (
                            <TestItem
                                key={personalityTest.imageTitle}
                                question={personalityTest.question}
                                imageSrc={personalityTest.imageSrc}
                                imageTitle={personalityTest.imageTitle}
                                style={personalityTest.style}
                                isMdAndHigher={isMdAndHigher}
                            />
                        ))
                    }
                </div>
            </section>
            <div className="w-full primary-gradient h-[0.5px] z-0 hidden sm:block relative">
                <Image src="/images/moon.png" width="178" height="178" alt="moon" className="absolute right-10 bottom-0 translate-y-1/2" />
            </div>
        </>
    );
}

export default HomeTests;