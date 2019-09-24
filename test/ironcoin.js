var IronCoin = artifacts.require("IronCoin")

const amount = 10

contract('IronCoin', function(accounts) {
  const [ accountOne, accountTwo ] = accounts

  it("should have a total supply of 1e9", async function() {
    const instance = await IronCoin.deployed()
    const supply = await instance.totalSupply.call()
    expect(supply.valueOf().toNumber()).to.equal(1e9)
  })

  it("should put (1e9 - 100) IronCoin in the deployer account", async function() {
    const instance = await IronCoin.deployed()
    const balance = await instance.balanceOf.call(accountOne)
    expect(balance.valueOf().toNumber()).to.equal(1e9 - 100)
  })

  it("should put 100 IronCoin in the second account", async function() {
    const instance = await IronCoin.deployed()
    const balance = await instance.balanceOf.call(accountTwo)
    expect(balance.valueOf().toNumber()).to.equal(100)
  })

  it("should send coin correctly from first account to second", async function() {
    const instance = await IronCoin.deployed()
    const accountOneStartingBalance = await instance.balanceOf.call(accountOne)
    const accountTwoStartingBalance = await instance.balanceOf.call(accountTwo)
    await instance.transfer(accountTwo, amount, { from: accountOne })
    const accountOneEndingBalance = await instance.balanceOf.call(accountOne)
    const accountTwoEndingBalance = await instance.balanceOf.call(accountTwo)
    expect(accountOneEndingBalance.toNumber()).to.equal(accountOneStartingBalance.toNumber() - amount)
    expect(accountTwoEndingBalance.toNumber()).to.equal(accountTwoStartingBalance.toNumber() + amount)
  })

  it("should approve spending and spend first account from second account", async function() {
    const instance = await IronCoin.deployed()
    const accountOneStartingBalance = await instance.balanceOf.call(accountOne)
    const accountTwoStartingBalance = await instance.balanceOf.call(accountTwo)
    const isApproved = await instance.approve(accountTwo, amount, { from: accountOne })
    if (isApproved) {
      const remaining = await instance.allowance.call(accountOne, accountTwo)
      expect(remaining.toNumber()).to.equal(amount)
      const isTransferred = await instance.transferFrom(accountOne, accountTwo, amount, { from: accountTwo })
      if (isTransferred) {
        const accountOneEndingBalance = await instance.balanceOf.call(accountOne)
        const accountTwoEndingBalance = await instance.balanceOf.call(accountTwo)
        expect(accountOneEndingBalance.toNumber()).to.equal(accountOneStartingBalance.toNumber() - amount)
        expect(accountTwoEndingBalance.toNumber()).to.equal(accountTwoStartingBalance.toNumber() + amount)
      } else {
        expect(isTransferred).to.be.false
      }
    } else {
      expect(isApproved).to.be.false
    }
  })
})
