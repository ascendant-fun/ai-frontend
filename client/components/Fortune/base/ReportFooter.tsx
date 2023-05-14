interface ReportFooterProps {
    referralCode: string;
    extraClasses?: string;
}

function ReportFooter({ extraClasses, referralCode }: ReportFooterProps) {
    const classes = extraClasses === undefined ? '' : extraClasses;

    return (
        <div className={`w-full bottom-3 px-4 break-all font-bold md:font-normal text-center text-[11px] md:text-[12px] ${classes}`}>
            www.ascendant.fun/fortune/{referralCode}
        </div>
    );
}

export default ReportFooter;