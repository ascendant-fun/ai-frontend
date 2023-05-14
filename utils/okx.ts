import type { InjectedConnectorOptions } from "@wagmi/core";
import { InjectedConnector } from "wagmi/connectors/injected";
import { Chain, getWalletConnectConnector } from "@rainbow-me/rainbowkit";
import { InstructionStepName } from "@rainbow-me/rainbowkit/dist/wallets/Wallet";
import { isAndroid } from "./isMobile";

function isOKXWallet(ethereum: any) {
  const isOKExWallet =
    Boolean(ethereum.isOkxWallet) &&
    Boolean(ethereum.isOKExWallet) &&
    Boolean(ethereum.isMetaMask);

  if (!isOKExWallet) {
    return false;
  }

  return true;
}

export type MyWalletOptions = {
  chains: Chain[];
} & InjectedConnectorOptions;

export const okxWallet = ({ chains, ...options }: MyWalletOptions) => {
  const isOKXWalletInjected =
    typeof window !== "undefined" &&
    typeof window.ethereum !== "undefined" &&
    isOKXWallet(window.ethereum);
  const shouldUseWalletConnect = !isOKXWalletInjected;

  return {
    id: "okx-wallet",
    name: "OKX Wallet",
    iconUrl: "/images/okx.jpg",
    iconBackground: "#000000",
    installed: !shouldUseWalletConnect ? isOKXWalletInjected : void 0,
    downloadUrls: {
      browserExtension:
        "https://chrome.google.com/webstore/detail/okx-wallet/mcohilncbfahbmgdjkbpemcciiolgcge",
      android:
        "https://play.google.com/store/apps/details?id=com.okinc.okex.gp&pli=1",
      ios: "https://apps.apple.com/by/app/okx-buy-bitcoin-eth-crypto/id1327268470",
      qrCode: "https://www.okx.com/download",
    },
    createConnector: () => {
      const connector = shouldUseWalletConnect
        ? getWalletConnectConnector({ chains })
        : new InjectedConnector({
            chains,
            options,
          });

      return {
        connector,
        mobile: {
          getUri: async () => {
            if (connector.getProvider) {
              const provider = await connector.getProvider();
              const { uri } = (provider as any).connector || {};

              return isAndroid()
                ? uri
                : `https://www.okx.com/download?uri=${encodeURIComponent(uri)}`;
            }

            return "";
          },
        },
        extension: {
          learnMoreUrl: "https://www.okx.com/cn/web3",
          instructions: {
            steps: [
              {
                description:
                  "We recommend pinning OKX Wallet to your taskbar for quicker access to your wallet.",
                step: "install" as InstructionStepName,
                title: "Install the OKX Wallet extension",
              },
              {
                description:
                  "Be sure to back up your wallet using a secure method. Never share your secret phrase with anyone.",
                step: "create" as InstructionStepName,
                title: "Create or Import a Wallet",
              },
              {
                description:
                  "Once you set up your wallet, click below to refresh the browser and load up the extension.",
                step: "refresh" as InstructionStepName,
                title: "Refresh your browser",
              },
            ],
          },
        },
        qrCode: {
          getUri: async () => {
            if (connector.getProvider) {
              const provider = await connector.getProvider();
              const { uri } = (provider as any).connector || {};
              return uri;
            }

            return "";
          },
          instructions: {
            learnMoreUrl: "https://www.okx.com/",
            steps: [
              {
                description:
                  "We recommend putting OKX on your home screen for faster access to your wallet.",
                step: "install" as InstructionStepName,
                title: "Open the OKX app",
              },
              {
                description:
                  "After you scan, a connection prompt will appear for you to connect your wallet.",
                step: "scan" as InstructionStepName,
                title: "Tap the scan button",
              },
            ],
          },
        },
      };
    },
  };
};
