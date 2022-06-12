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
    struct USERS {
        address customer;
        address driver;
    }

    struct STATUS {
        bool isCancelled;
        bool isComplete;
        bool isConfirmed;
        appUser wasCancelledBy;
    }

    struct RIDE_DETAILS {
        string pickup;
        string destination;
        uint256 distance;
        uint256 price;
    }

    struct RIDE {
        uint id;
        USERS users;
        STATUS status;
        RIDE_DETAILS ride;
        VEHICLE_INFO vehicle;
        string timestamp;
    }

    mapping(uint256 => RIDE) private _rides;

    function confirmRide(USERS memory _user, STATUS memory _status, RIDE_DETAILS memory _details, string memory _timestamp)
        public
        returns (uint256)
    {
        rideCount++;
        USERS memory user = _user;
        STATUS memory status = _status;
        RIDE_DETAILS memory details = _details;
        RIDE memory ride;
        ride.id = rideCount;
        ride.users = user;
        ride.status = status;
        ride.ride = details;
        ride.vehicle = _vehicles[_user.driver];
        ride.timestamp = _timestamp;

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

    function cancelRide(uint256 _rideId, appUser _wasCancelledBy, string memory _timestamp) public {
        RIDE memory ride = _rides[_rideId];
        ride.status.isCancelled = true;
        ride.status.wasCancelledBy = _wasCancelledBy;
        ride.timestamp = _timestamp;
        _rides[_rideId] = ride;
    }

    function completeRide(uint256 _rideId, string memory _timestamp) public {
        RIDE memory ride = _rides[_rideId];
        ride.status.isComplete = true;
        ride.timestamp = _timestamp;
        _rides[_rideId] = ride;
    }

    function getRideCount() public view returns(uint256) {
        return rideCount;
    }
}
