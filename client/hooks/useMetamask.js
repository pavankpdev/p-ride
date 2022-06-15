import { useCallback, useState } from "react";
import Web3 from "web3";

// UTILS
import { isConnectedToAllowedNetwork } from "../utils/isConnectedToAllowedChains";

// CONFIGS
import { allowedChains } from "../config/allowedChains";

/**
 * @param setAccount id of account
 * @returns if account is connected
 */

export function useMetaMaskWallet() {
   const [account, setAccount] = useState();

   const isConnected = useCallback(async () => {
      // await window?.ethereum.enable();
      if (typeof window.ethereum !== "undefined") {
         const web3 = new Web3(window.ethereum);
         const account = await window.ethereum.request({
            method: "eth_requestAccounts",
         });
         setAccount(account);
         try {
            let timestamp = Date.now();
            var message = timestamp.toString();
            var hash = web3.utils.sha3(message) ;
            var accounts = await web3.eth.getAccounts();

            var signature = await web3.eth.personal.sign(hash, accounts[0], "");
            setAccount(accounts[0]);
         } catch (err) {
            console.log("MetaMask not connected");
         }
      }
   }, []);

   const connectWallet = useCallback(async (cb) => {
      // await window?.ethereum.enable();
      if (typeof window.ethereum !== "undefined") {
         console.log("MetaMask is installed!");
         const web3 = new Web3(window.ethereum);
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
               } catch (err) {
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

   return { account, setAccount, connectWallet, isConnected };
}