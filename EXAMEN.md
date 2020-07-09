# Blockchain Interrogation

# Questions

1. Expliquer comment faire pour programmer sur la blockchain Ethereum et comment Ethereum rend cela possible (technologie sous-jacente, quelles étapes sont nécessaires, etc.)

2. Expliquer la différence entre une blockchain locale, une blockchain de test (testnet) et une blockchain de production (mainnet).

3. Donner et expliquer le rôle des différentes fonctions et évènements pour un contrat de tokens ERC20.

Bonus : Qu’est-ce qu’un crypto-collectible ? À quoi pourrait-on l’identifier dans le monde physique ?

# Implémentation

Dans la suite des exercices, nous souhaitons rajouter des fonctionnalités à notre contrat de token ERC20. (Voir annexe) Les deux exercices sont indépendants.

# Exercice 1 – Minting

À partir du contrat ERC20, nous voulons rajouter la possibilité d’émettre de la monnaie (`to mint` en anglais). Nous allons procéder en plusieurs étapes :

1. Définir une fonction `mint`, qui ajoutera une valeur `toAdd` à la réserve de tokens totale. Attention, ces tokens doivent être rattaché à un individu. Bonus : Seul le propriétaire du contrat pourra appeler la fonction.
2. Nous souhaitons maintenant être capable d’ajouter la possibilité à certaines personnes désignées d’émettre de la monnaie.
   - Proposer un moyen de gérer les individus pouvant émettre de la monnaie.
   - Écrire une fonction `addMinter`, permettant d’ajouter un individu à l’ensemble des personnes capable d’émettre de la monnaie. Bonus : Seul le propriétaire du contrat pourra appeler `addMinter`.
   - Modifier la fonction `mint` de façon à ce qu’elle ne puisse être appelée que par n’importe quelle personne autorisée. À qui appartiennent les nouveaux tokens ? Bonus : Donner deux manières différentes pour vérifier qu’une personne est autorisée à minter.

# Exercice 2 – Bank

À partir du contrat ERC20, nous voulons rajouter la possibilité d’avoir une banque, de faire des emprunts et de détruire des tokens. Nous allons procéder en plusieurs étapes :

1. Pour créer une banque, nous allons avoir besoin de savoir qui a un prêt, et de combien. Proposez un moyen de gérer les prêts. Il faudra pouvoir retrouver combien il reste à rembourser.
2. Définir une fonction `lend`, qui accepte une somme totale, et accorde un prêt de token à un taux de 10% (Exemple : Pour 100 TOK prêté, il faudra rembourser 110 TOK.) et une fonction `getLend` qui renvoie le prêt d’un utilisateur.
3. Définir une fonction `refund` qui rembourse une partie du prêt contracté par l’utilisateur. Cette fonction ne pourra être appelée que par l’utilisateur en question.
4. Définir une fonction `totalLends` qui retourne la valeur de l’intégralité des prêts contractés par l’ensemble des utilisateurs. (Créer une nouvelle variable et modifier les fonctions précédentes si besoin.)

# Annexe

```solidity
pragma solidity ^0.5.0;

import "./ownership/Ownable.sol";

/// @title IronCoin Contract
/// @dev This contract's goal is to provide a simple, working implementation of
///  ERC-20 token.
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
    // Do Something here!
    version = _version;
    balances[msg.sender] = 1000000000;
  }

  function totalSupply() public pure returns (uint) {
    // Do Something here!
    return 1000000000;
  }

  function balanceOf(address _owner) public view returns (uint) {
    // Do Something here!
    return balances[_owner];
  }

  function transfer(address _to, uint _value) public returns (bool success) {
    // Do Something here!
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
    // Do Something here!
    address myself = msg.sender;
    allowances[myself][_spender] = _value;
    // allowances[msg.sender][_spender] = _value;
    emit Approval(myself, _spender, _value);
    return true;
  }

  function transferFrom(
    address _from,
    address _to,
    uint _value
  ) public returns (bool success) {
    // Do Something here!
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
    // Do something here!
    return allowances[_owner][_spender];
  }
}
```
