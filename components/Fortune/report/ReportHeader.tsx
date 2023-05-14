/* eslint-disable @next/next/no-img-element */
import { truncateStringInMiddle } from '../../../utils/truncateString';

type WalletColors = 'yellow' | 'blue' | 'pink';
interface ReportHeader {
    nickName: string;
    address?: string;
    color: WalletColors;
}

function getWalletColor(color: WalletColors): string {
    if (color === 'yellow') return 'text-[#FBE200]';
    if (color === 'blue') return 'text-[#1170FF]';
    if (color === 'pink') return 'text-[#C600B2]';

    return '';
}

function ReportHeader({ nickName, color, address }: ReportHeader) {
    const truncatedAddress = address
        ? truncateStringInMiddle(address, 8, '******', 2, 4)
        : '';
    const walletColor = getWalletColor(color);

    return (
        <div className="grid justify-items-center">
            <img src={'/assets/logo-short.svg'} alt="logo-text" width="142" className="h-auto" />
            {
                address && (
                    <div className="text-base text-center mt-3">
                        <p className="text-white max-w-sm">
                            {nickName}&apos;s Crypto Wallet:
                        </p>
                        <p className={`break-all font-bold ${walletColor}`}>{truncatedAddress}</p>
                    </div>
                )
            }
        </div>
    );
}

export default ReportHeader;