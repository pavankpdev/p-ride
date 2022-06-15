import { allowedChains } from "../config/allowedChains";

export const isConnectedToAllowedNetwork = async (chainId) => {
	return !(
		allowedChains.length > 0 &&
		!allowedChains.find((chain) => chain.id === chainId)
	);
};