interface TelegramIconProps {
    width?: number;
    height?: number;
    extraClasses?: string;
}

function TelegramIcon({ width = 16, height = 12, extraClasses }: TelegramIconProps) {
    if (extraClasses === undefined || extraClasses.length === 0) {
        extraClasses = 'fill-black';
    }

    return (
        <svg width={width} height={height} className={`${extraClasses}`} viewBox="0 0 16 12" xmlns="http://www.w3.org/2000/svg">
            <path d="M13.9721 0.105939C13.9721 0.105939 15.3042 -0.413489 15.1932 0.847981C15.1562 1.36742 14.8232 3.18541 14.5642 5.15184L13.6761 10.9769C13.6761 10.9769 13.6021 11.8302 12.936 11.9786C12.27 12.127 11.2709 11.4592 11.0859 11.3108C10.9379 11.1995 8.3107 9.52988 7.38561 8.71364C7.12658 8.49102 6.83055 8.04579 7.4226 7.52636L11.3079 3.81617C11.752 3.37094 12.196 2.33208 10.3458 3.59355L5.16544 7.11826C5.16544 7.11826 4.57339 7.48926 3.46332 7.15536L1.05812 6.41331C1.05812 6.41331 0.170049 5.85678 1.68717 5.30022C5.38747 3.55642 9.93883 1.77552 13.9721 0.105939Z" />
        </svg>

    )
}

export default TelegramIcon;