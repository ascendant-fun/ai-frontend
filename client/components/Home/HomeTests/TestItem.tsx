import Image from 'next/image'

export interface TestItemProps {
    question: string;
    imageSrc: string;
    imageTitle: string;
    isMdAndHigher?: boolean;
    style: {
        transform: string;
        opacity: string;
    }
}

function TestItem({ question, imageSrc, imageTitle, style, isMdAndHigher }: TestItemProps) {
    return (
        <div
            className={`w-80 p-2 md:mx-10 scrollable-test flex flex-col snap-center md:snap-none`}
            style={isMdAndHigher ? { ...style } : {}
            }>
            <h3 className="font-gallient max-w-xs text-3xl mb-6 text-transparent bg-clip-text bg-gradient-to-t from-primary to-white px-2">{question}</h3>
            <div className="relative w-[220px] h-[271px] md:w-[297px] md:h-[366px] mt-auto">
                <Image src={imageSrc} fill alt={imageTitle} />
            </div>
        </div>
    );
}

export default TestItem;