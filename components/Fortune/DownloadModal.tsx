import { BaseModal } from "../Base/BaseModal";
import { Binder } from "../../hooks/useBind";
import Image from "next/image";

interface DownloadModalProps {
    isOpen: Binder<boolean>;
    imageSrc: string;
}

function DownloadModal({ isOpen, imageSrc }: DownloadModalProps) {
    return (
        <BaseModal isOpen={isOpen} title="Download" size="xl" background="special">
            <img src={imageSrc} className="w-60 rounded-xl mx-auto my-2 mt-4" alt="image preview" />
            <p className="text-center text-sm mt-4 text-white/50">Long Press to save image</p>
        </BaseModal>
    );
}

export default DownloadModal;