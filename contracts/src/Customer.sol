// SPDX-License-Identifier: MIT
pragma solidity 0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";

contract Customer is Ownable {
    struct USERS {
        string fullname;
        string email;
        string dob;
        string govtID;
        string picture;
        address wallet;
    }

    mapping(address => USERS) private customers;

    function createCustomer(address _walletAddr, USERS memory _customer)
        public
        onlyOwner
        returns (address)
    {
        USERS memory customer;

        customer = _customer;
        customers[_walletAddr] = customer;

        return _walletAddr;
    }

    function updateCustomer(address _walletAddr, USERS memory _customer)
        public
        onlyOwner
        returns (address)
    {
        USERS memory customer;

        customer = _customer;
        customers[_walletAddr] = customer;

        return _walletAddr;
    }

    function getCustomer(address _walletAddr)
        public
        view
        onlyOwner
        returns (USERS memory)
    {
        USERS memory customer = customers[_walletAddr];
        return customer;
    }
}
