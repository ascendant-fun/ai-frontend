import { Binder } from "../../../hooks/useBind";
import { ClaimStatus, CLAIM_STATUS } from "../FortuneResult";
import LoadingIcon from "../../Icon/Loading";
import { useContractRead, Address, useContractWrite, usePrepareContractWrite } from "wagmi";
import { SBT_CONTRACT_ADDRESS } from "../../../../config";
import { abi } from '../../../contracts/AscSbtAbi';
import { BigNumber } from "ethers";
import { useEffect } from "react";
import { toast } from 'react-toastify';
import { event } from "nextjs-google-analytics";

interface SbtMintButtonProps {
    address: Address;
    claimStatus: Binder<ClaimStatus>;
    personalityId: number;
}

function SbtMintButton({ address, claimStatus, personalityId }: SbtMintButtonProps) {
    // connect to contract
    const contractRead = useContractRead({
        address: SBT_CONTRACT_ADDRESS,
        abi: abi,
        functionName: "balanceOf",
        args: [address]
    });

    const { config } = usePrepareContractWrite({
        address: SBT_CONTRACT_ADDRESS,
        abi: abi,
        functionName: 'mint',
        args: [
            BigNumber.from(1), //number, always 1
            BigNumber.from(personalityId) // personality ID
        ]
    })
    const { isLoading, isSuccess, isError, error, write } = useContractWrite(config)

    function getClaimButtonClasses() {
        if (claimStatus.value === CLAIM_STATUS.DISABLED) {
            return 'opacity-20';
        }

        if (claimStatus.value === CLAIM_STATUS.CLAIMED) {
            return 'opacity-50';
        }
    }

    function claimButtonContent(): string {
        if (claimStatus.value === CLAIM_STATUS.CLAIMED) return 'Claimed'

        return 'Free Mint'
    }

    function handleClaimSBT() {
        if (write === undefined) return;

        event("claim_sbt_button_clicked_" + name, {
            category: "FortuneReport",
            label: 'claim sbt button clicked on congratulation page',
        });

        write();
    }

    useEffect(() => {
        if (claimStatus.value === CLAIM_STATUS.DISABLED || claimStatus.value === CLAIM_STATUS.CLAIMED) {
            return;
        }

        if (isLoading) {
            claimStatus.setter(CLAIM_STATUS.CLAIMING);
        }
    }, [isLoading, claimStatus]);

    useEffect(() => {
        if (claimStatus.value === CLAIM_STATUS.CLAIMED || !isSuccess) return;

        toast.success('Claim SBT transaction sent successfully!');
        claimStatus.setter(CLAIM_STATUS.CLAIMED);
    }, [isSuccess, claimStatus]);

    useEffect(() => {
        if (!isError || !error) return;


        // reset active state
        // toast.error(error.message || 'Unknown error');
        claimStatus.setter(CLAIM_STATUS.ACTIVE);
    }, [isError, error]);

    const buttonText = claimButtonContent();
    if (contractRead.isFetched && contractRead.data !== undefined) {
        const mintedCount = contractRead.data.toNumber();

        if (mintedCount > 0) {
            claimStatus.setter(CLAIM_STATUS.CLAIMED);
        }
    }

    return (
        <button
            className={`py-2 px-5 md:px-16 md:py-5 mx-auto md:mx-0 rounded-[4.5px] mt-4 text-base md:text-[22px] md:leading-[26px] text-secondary justify-center flex transition-all bg-transparent border border-white/30 font-bold ${getClaimButtonClasses()}`}
            disabled={claimStatus.value !== CLAIM_STATUS.ACTIVE}
            onClick={handleClaimSBT}
        >
            {
                claimStatus.value === CLAIM_STATUS.CLAIMING && (
                    <div className="mr-2 flex">
                        <LoadingIcon />
                    </div>
                )
            }
            {buttonText}
        </button>
    );
}

export default SbtMintButton;
