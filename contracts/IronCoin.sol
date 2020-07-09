pragma solidity ^0.5.0;

import "./ownership/Ownable.sol";

/// @title IronCoin Contract
/// @dev This contract's goal is to provide a simple, working implementation of
///  ERC-20 token in order to be used with a Ruby frontend!
contract IronCoin is Ownable {
  mapping (address => uint) balances;

  event Transfer (
    address indexed _from,
    address indexed _to,
    uint _value
  );

  event Approval (
    address indexed _owner,
    address indexed _spender,
    uint _value
  );

  string public version; // Version of the contract, following Semver.
  string public name = "EPSI";
  string public symbol = "EPI";
  uint8  public decimals = 5;

  constructor(string memory _version) Ownable() public {
    version = _version;
    balances[msg.sender] = 1000000000;
  }

  function totalSupply() public pure returns (uint) {
    return 1000000000;
  }

  function balanceOf(address _owner) public view returns (uint) {
    return balances[_owner];
  }

  function transfer(address _to, uint _value) public returns (bool success) {
    address _from = msg.sender;
    require(balances[msg.sender] >= _value);
    emit Transfer(_from, _to, _value);
    balances[_from] -= _value;
    balances[_to] += _value;
    return true;
  }

  mapping (address => mapping (address => uint)) allowances;

  function approve(
    address _spender,
    uint _value
  ) public returns (bool success) {
    address myself = msg.sender;
    allowances[myself][_spender] = _value;
    emit Approval(myself, _spender, _value);
    return true;
  }

  function transferFrom(
    address _from,
    address _to,
    uint _value
  ) public returns (bool success) {
    bool allowed = allowances[_from][msg.sender] >= _value;
    bool enoughMoney = balances[_from] >= _value;
    require(enoughMoney && allowed);
    emit Transfer(_from, _to, _value);
    balances[_from] -= _value;
    balances[_to] += _value;
    allowances[_from][msg.sender] -= _value;
    return true;
  }

  function allowance(
    address _owner,
    address _spender
  ) public view returns (uint remaining) {
    return allowances[_owner][_spender];
  }
}
