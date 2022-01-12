// SPDX-License-Identifier: MIT
pragma solidity 0.8.0;
pragma experimental ABIEncoderV2;

import "@openzeppelin/contracts/access/Ownable.sol";
import "./Vehicle.sol";

contract Ride is Ownable, Vehicle {
    uint256 rideCount;

    enum appUser {
        Driver,
        Customer,
        NONE
    }

    // Ride data type
    struct RIDE {
        uint id;
        address driver;
        address customer;
        string pickup;
        string destination;
        uint256 distance;
        VEHICLE_INFO vehicle;
        uint256 price;
        string timestamp;
        uint256 noOfPassengers;
        bool isCancelled;
        bool isComplete;
        bool isConfirmed;
        appUser wasCancelledBy;
    }

    mapping(uint256 => RIDE) private _rides;

    function confirmRide(RIDE memory _rideDetails)
        public
        returns (uint256)
    {
        rideCount++;
        RIDE memory ride = _rideDetails;
        ride.id = rideCount;
        _rides[rideCount] = ride;

        return rideCount;
    }

    function getAllRides(uint256[] memory rideIds)
        public
        view
        returns (RIDE[] memory)
    {
        RIDE[] memory allRides;
        uint256 count = 0;

        for (uint256 i = 0; i < rideIds.length; i++) {
            uint256 rideId = rideIds[i];
            allRides[count] = _rides[rideId];
            count++;
        }

        return allRides;
    }

    function getRide(uint256 _rideId) public view returns (RIDE memory) {
        return _rides[_rideId];
    }
}
