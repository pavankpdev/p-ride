import web3 from 'web3';

export default class Web3 {
    static _instance;

    static get instance() {
        if (Web3._instance) return Web3._instance;
        Web3._instance = new web3(web3.givenProvider);
        return Web3._instance;
    }

    static isEnabledInBrowser() {
        return typeof window.ethereum !== 'undefined';
    }
}
