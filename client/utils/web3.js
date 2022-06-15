import web3 from 'web3';

// fallback url helpful for loading web3 data even if user not connected to metamask
export default class Web3 {
	 static _instance;

	 static get instance() {
		if (Web3._instance) return Web3._instance;
		Web3._instance = new web3(web3.givenProvider);
		return Web3._instance;
	}

	 static isEnabled() {
		if(typeof window !== 'undefined')
			return typeof (window).ethereum !== 'undefined';
	}
}