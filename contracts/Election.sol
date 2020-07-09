pragma solidity ^0.5.0;

contract Election {
  struct voter {
    string name;
    bool voted;
    uint votesReceived;
    bool isCandidate;
  }
  mapping (address => voter) voters;

  mapping (address => bool) aVote;
  mapping (address => uint) voterCount;
  mapping (address => bool) isCandidate;

  uint candidatesCount;

  constructor() {}

  function postulate1 () public returns (bool success) {
    require(candidatesCount < 10);
    isCandidate[msg.sender] = true;
    candidatesCount += 1;
    return true;
  }

  function postulate2 () public returns (bool success) {
    require(candidatesCount < 10);
    voters[msg.sender].isCandidate = true;
    candidatesCount += 1;
    return true;
  }

  function vote1 (address _candidateAddress)
  public returns (bool success) {
    require(aVote[msg.sender] == false);
    require(isCandidate[_candidateAddress] == true);
    voterCount[_candidateAddress]++;
    aVote[msg.sender] = true;
    return true;
  }

  function vote2 (address idCandidat) public {
    require(
      !voters[msg.sender].voted &&
      idCandidat != address(0) &&
      voters[_candidateAddress].isCandidate == true
    );
    voters[msg.sender].voted = true;
    voters[idCandidat].votesReceived++;
  }

  function vote3 (address _candidat) public returns (bool success) {
    address _voter = msg.sender;
    require(hasVoted[_voter] != true); //_voter n'a pas déjà voté
    require(isCandidate[_candidat] == true); // _candidat est bien candidat
    voteSummary[_candidat].votesCount++;
    hasVotes[_voter] = true;
    return true;
  }

  function getVotes1 (address _candidat) public returns (uint count) {
    return voterCount[_candidat];
  }

  function getVotes2 (address _candidat) public returns (uint count) {
    return voters[_candidat].votesReceived;
  }

  function getName (address _candidat) public returns (string name) {
    return voters[_candidat].name;
  }

  function getvote(
    address _voterAddress,
    string memory _voterName
  ) {
    require(voters[_voterAddress].name == _voterName);
    return voters[_voterAddress].votesReceived;
  }
}
