interface FacebookIconProps {
    width?: number;
    height?: number;
    fill?: string;
    extraClasses?: string;
}

function FacebookIcon({ width = 8, height = 12, fill = 'current', extraClasses }: FacebookIconProps) {
    if (extraClasses === undefined || extraClasses.length === 0) {
        extraClasses = '';
    }

    return (
        <svg width={width} height={height} className={`${extraClasses}`} fill={fill} viewBox="0 0 8 12" xmlns="http://www.w3.org/2000/svg">
            <path d="M6.77122 6.69902L7.1018 4.54369H5.03384V3.14501C5.03384 2.55534 5.32271 1.98059 6.24896 1.98059H7.18918V0.145641C7.18918 0.145641 6.33589 0 5.52013 0C3.81692 0 2.70376 1.03223 2.70376 2.90098V4.54369H0.810547V6.69902H2.70376V11.9094C3.08338 11.969 3.47246 12 3.86881 12C4.26516 12 4.65423 11.969 5.03384 11.9094V6.69902H6.77122Z" />
        </svg>
    )
}

export default FacebookIcon;