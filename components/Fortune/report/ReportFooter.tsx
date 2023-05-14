import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import QRCode from "react-qr-code";

/* eslint-disable @next/next/no-img-element */
function ReportFooter({ accountID }: { accountID: number, renderMode: boolean }) {
    const router = useRouter();
    const [shareUrl, setShareUrl] = useState("");

    let protocol = '';

    if (window) {
        protocol = window.location.protocol;
    }

    useEffect(() => {
        if (!accountID) return;

        const host = window.location.host;
        const baseUrl = `${host}`;

        setShareUrl(`${baseUrl}/fortune/${accountID}`);
    }, [router.pathname, accountID]);

    return (
        <div className="mt-6 border-t border-dashed w-full flex pt-2 pb-2">
            <div className="py-2 px-2">
                <div className="text-sm leading-[18px]">
                    <p>
                        Battle with this wallet at<br />
                        <span className="font-black break-all">{shareUrl}</span>
                    </p>
                    <p>or scan to find out!</p>
                    <p className="text-[10px] leading-3 text-white/70">Copyright ©️2022 Ascendant Inc.</p>
                </div>
            </div>
            {
                shareUrl && (
                    <div className="h-auto w-auto my-auto ml-auto max-w-[64px]">
                        <QRCode
                            size={256}
                            style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                            value={`${protocol}//${shareUrl}`}
                            viewBox={`0 0 256 256`}
                        />
                    </div>
                )
            }
        </div>
    );
}

export default ReportFooter;