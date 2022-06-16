import web3 from 'web3';

// fallback url helpful for loading web3 data even if user not connected to metamask
// for mumbai testnet: https://rpc-mumbai.maticvigil.com
// for bsc testnet: https://data-seed-prebsc-1-s1.binance.org:8545/
export default class Web3 {
	private static _instance: web3;

	public static get instance() {
		if (Web3._instance) return Web3._instance;
		Web3._instance = new web3(web3.givenProvider);
		return Web3._instance;
	}

	public static isEnabledInBrowser() {
		return typeof (window as any).ethereum !== 'undefined';
	}
}
