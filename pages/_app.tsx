import "../styles/globals.css";
import type { AppProps } from "next/app";
import "@rainbow-me/rainbowkit/styles.css";
import { ALCHEMY_KEY, CONTRACT_NETWORK, MAINNET } from "../config";
import { DefaultSeo } from "next-seo";

import {
  RainbowKitProvider,
  midnightTheme,
  connectorsForWallets,
} from "@rainbow-me/rainbowkit";
import {
  injectedWallet,
  rainbowWallet,
  metaMaskWallet,
  coinbaseWallet,
  walletConnectWallet,
} from "@rainbow-me/rainbowkit/wallets";
import { chain, configureChains, createClient, WagmiConfig } from "wagmi";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";
import { GoogleAnalytics } from "nextjs-google-analytics";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import AppTemplate from "../components/App";
import { okxWallet } from "../utils/okx";

const network = CONTRACT_NETWORK === MAINNET ? [chain.mainnet] : [chain.goerli];

const { chains, provider } = configureChains(network, [
  alchemyProvider({ apiKey: ALCHEMY_KEY }),
  publicProvider(),
]);

const connectors = connectorsForWallets([
  {
    groupName: "Popular",
    wallets: [
      injectedWallet({ chains }),
      okxWallet({ chains }),
      metaMaskWallet({ chains }),
      rainbowWallet({ chains }),
      coinbaseWallet({ appName: "ASC", chains }),
      walletConnectWallet({ chains }),
    ],
  },
]);

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains} theme={midnightTheme()}>
        <DefaultSeo
          openGraph={{
            type: "website",
            locale: "en_IE",
            url: "https://www.ascendant.fun/",
            siteName: "Ascendant Fortune",
          }}
          twitter={{
            handle: "@Ascendant_astro",
            site: "@site",
            cardType: "summary_large_image",
          }}
        />
        <GoogleAnalytics trackPageViews />
        <AppTemplate>
          <Component {...pageProps} />
        </AppTemplate>
        <ToastContainer theme="dark" />
      </RainbowKitProvider>
    </WagmiConfig>
  );
}
