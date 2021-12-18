pragma solidity ^0.8.0;

contract Driver {

    uint public driversCount = 0;

    struct User{
        string fullname;
        string email;
        address walletAddr;
        uint phno;
    }

    mapping (uint => User) public drivers;

    function createDriver( address _walletAddr , string memory _fullname, string memory _email, uint _phno ) public {
        driversCount++;
        drivers[driversCount] = User({
        fullname: _fullname,
        email: _email,
        walletAddr: _walletAddr,
        phno: _phno
        });
    }

    function getDriver (uint driversId) view public returns (User memory) {
        return drivers[driversId];
    }

}