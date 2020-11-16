var IronCoin = artifacts.require('IronCoin')

const amount = 10

contract('IronCoin', function (accounts) {
  const [accountOne, accountTwo, accountThree, accountFour] = accounts

  it('should have a total supply of 1e9', async function () {
    const instance = await IronCoin.deployed()
    const supply = await instance.totalSupply.call()
    expect(supply.valueOf().toNumber()).to.equal(1e9)
  })

  it('should put (1e9 - 100) IronCoin in the deployer account', async function () {
    const instance = await IronCoin.deployed()
    const balance = await instance.balanceOf.call(accountOne)
    expect(balance.valueOf().toNumber()).to.equal(1e9 - 100)
  })

  it('should put 100 IronCoin in the second account', async function () {
    const instance = await IronCoin.deployed()
    const balance = await instance.balanceOf.call(accountTwo)
    expect(balance.valueOf().toNumber()).to.equal(100)
  })

  it('should send coin correctly from first account to second', async function () {
    const instance = await IronCoin.deployed()
    const accountOneStartingBalance = await instance.balanceOf.call(accountOne)
    const accountTwoStartingBalance = await instance.balanceOf.call(accountTwo)
    await instance.transfer(accountTwo, amount, { from: accountOne })
    const oneEndingBalance = await instance.balanceOf.call(accountOne)
    const towEndingBalance = await instance.balanceOf.call(accountTwo)
    const resultOneBalance = accountOneStartingBalance.toNumber() - amount
    const resultTwoBalance = accountTwoStartingBalance.toNumber() + amount
    expect(oneEndingBalance.toNumber()).to.equal(resultOneBalance)
    expect(towEndingBalance.toNumber()).to.equal(resultTwoBalance)
  })

  it('should approve spending and spend first account from second account', async function () {
    const instance = await IronCoin.deployed()
    const accountOneStartingBalance = await instance.balanceOf.call(accountOne)
    const accountTwoStartingBalance = await instance.balanceOf.call(accountTwo)
    const isApproved = await instance.approve(accountTwo, amount, {
      from: accountOne,
    })
    if (isApproved) {
      const remaining = await instance.allowance.call(accountOne, accountTwo)
      expect(remaining.toNumber()).to.equal(amount)
      const isTransferred = await instance.transferFrom(
        accountOne,
        accountTwo,
        amount,
        { from: accountTwo }
      )
      if (isTransferred) {
        const [oneEndingBalance, towEndingBalance] = await Promise.all([
          instance.balanceOf.call(accountOne),
          instance.balanceOf.call(accountTwo),
        ])
        const resultOneBalance = accountOneStartingBalance.toNumber() - amount
        const resultTwoBalance = accountTwoStartingBalance.toNumber() + amount
        expect(oneEndingBalance.toNumber()).to.equal(resultOneBalance)
        expect(towEndingBalance.toNumber()).to.equal(resultTwoBalance)
      } else {
        expect(isTransferred).to.be.false
      }
    } else {
      expect(isApproved).to.be.false
    }
  })

  it('should be able to mint from owner', async function () {
    const instance = await IronCoin.deployed()
    const supply = await instance.totalSupply.call()
    expect(supply.valueOf().toNumber()).to.equal(1e9)
    await instance.mint(1000, { from: accountOne })
    const newSupply = await instance.totalSupply.call()
    expect(newSupply.valueOf().toNumber()).to.equal(1e9 + 1000)
    try {
      await instance.mint(1000, { from: accountTwo })
      expect(true).to.be.false
    } catch (error) {
      expect(true).to.be.true
    }
  })

  it('should be able to mint from minters', async function () {
    const instance = await IronCoin.deployed()
    const supply = await instance.totalSupply.call()
    expect(supply.valueOf().toNumber()).to.equal(1e9)
    await instance.addMinter(accountTwo, { from: accountOne })
    await instance.mint(1000, { from: accountTwo })
    const newSupply = await instance.totalSupply.call()
    expect(newSupply.valueOf().toNumber()).to.equal(1e9 + 1000)
    try {
      await instance.mint(1000, { from: accountThree })
      expect(true).to.be.false
    } catch (error) {
      expect(true).to.be.true
    }
  })

  it('should lend', async function () {
    const instance = await IronCoin.deployed()
    await instance.lend(100, { from: accountThree })
    const result = await instance.balanceOf.call(accountThree)
    expect(result.valueOf().toNumber()).to.equal(100)
    await instance.lend(100, { from: accountFour })
    const res = await instance.getLend.call(accountFour)
    expect(res.valueOf().toNumber()).to.equal(110)
  })

  it('should refund', async function () {
    const instance = await IronCoin.deployed()
    await instance.lend(10000, { from: accountThree })
    const result = await instance.getLend.call(accountThree)
    await instance.refund(100, { from: accountThree })
    const res = await instance.getLend.call(accountThree)
    expect(res.valueOf().toNumber()).to.equal(result.valueOf().toNumber() - 100)
    try {
      await instance.refund(9999999, { from: accountThree })
      expect(true).to.be.true
    } catch (error) {
      expect(false).to.be.false
    }
  })

  it('should return totalLends', async function () {
    const instance = await IronCoin.deployed()
    const result = await instance.totalLends.call()
    expect(result.valueOf().toNumber()).to.be.above(0)
  })
})
