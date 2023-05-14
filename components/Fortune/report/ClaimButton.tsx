import Image from "next/image";

interface ClaimButtonProps {
    onClick: () => void;
}

function ClaimButton({ onClick }: ClaimButtonProps) {
    return (
        <button
            className={`rounded-t-2xl font-bold leading-6 relative pt-4 pb-4 px-4 uppercase linear-gradient bg-no-repeat bg-cover transition-all translate-y-3 hover:translate-y-0`}
            onClick={onClick}
        >
            Claim your SBT !
            <Image src={`/assets/down.svg`} className="mx-auto" width="18" height="18" alt="down arrow" />
            <Image src={`/assets/claim-btn-bg.png`} className="absolute inset-0 p-1" alt="Claim your sbt!" fill />
        </button>
    );
}

export default ClaimButton;