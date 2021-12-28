// SPDX-License-Identifier: MIT

pragma solidity 0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";

contract Driver is Ownable {

    uint private driversCount = 0;
    address private driverWalletAddr;

    mapping (uint => address) private drivers;

    function createDriver( address _walletAddr ) public onlyOwner {
        driversCount++;
        drivers[driversCount] = _walletAddr;
    }

    function getDriver (uint driversId) view public onlyOwner returns (address) {
        return drivers[driversId];
    }

}