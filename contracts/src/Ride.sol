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
    struct RIDE_INFO {
        address driver;
        address customer;
        string pickup;
        string destination;
        uint256 distance;
        VEHICLE_INFO vehicle;
        uint256 price;
        uint256 noOfPassengers;
        bool isCancelled;
        bool isComplete;
        appUser wasCancelledBy;
        string bookingTime;
        string completeTime;
        string cancelledTime;
    }

    struct RIDE {
        uint256 rideId;
        RIDE_INFO rideDetails;
    }

    mapping(uint256 => RIDE) private _rides;


    function confirmRide(RIDE_INFO memory _rideDetails)
        public
        returns (uint256)
    {
        rideCount++;
        RIDE_INFO memory _rideInfo;
        _rideInfo.driver = _rideDetails.driver;
        _rideInfo.customer = _rideDetails.customer;
        _rideInfo.pickup = _rideDetails.pickup;
        _rideInfo.destination = _rideDetails.destination;
        _rideInfo.distance = _rideDetails.distance;
        _rideInfo.vehicle = getVehicle(_rideDetails.driver);
        _rideInfo.price = _rideDetails.price;
        _rideInfo.noOfPassengers = _rideDetails.noOfPassengers;
        _rideInfo.isComplete = false;
        _rideInfo.isCancelled = false;
        _rideInfo.wasCancelledBy = appUser.NONE;
        _rideInfo.bookingTime = "july 7";
        _rideInfo.completeTime = "";
        _rideInfo.cancelledTime = "";


       _rides[rideCount] = RIDE(rideCount, _rideInfo);

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
