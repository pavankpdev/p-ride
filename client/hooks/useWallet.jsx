import React, { useCallback, useState } from 'react'
import Web3 from 'web3'
/**
 * @param setAccount id of account
 * @returns if account is connected
 */
export function useMetaMaskWallet() {
    const [account, setAccount] = useState()

    const isConnected = useCallback(async () => {
        if (typeof window.ethereum !== 'undefined') {
            const web3 = new Web3(window.ethereum)
            try {
                const accounts = await web3.eth.getAccounts()
                setAccount(accounts[0])
                console.log(accounts)
            } catch (err) {
                console.log('MetaMask not connected')
            }
        }
    }, [])

    const connectWallet = useCallback(async (cb) => {
        if (typeof window.ethereum !== 'undefined') {

            try {
                const accounts = await window.ethereum
                    .request({ method: "eth_requestAccounts" })

                setAccount(accounts[0])
                if (cb) cb(accounts[0])
                return true
            } catch (err) {
                // User denied access
                console.error(err)
                return false
            }
        } else {
            // TODO:
            // handle error or redirect to metamask website.
        }
    }, [])

    const disconnectWallet = useCallback(async () => {
        if (typeof window.ethereum !== 'undefined') {
            const web3 = new Web3(window.ethereum)
            try {
                setAccount(null)
                return true
            } catch (err) {
                console.error(err)
                return false
            }
        }
    }, [])

    const signInWithMetamask = useCallback(async () => {
        try {
            const web3 = new Web3(Web3.givenProvider || "ws://localhost:8546");

            const timestamp = Date.now();
            const message = timestamp.toString();
            const hash = web3.utils.sha3(message);
            const accounts = await web3.eth.getAccounts();
            const signature = await web3.eth.personal.sign(hash, accounts[0], "");
            return { signature, account: accounts[0], message };
        } catch (error) {
            throw error;
        }
    }, [])

    return { account, setAccount, connectWallet, isConnected, disconnectWallet, signInWithMetamask }
}