import { allowedChains, AllowedChainConfig } from "configs/allowedChains";

export const isConnectedToAllowedNetwork = async (chainId: number) => {
    return !(
        allowedChains.length > 0 &&
        !allowedChains.find((chain: AllowedChainConfig) => chain.id === chainId)
    );
};