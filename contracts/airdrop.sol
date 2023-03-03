// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

// import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract ArToken is ERC20 {
    address owner;

    constructor(string memory _name, string memory symbol)
        ERC20(_name, symbol)
    {
        owner = msg.sender;
        _mint(msg.sender, 1000000000 * 1e18);
    }
}
