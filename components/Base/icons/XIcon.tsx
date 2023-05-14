interface XIconProps {
    width?: number;
    height?: number;
    extraClasses?: string;
}

function XIcon({ width = 15, height = 15, extraClasses }: XIconProps) {
    if (extraClasses === undefined || extraClasses.length === 0) {
        extraClasses = 'fill-white';
    }

    return (
        <svg width={width} height={height} className={`${extraClasses}`} viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0.410588 0.410588C0.957798 -0.136622 1.84525 -0.136863 2.39267 0.410588L9.00005 7.01796L15.6074 0.410588C16.1549 -0.136863 17.0421 -0.136863 17.5895 0.410588C18.1367 0.957798 18.137 1.84525 17.5895 2.39267L10.9821 9.00005L17.5895 15.6074C18.137 16.1549 18.1367 17.0421 17.5895 17.5895C17.0421 18.137 16.1548 18.1367 15.6074 17.5895L9.00005 10.9821L2.39267 17.5895C1.84522 18.1367 0.958008 18.1367 0.410588 17.5895C-0.136863 17.0421 -0.136863 16.1548 0.410588 15.6074L7.01796 9.00005L0.410588 2.39267C-0.136863 1.84522 -0.136863 0.958008 0.410588 0.410588Z" />
        </svg>
    )
}

export default XIcon;