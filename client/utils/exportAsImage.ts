import html2canvas from "html2canvas";
import * as htmlToImage from "html-to-image";

const IN_BROWSER = typeof window !== "undefined";
const USER_AGENT = IN_BROWSER ? window.navigator?.userAgent : undefined;
const IS_IOS = USER_AGENT?.includes("AppleWebKit");

export interface ExportImageResult {
  image: string;
  blob: Blob | null;
}

const downloadImageNew = async (
  element: HTMLElement,
  imageFileName: string,
  shouldDownload: boolean,
  requestImagesCount: number = 3
) => {
  let dataUrl = await htmlToImage.toPng(element);

  for (let i = 1; i < requestImagesCount; i++) {
    await new Promise<void>((resolve) => {
      setTimeout(async () => {
        dataUrl = await htmlToImage.toPng(element);

        resolve();
      }, 400);
    });
  }

  if (shouldDownload) {
    const link = document.createElement("a");
    link.download = imageFileName;
    link.href = dataUrl;
    link.click();
    return;
  }

  return dataUrl;
};

const exportAsBlob = async (element: HTMLElement) => {
  let blob = await htmlToImage.toBlob(element);

  if (IS_IOS) {
    const requestImagesCount = 1;
    for (let i = 0; i < requestImagesCount; i++) {
      await new Promise<void>((resolve) => {
        setTimeout(async () => {
          blob = await htmlToImage.toBlob(element);

          console.log(blob);

          resolve();
        }, 500);
      });
    }
  }

  return blob;
};

const exportAsImage = async (
  element: HTMLElement,
  imageFileName: string,
  targetEleId?: string,
  shouldDownload: boolean = true,
  shouldReturnBlob: boolean = false
): Promise<ExportImageResult> => {
  const canvas = await html2canvas(element, {
    useCORS: true,
    scale: 3,
    // allowTaint: true,
    // foreignObjectRendering: true,
    // make it visible when exporting
    onclone: function (clonedDoc) {
      if (targetEleId === undefined) return;

      const targetEle = clonedDoc.getElementById(targetEleId);

      if (targetEle === null) return;

      targetEle.style.display = "block";
    },
  });

  const image = canvas.toDataURL("image/png", 1.0);
  let blob = null;

  if (shouldReturnBlob) {
    blob = await toBlob(canvas);
  }

  if (shouldDownload) {
    downloadImage(image, imageFileName);
  }

  return {
    image,
    blob,
  };
};

const downloadImage = (blob: string, fileName: string) => {
  const fakeLink = window.document.createElement("a");
  fakeLink.setAttribute("style", "display: none;");
  fakeLink.download = fileName;

  fakeLink.href = blob;

  document.body.appendChild(fakeLink);
  fakeLink.click();
  document.body.removeChild(fakeLink);

  fakeLink.remove();
};

function toBlob(canvas: HTMLCanvasElement): Promise<Blob> {
  return new Promise((resolve) => {
    canvas.toBlob((blob) => {
      if (blob) resolve(blob);
    });
  });
}

export { exportAsImage, downloadImage, downloadImageNew, exportAsBlob };
