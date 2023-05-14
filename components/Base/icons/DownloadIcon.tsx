interface DownloadIconProps {
    width?: number;
    height?: number;
    extraClasses?: string;
}

function DownloadIcon({ extraClasses, width = 10, height = 13 }: DownloadIconProps) {
    if (extraClasses === undefined || extraClasses.length === 0) {
        extraClasses = 'fill-black';
    }

    return (
        <svg width={width} height={height} className={extraClasses} viewBox="0 0 10 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4.99942 0.5C4.60058 0.5 4.2773 0.823276 4.2773 1.22224V8.70781L1.40378 5.99953C1.13562 5.71319 0.617697 5.70461 0.350647 5.99206C0.0794967 6.28374 0.176308 6.78423 0.410875 7.04529L4.50312 10.897C4.83662 11.1439 5.1584 11.17 5.49614 10.897L9.58839 7.04529C9.83241 6.79504 9.91864 6.2765 9.64861 5.99206C9.37846 5.70747 8.84237 5.75314 8.59548 5.99953L5.72196 8.70781V1.22224C5.72196 0.823404 5.39868 0.5 4.99984 0.5H4.99942ZM0.907174 12.0555C0.508335 12.0555 0.185059 12.3788 0.185059 12.7778C0.185059 13.1766 0.508335 13.5 0.907174 13.5H9.09135C9.49019 13.5 9.81346 13.1766 9.81346 12.7778C9.81346 12.3789 9.49019 12.0555 9.09135 12.0555H0.907174Z" />
        </svg>

    );
}

export default DownloadIcon;