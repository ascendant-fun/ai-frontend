interface ForwardIconProps {
    width?: number;
    height?: number;
    extraClasses?: string;
}

function ForwardIcon({ width = 16, height = 12, extraClasses }: ForwardIconProps) {
    if (extraClasses === undefined || extraClasses.length === 0) {
        extraClasses = 'fill-white';
    }

    return (

        <svg width={width} height={height} className={`${extraClasses}`} viewBox="0 0 16 13" fill="current" xmlns="http://www.w3.org/2000/svg">
            <path d="M9.90473 0.5L16 6.05557L9.90473 11.6111V8.72229C9.58041 8.70448 3.92817 8.49267 0 12.5C1.57195 6.84945 6.50939 4.39175 9.90473 3.38902V0.5Z" />
        </svg>
    )
}

export default ForwardIcon;