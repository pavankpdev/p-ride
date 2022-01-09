// SPDX-License-Identifier: MIT
pragma solidity 0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract PriToken is ERC20 {
    address public owner;

    constructor() public ERC20("Pride Token", "PRI") {
        owner = msg.sender;
        uint256 supply = 1000000000 ether; // 1 billion supply
        _mint(msg.sender, supply);
    }

    function mint(address to, uint256 amount) external {
        require(msg.sender == owner, "Minting is allowed only by owner.");
        _mint(to, amount);
    }

    function burn(uint256 amount) external {
        _burn(msg.sender, amount);
    }
}
