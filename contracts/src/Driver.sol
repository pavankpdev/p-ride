// SPDX-License-Identifier: MIT

pragma solidity 0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";

contract Driver is Ownable {
    struct DRIVER {
        string fullname;
        string email;
        string dob;
        string driverAddress;
        string govtID;
        string picture;
        string DL;
        address wallet;
    }

    mapping(address => DRIVER) private drivers;

    function createDriver(address _walletAddr, DRIVER memory _driver)
        public
        onlyOwner
        returns (address)
    {
        DRIVER memory driver;

        driver = _driver;
        drivers[_walletAddr] = driver;

        return _walletAddr;
    }

    function updateDriver(address _walletAddr, DRIVER memory _driver)
        public
        onlyOwner
        returns (address)
    {
        DRIVER memory driver;

        driver = _driver;
        drivers[_walletAddr] = driver;

        return _walletAddr;
    }

    function getDriver(address _walletAddr)
        public
        view
        onlyOwner
        returns (DRIVER memory)
    {
        DRIVER memory driver = drivers[_walletAddr];
        return driver;
    }
}
