import LoadingIcon from '../Icon/Loading';
import ShareIcon from "../Base/icons/ShareIcon";

interface ShareButtonProps {
    onClickHandler: () => void;
    loading?: boolean;
}

function ShareButton({ onClickHandler, loading = false }: ShareButtonProps) {
    return (
        <button
            type="button"
            className="w-[34px] h-[34px] p-[10px] flex justify-center items-center align-middle transition-all rounded-full bg-primary hover:bg-primary/80 shadow-xl shadow-black/17"
            onClick={onClickHandler}
        >
            {
                loading
                    ? <LoadingIcon classes="text-black" />
                    : <ShareIcon />
            }
        </button>
    );
}

export default ShareButton;