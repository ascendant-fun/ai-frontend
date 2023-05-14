import { ReactNode } from 'react';
import LoadingIcon from '../Icon/Loading';

type ButtonStyles = 'white' | 'transparent' | 'dark-transparent';

interface BaseButtonProps {
    children: ReactNode;
    isLoading?: boolean;
    isDisabled?: boolean;
    loadingText?: string;
    onClickHandler: () => void;
    style: ButtonStyles;
    fullWidth?: boolean;
}

function getButtonClasses(style: ButtonStyles, isDisabled: boolean): string {
    if (!isDisabled) {
        if (style === 'white') {
            return 'bg-secondary text-black text-black hover:bg-secondary/80';
        }

        if (style === 'transparent') {
            return 'bg-transparent border-white/30 border text-white hover:bg-white/10 text-secondary';
        }

        if (style === 'dark-transparent') {
            return 'bg-white/10 text-white hover:bg-white/30';
        }

        return '';
    }

    if (style === 'white') {
        return 'bg-[#342752] text-[#4E4078]';
    }

    return '';
}

function BaseButton({ children, loadingText, style, onClickHandler, isLoading = false, fullWidth = false, isDisabled = false }: BaseButtonProps) {
    const buttonClasses = getButtonClasses(style, isDisabled);

    return (
        <button
            onClick={onClickHandler}
            className={`rounded-[4.5px] group items-center flex justify-center px-4 py-3 md:py-4 xl:py-[19px] transition shadow-xl font-sans font-bold text-base md:text-[18px]
                ${buttonClasses} ${isLoading ? 'cursor-not-allowed' : ''} ${fullWidth ? 'w-full' : ''}
            `}
            disabled={isLoading || isDisabled}
        >
            {
                isLoading
                    ? (
                        <>
                            <LoadingIcon classes={`${loadingText === undefined ? '' : 'mr-3'}`} />
                            {loadingText}
                        </>
                    )
                    : children
            }
        </button>
    );
}

export default BaseButton;