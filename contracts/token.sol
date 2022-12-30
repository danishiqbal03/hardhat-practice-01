// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.5.0 <0.9.0;

contract Token{
    string public name = "Danish Token";
    string public symbol = "DHT";
    uint256 public totalSupply = 10000;

    address public owner;

    mapping(address=>uint256) balances;

    constructor(){
        balances[msg.sender] = totalSupply;
        owner=msg.sender;
    }

    function transfer(address _to, uint256 _amount) external{
        require(balances[msg.sender] >= _amount, "account has insufficient balance");
        balances[msg.sender] -= _amount;
        balances[_to] += _amount;
    }
    
    function balanceOf(address account) external view returns (uint256){
        require(msg.sender == account, "You can't access the information");
        return balances[account];
    }
}