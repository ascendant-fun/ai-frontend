interface RightArrowProps {
    width?: number;
    height?: number;
    extraClasses?: string;
}

function RightArrow({ width = 20, height = 16, extraClasses }: RightArrowProps) {
    if (extraClasses === undefined || extraClasses.length === 0) {
        extraClasses = 'fill-white';
    }

    return (
        <svg width={width} height={height} className={`${extraClasses}`} viewBox="0 0 20 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M19.5819 7.20246L13.2011 0.821674C12.7618 0.382359 12.0505 0.382359 11.632 0.821674C11.1927 1.26099 11.1927 1.97231 11.632 2.39072L16.13 6.88865H1.15082C0.544104 6.88865 0.0419922 7.39076 0.0419922 7.99748C0.0419922 8.60419 0.544104 9.10631 1.15082 9.10631H16.1091L11.632 13.6042C11.1927 14.0436 11.1927 14.7549 11.632 15.1733C11.8412 15.3825 12.1342 15.508 12.4271 15.508C12.72 15.508 12.9919 15.4034 13.2221 15.1733L19.6238 8.77158C19.833 8.56237 19.9585 8.26946 19.9585 7.97656C19.9166 7.70456 19.7911 7.41167 19.5819 7.20246Z" />
        </svg>

    )
}

export default RightArrow;