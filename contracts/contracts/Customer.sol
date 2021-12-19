pragma solidity ^0.8.0;

contract Customer {

    uint public userCount = 0;

    struct User{
        string fullname;
        string email;
        address walletAddr;
        uint phno;
    }

    mapping (uint => User) public customers;

    function createCustomer( address _walletAddr , string memory _fullname, string memory _email, uint _phno ) public {
        userCount++;
        customers[userCount] = User({
        fullname: _fullname,
        email: _email,
        walletAddr: _walletAddr,
        phno: _phno
        });
    }

    function getCustomer (uint userId) view public returns (User memory) {
        return customers[userId];
    }

}