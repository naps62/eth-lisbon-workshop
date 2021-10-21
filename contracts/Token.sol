// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import { ERC20 } from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import { Ownable } from "@openzeppelin/contracts/access/Ownable.sol";

contract Token is ERC20, Ownable {

  constructor() ERC20("ETH Lisbon Coin", "ETH-LX") {
    _mint(msg.sender, 10);
  }

  function mint(uint amount) public {
    _mint(msg.sender, amount);
  }

  function publicFunction() public {
    _mint(msg.sender, 10);
  }

  function privateFunction() private {
    _mint(msg.sender, 10);
  }
}







contract TokenVault {
  Token token;
  mapping(address => uint256) public balances;

  constructor(address _token) {
    token = Token(_token);
  }

  function deposit(Token otherToken) public DoesNotChangeBalance {
    require(b > 10);

    b += amount;

    otherToken.dangerousFunction();
  }

  function withdraw(uint256 amount) public {
    balances[msg.sender] -= amount;

    token.transfer(msg.sender, amount);
  }
}

function Token is ERC20 {
  function dangerousFunction() {
    TokenVault(msg.sender).deposit(...);
  }
}
