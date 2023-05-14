import { ConnectButton } from "@rainbow-me/rainbowkit";
import ActionButton from "../ActionButton";
import Image from "next/image";

function WalletConnectButton() {
  return (
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
                    <button
                      className="inline-block py-2 md:hidden text-primary hover:text-primary/80"
                      onClick={openConnectModal}
                    >
                      Connect Wallet
                    </button>
                    <div className="hidden md:inline-block">
                      <ActionButton
                        title="Connect Wallet"
                        onClickHandler={openConnectModal}
                      />
                    </div>
                  </>
                );
              }

              if (chain.unsupported) {
                return (
                  <ActionButton
                    title="Wrong network"
                    onClickHandler={openChainModal}
                  />
                );
              }

              return (
                <div className="mt-4 mb-2 md:my-0">
                  <button onClick={openAccountModal} type="button">
                    <Image
                      src={account.ensAvatar ?? "/images/user-icon.svg"}
                      width="36"
                      height="36"
                      alt="User Icon"
                      className="hover:opacity-80 transition"
                    />
                  </button>
                </div>
              );
            })()}
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
}

export default WalletConnectButton;
