// SPDX-License-Identifier: MIT
pragma solidity 0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";

contract Customer is Ownable {

    uint private userCount = 0;
    address private userWalletAddr;

    mapping (uint => address) private customers;

    function createCustomer( address _walletAddr ) public onlyOwner {
        userCount++;
        customers[userCount] = _walletAddr;
    }

    function getCustomer (uint userId) view public onlyOwner returns (address) {
        return customers[userId];
    }

}