// SPDX-License-Identifier: MIT
pragma solidity 0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";

contract Vehicle is Ownable {

    enum VEHICLE_TYPE { MINI, PRIME, SEDAN, SUV }

    struct VEHICLE_INFO {
        VEHICLE_TYPE vehicleType;
        string vehicleDocumentsUrl;
        string vehicle_no;
        address owner;
    }

    mapping (address => VEHICLE_INFO) private _vehicles;

    VEHICLE_INFO _vehicle;

    function addVehicle (address owner, string memory vehicleDocumentsUrl, string memory vehicle_no, VEHICLE_TYPE vehicleType ) public onlyOwner {
        _vehicle = VEHICLE_INFO(vehicleType, vehicleDocumentsUrl, vehicle_no, owner);
        _vehicles[owner] = _vehicle;
    }

    function getVehicle (address owner) public view onlyOwner returns (VEHICLE_INFO memory) {
        return _vehicles[owner];
    }

}