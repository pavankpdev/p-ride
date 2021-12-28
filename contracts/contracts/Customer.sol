// SPDX-License-Identifier: MIT
pragma solidity 0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";

contract Customer is Ownable {
    uint256 private userCount = 0;
    address internal userWalletAddr;

    mapping(uint256 => address) private customers;

    function createCustomer(address _walletAddr)
        public
        onlyOwner
        returns (uint256)
    {
        userCount++;
        customers[userCount] = _walletAddr;

        return userCount;
    }

    function getCustomer(uint256 userId)
        public
        view
        onlyOwner
        returns (address)
    {
        return customers[userId];
    }
}
