const { expect, use } = require("chai");
const { ethers, network } = require("hardhat");
const BN = require("ethers").BigNumber;

describe("Starting the testing", function() {
    let Registry
    let Nft
    let Account 
    let signers

    beforeEach(async function () {
        signers = await ethers.getSigners();
        
    })
})