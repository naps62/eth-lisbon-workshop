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
import { TokenVault } from "../../typechain/TokenVault";
import TokenVaultArtifact from "../../artifacts/contracts/Token.sol/TokenVault.json";

let signers;
let owner: any;
let alice: any;
let bob: any;
let charlie: any;
let token: Token;
let vault: TokenVault;

describe("Token", () => {
  beforeEach(async () => {
    signers = await ethers.getSigners();
    owner = signers[0];
    alice = signers[1];
    bob = signers[1];
    charlie = signers[1];

    token = (await deploy(owner, TokenArtifact, [])) as Token;
    vault = (await deploy(owner, TokenVaultArtifact, [
      token.address,
    ])) as TokenVault;
  });

  it("can transfer tokens", async () => {
    expect(await token.totalSupply()).to.equal(10);
  });

  it("can mint new tokens", async () => {
    await token.mint(13);

    expect(await token.totalSupply()).to.equal(23);
  });

  it("can transfer tokens", async () => {
    await token.transfer(alice.address, 1);

    expect(await token.balanceOf(owner.address)).to.equal(9);
    expect(await token.balanceOf(alice.address)).to.equal(1);
  });

  it("can deposit tokens", async () => {
    await token.approve(vault.address, 5);
    await vault.deposit(5);

    expect(await token.balanceOf(owner.address)).to.equal(5);
    expect(await token.balanceOf(vault.address)).to.equal(5);

    expect(await vault.balances(owner.address)).to.equal(5);

    const tx = vault.connect(alice).withdraw(5);

    await expect(tx).to.be.reverted;

    // expect(await vault.balances(owner.address)).to.equal(0);
  });

  it("public gas cost", async () => {
    await token.publicFunction();
  });
});
