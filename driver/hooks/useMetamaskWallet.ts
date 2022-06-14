import { useCallback, useState } from "react";
import Web3 from "web3";

// UTILS
import { isConnectedToAllowedNetwork } from "utils/isConnectedToAllowedChains";

// CONFIGS
import { allowedChains } from "configs/allowedChains";

/**
 * @param setAccount id of account
 * @returns if account is connected
 */

export function useMetaMaskWallet() {
    const [account, setAccount] = useState<string | null>();

    const isConnected = useCallback(async () => {
        // await window?.ethereum.enable();
        if (typeof window?.ethereum !== "undefined") {
            const web3 = new Web3(Web3.givenProvider || "ws://localhost:8546");
            const account = await window.ethereum.request({
                method: "eth_requestAccounts",
            });
            setAccount(account);
            try {
                let timestamp = Date.now();
                const message = timestamp.toString();
                const hash = web3.utils.sha3(message) as string;
                const accounts = await web3.eth.getAccounts();

                const signature = await web3.eth.personal.sign(hash, accounts[0], "");
                setAccount(accounts[0]);
            } catch (err) {
                console.log("MetaMask not connected");
            }
        }
    }, []);

    const connectWallet = useCallback(async (cb?: any) => {
        // await window?.ethereum.enable();
        if (typeof window.ethereum !== "undefined") {
            console.log("MetaMask is installed!");
            const web3 = new Web3(Web3.givenProvider || "ws://localhost:8546");
            const account = await window.ethereum.request({
                method: "eth_requestAccounts",
            });
            setAccount(account);
            try {
                // await window.ethereum.enable();
                const chainId = await web3.eth.getChainId();
                const isConnectedToAllowedChain = await isConnectedToAllowedNetwork(
                    chainId
                );

                if (!isConnectedToAllowedChain) {
                    try {
                        await window.ethereum.request({
                            method: "wallet_switchEthereumChain",
                            params: [{ chainId: allowedChains[0].hx }], // chainId must be in hexadecimal numbers
                        });
                    } catch (err: any) {
                        throw new Error(err);
                    }
                }
                const accounts = await web3.eth.getAccounts();
                setAccount(accounts[0]);
                if (cb) cb(accounts[0]);
                return true;
            } catch (err) {
                // User denied access
                console.error(err);
                return false;
            }
        }
    }, []);

    const signInWithMetamask = useCallback(async () => {
        try {
            const web3 = new Web3(Web3.givenProvider || "ws://localhost:8546");
            let timestamp = Date.now();
            const message = timestamp.toString();
            const hash = web3.utils.sha3(message) as string;
            const accounts = await web3.eth.getAccounts();
            const signature = await web3.eth.personal.sign(hash, accounts[0], "");
            return { signature, account: accounts[0] };
        } catch (error) {
            throw new Error("Authenticaton Failed.");
        }
    }, [])

    return { account, setAccount, connectWallet, isConnected, signInWithMetamask };
}