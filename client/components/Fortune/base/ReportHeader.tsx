import { truncateStringInMiddle } from '../../../../utils/truncateString';

interface ReportHeader {
    nickName: string;
    address: string;
    ens: string | null;
}

function getDisplayAddress(address: string, ens: string | null) {
    if (ens === null || ens.length === 0) {
        return address
            ? truncateStringInMiddle(address, 8, '******', 2, 4)
            : '';
    }

    return truncateStringInMiddle(ens, 14, '***', 7, 4);
}

function ReportHeader({ nickName, address, ens }: ReportHeader) {
    const displayAddress = getDisplayAddress(address, ens);

    return (
        <div className="absolute grid bg-black/[30%] md:grid-flow-col md:grid-col-2 justify-items-center md:justify-items-start px-4 py-3 z-50 top-0 w-full border-b md:border md:w-[97%] md:mt-4 md:left-1/2 md:-translate-x-1/2 md:inset-x-0 transform border-white/25 rounded-t-0 rounded-b-[10px] md:rounded-[10px] md:py-0">
            <div className="grid md:grid-flow-col justify-items-center align-middle md:my-6">
                <img
                    className="w-44 md:w-60 h-auto my-auto"
                    src={'/assets/logo.svg'} alt="logo"
                />
                <p className="mt-2 text-sm leading-4 md:text-[26px] md:leading-[28px] md:my-auto md:ml-2">Fortune</p>
            </div>
            {
                address && (
                    <div className="text-lg leading-[16px] text-center mt-1 py-2 md:ml-auto md:border-l md:pl-10 md:py-6 md:border-l-white/30">
                        <div className={`break-all`}>
                            <span className="mr-3 md:text-xl md:leading-[16px]">
                                {nickName}&apos;s Wallet Address
                            </span>
                            <span className="font-bold md:text-xl md:leading-[10px]">{displayAddress}</span>
                        </div>
                    </div>
                )
            }
        </div>
    );
}


export default ReportHeader;
