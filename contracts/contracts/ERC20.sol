// SPDX-License-Identifier: MIT
pragma solidity 0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract PRIToken is ERC20 {
    address public owner;

    constructor() public ERC20("Pride", "PRI") {
        _mint(msg.sender, 10000 * 10**18);
        owner = msg.sender;
    }

    function mint(address to, uint256 amount) external {
        require(msg.sender == owner, "Minting is allowed only by owner.");
        _mint(to, amount);
    }

    function burn(uint256 amount) external {
        _burn(msg.sender, amount);
    }
}
