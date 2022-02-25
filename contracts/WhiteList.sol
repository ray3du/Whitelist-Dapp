//SPDX-License-Identifier: MIT
pragma solidity ^0.8.1;

contract WhiteList{
    constructor(uint8 _maxNumOfAddresses){
        maxNumOfAddresses = _maxNumOfAddresses;
    }

    uint8 public numOfAddresses;
    uint8 public maxNumOfAddresses;
    mapping (address => bool) public usersAddresses;

    function getNumAddresses() public view returns (uint8){
        return numOfAddresses;
    }

    function setWhitelistAddress() public {
        require(!usersAddresses[msg.sender], "Address already exists");
        require(numOfAddresses < maxNumOfAddresses, "Max limit reached");
        usersAddresses[msg.sender] = true;
        numOfAddresses += 1;
    }
}