// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

contract SendMoney {
    address public owner;
    uint public totalReceived;

    mapping(address => uint) public userBalances;

    event Deposited(address indexed user, uint amount);
    event Withdrawn(address indexed user, uint amount);

    modifier onlyOwner() {
        require(msg.sender == owner, "Not the contract owner");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    function deposit() public payable {
        require(msg.value > 0, "Must send some ETH");

        userBalances[msg.sender] += msg.value;
        totalReceived += msg.value;

        emit Deposited(msg.sender, msg.value);
    }

    function getContractBalance() public view returns (uint) {
        return address(this).balance;
    }

    function withdraw(uint amount) public onlyOwner {
        require(amount <= 1 ether, "Cannot withdraw more than 1 ETH at once");
        require(amount <= address(this).balance, "Not enough ETH in contract");

        payable(owner).transfer(amount);

        emit Withdrawn(owner, amount);
    }
}
