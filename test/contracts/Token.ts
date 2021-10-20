import chai from "chai";
import { ethers, network, waffle } from "hardhat";
import { solidity } from "ethereum-waffle";

chai.use(solidity);
const { BigNumber: BN } = ethers;
const { parseEther } = ethers.utils;
const { expect } = chai;
const { deployContract: deploy } = waffle;

import { Token } from "../../typechain/Token";
import TokenArtifact from "../../artifacts/contracts/Token.sol/Token.json";

let signers;
let owner: any;
let alice: any;
let bob: any;
let charlie: any;
let token: Token;

describe("Reentrancy", () => {
  beforeEach(async () => {
    signers = await ethers.getSigners();
    owner = signers[0];
    alice = signers[1];
    bob = signers[1];
    charlie = signers[1];

    token = (await deploy(owner, TokenArtifact, [])) as Token;
  });

  it("can transfer tokens", async () => {
    expect(await token.totalSupply()).to.equal(10);
  });
});
