# RubyCoin

# Getting Started

## Getting the repo

```sh
git clone git@github.com:ghivert/ironcoin-workshop.git
cd ironcoin-workshop
```

## Installing Node

[Node.js](https://nodejs.org/) and NPM are required to use Truffle. You should take a look at Yarn if you're planning to use npm a lot.

```sh
# NPM users
npm install
```

```sh
# Yarn users
yarn
```

## About Truffle

You'll find everything you need on [their website](http://truffleframework.com/).  
You'll need to download [Ganache](http://truffleframework.com/ganache/).

# You're good to go!

## Useful stuff

[Atom](https://atom.io/) text editor with [`linter-solidity`](https://atom.io/packages/linter-solidity).  
[Solium](https://www.getsolium.com/) to lint solidity code.

# How to run the dApp?

Launch Ganache.

```sh
yarn migrate
yarn start
```

Go to [http://localhost:3000/](http://localhost:3000/)

# How to use the app?

- On your favorite web browser (chosen between Chrome, Firefox, Opera or Brave), download [Metamask](https://metamask.io/).  
- Click on `import from seed phrase`.
- Get your seed phrase from Ganache.
- Create your Metamask account from this seed.
- Create a password.
- Accept the conditions.
- You're set up!
