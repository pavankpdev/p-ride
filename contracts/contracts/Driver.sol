// SPDX-License-Identifier: MIT

pragma solidity 0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";

contract Driver is Ownable {
    uint256 private driversCount = 0;
    address internal driverWalletAddr;

    mapping(uint256 => address) private drivers;

    function createDriver(address _walletAddr)
        public
        onlyOwner
        returns (uint256)
    {
        driversCount++;
        drivers[driversCount] = _walletAddr;

        return driversCount;
    }

    function getDriver(uint256 driversId)
        public
        view
        onlyOwner
        returns (address)
    {
        return drivers[driversId];
    }
}
