import BaseButton from "../Base/BaseButton";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { truncateStringInMiddle } from "../../../utils/truncateString";
import Image from "next/image";

type WalletConnectProps = {
  shouldBeConnected?: boolean;
  connectLabel?: string;
};

function WalletConnect({
  shouldBeConnected = true,
  connectLabel = "Connect Wallet",
}: WalletConnectProps) {
  return (
    <div>
      <ConnectButton.Custom>
        {({
          account,
          chain,
          openAccountModal,
          openChainModal,
          openConnectModal,
          authenticationStatus,
          mounted,
        }) => {
          // Note: If your app doesn't use authentication, you
          // can remove all 'authenticationStatus' checks
          const ready = mounted && authenticationStatus !== "loading";
          const connected =
            ready &&
            account &&
            chain &&
            (!authenticationStatus || authenticationStatus === "authenticated");

          return (
            <div
              {...(!ready && {
                "aria-hidden": true,
                style: {
                  opacity: 0,
                  pointerEvents: "none",
                  userSelect: "none",
                },
              })}
            >
              {(() => {
                if (!connected) {
                  return (
                    <>
                      <BaseButton
                        style="white"
                        isLoading={!ready}
                        loadingText={"Connecting wallet..."}
                        fullWidth={true}
                        onClickHandler={openConnectModal}
                      >
                        {connectLabel}
                      </BaseButton>
                    </>
                  );
                }

                if (chain.unsupported) {
                  return (
                    <BaseButton
                      style="white"
                      isLoading={!ready}
                      loadingText={"Connecting wallet..."}
                      fullWidth={true}
                      onClickHandler={openChainModal}
                    >
                      Wrong Network
                    </BaseButton>
                  );
                }

                if (shouldBeConnected !== undefined && !shouldBeConnected) {
                  return (
                    <BaseButton
                      style="white"
                      isLoading={!ready}
                      loadingText={"Connecting wallet..."}
                      fullWidth={true}
                      onClickHandler={openAccountModal}
                    >
                      <Image
                        src="/assets/wallet-icon.svg"
                        width="24"
                        height="24"
                        className="mr-2"
                        alt="Wallet icon"
                      />
                      {`Incorrect Wallet`}
                    </BaseButton>
                  );
                }

                return (
                  <BaseButton
                    style="white"
                    isLoading={!ready}
                    loadingText={"Connecting wallet..."}
                    fullWidth={true}
                    onClickHandler={openAccountModal}
                  >
                    <Image
                      src="/assets/wallet-icon.svg"
                      width="24"
                      height="24"
                      className="mr-2"
                      alt="Wallet icon"
                    />
                    {truncateStringInMiddle(account.address, 6, "......", 6, 4)}
                  </BaseButton>
                );
              })()}
            </div>
          );
        }}
      </ConnectButton.Custom>
    </div>
  );
}

export default WalletConnect;
