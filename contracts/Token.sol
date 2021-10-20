// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import { ERC20 } from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import { Ownable } from "@openzeppelin/contracts/access/Ownable.sol";


contract Token is ERC20, Ownable {
  constructor() ERC20("ETH Lisbon Coin", "ETH-LX") {
    _mint(msg.sender, 10);
  }
}
