var IronCoin = artifacts.require('IronCoin')

module.exports = async function (deployer, network, accounts) {
  deployer
    .deploy(IronCoin, '1.0.0')
    .then(instance => {
      return instance.transfer(accounts[1], 100, { from: accounts[0] })
    })
    .then(transaction => {
      return
    })
    .catch(error => {
      console.log(error)
    })
}
