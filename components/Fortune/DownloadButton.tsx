import Image from "next/image";
import LoadingIcon from "../Icon/Loading";
import DownloadIcon from "../Base/icons/DownloadIcon";

interface ShareButtonProps {
    onClickHandler: () => void;
    showBackground?: boolean;
    loading?: boolean;
}

function DownloadButton({ onClickHandler, showBackground = true, loading = false }: ShareButtonProps) {
    return (
        <button
            type="button"
            className={`w-[34px] h-[34px] p-[10px] flex justify-center items-center align-middle transition-all ${showBackground ? 'rounded-full bg-white hover:bg-primary shadow-xl shadow-black/17' : 'group'}`}
            onClick={onClickHandler}
        >
            {
                loading
                    ? <LoadingIcon classes="text-black" />
                    : <DownloadIcon extraClasses={`${showBackground ? '' : 'group-hover:opacity-75'}`} />
            }
        </button>
    );
}

export default DownloadButton;