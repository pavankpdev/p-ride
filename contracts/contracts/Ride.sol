// SPDX-License-Identifier: MIT
pragma solidity 0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "./Customer.sol";
import "./Driver.sol";

contract Ride is Ownable {
    uint256 rideCount;

    enum appUser {
        Driver,
        Customer
    }

    // Ride data type
    struct RIDE_INFO {
        address driver;
        address customer;
        string pickup;
        string destination;
        uint256 distance;
        string vehicle;
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
        _rides[rideCount] = RIDE(rideCount, _rideDetails);

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
