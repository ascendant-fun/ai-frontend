interface MediumIconProps {
    width?: number;
    height?: number;
    extraClasses?: string;
}

function MediumIcon({ width = 20, height = 12, extraClasses }: MediumIconProps) {
    if (extraClasses === undefined || extraClasses.length === 0) {
        extraClasses = 'fill-black';
    }

    return (
        <svg width={width} height={height} className={`${extraClasses}`} viewBox="0 0 20 12" xmlns="http://www.w3.org/2000/svg">
            <path d="M11.2146 6.00007C11.2146 8.97367 8.82043 11.3842 5.86718 11.3842C2.91393 11.3842 0.519531 8.97367 0.519531 6.00007C0.519531 3.02647 2.91374 0.615723 5.86718 0.615723C8.82061 0.615723 11.2146 3.02647 11.2146 6.00007Z" />
            <path d="M17.081 6.00007C17.081 8.79907 15.8839 11.069 14.4072 11.069C12.9304 11.069 11.7333 8.79907 11.7333 6.00007C11.7333 3.20107 12.9303 0.931123 14.407 0.931123C15.8837 0.931123 17.081 3.20034 17.081 6.00007Z" />
            <path d="M19.4805 6.00007C19.4805 8.50729 19.0595 10.541 18.5401 10.541C18.0206 10.541 17.5999 8.50783 17.5999 6.00007C17.5999 3.4923 18.0208 1.45909 18.5401 1.45909C19.0593 1.45909 19.4805 3.49212 19.4805 6.00007Z" />
        </svg>


    )
}

export default MediumIcon;