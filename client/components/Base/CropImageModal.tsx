import { useState, useRef } from "react";
import Cropper, { ReactCropperElement } from "react-cropper";
import "cropperjs/dist/cropper.css";

import { BaseModal } from "./BaseModal";
import { Binder } from "../../hooks/useBind";
import APIClient from "../../api/APIClient";
import { Account } from "../../../types/ApiClient";

interface CropImageModalProps {
  image?: string;
  publicAddress: string;
  isOpen: Binder<boolean>;
  onClose?: () => void;
  onSuccess?: (params: Account) => void;
}

function CropImageModal({
  publicAddress,
  image,
  isOpen,
  onClose,
  onSuccess,
}: CropImageModalProps) {
  const [loading, setLoading] = useState(false);
  const cropperRef = useRef<ReactCropperElement>(null);

  const getCropData = () => {
    if (typeof cropperRef.current?.cropper !== "undefined") {
      // Upload cropped image to server if the browser supports `HTMLCanvasElement.toBlob`.
      // The default value for the second parameter of `toBlob` is 'image/png', change it if necessary.
      cropperRef.current?.cropper.getCroppedCanvas().toBlob(async (blob) => {
        const formData = new FormData();

        if (blob) {
          // Pass the image file name as the third parameter if necessary.
          formData.append("croppedImage", blob, `${publicAddress}.jpg`);
          formData.append("publicAddress", publicAddress);

          setLoading(true);

          const apiClient = new APIClient();

          try {
            const { data } = await apiClient.uploadAvatar(formData);
            console.log(data);

            if (data.code === 0) {
              isOpen.setter(false);
              onSuccess && onSuccess(data.data);
            }
            setLoading(false);
          } catch (error) {
            console.log(error);
            setLoading(false);
          }
        }
      });
    }
  };

  return (
    <BaseModal
      size="xl"
      title="Upload Avatar"
      isOpen={isOpen}
      onClose={onClose}
    >
      <Cropper
        src={image}
        viewMode={1}
        aspectRatio={1}
        background={false}
        initialAspectRatio={1}
        rotatable={false}
        ref={cropperRef}
        className="mt-3 md:mt-0"
        style={{ height: 360, width: "100%" }}
      />
      <div className="flex justify-center">
        <button
          disabled={loading}
          className="mt-6 px-4 h-[44px] rounded-md bg-primary text-black font-bold"
          onClick={getCropData}
        >
          {loading ? "Uploading..." : "Confirm"}
        </button>
      </div>
    </BaseModal>
  );
}

export default CropImageModal;
