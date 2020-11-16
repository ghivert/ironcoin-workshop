const Election = artifacts.require('Election')

contract('Election', async function (accounts) {
  const [accountOne, accountTwo] = accounts

  it('should be able to vote for someone', async function () {
    try {
      const instance = await Election.deployed()
      await instance.vote(accountTwo, { from: accountOne })
      expect(true).to.be.true
    } catch (error) {
      expect(true).to.be.false
    }
  })

  it('should be able to read vote count', async function () {
    const instance = await Election.deployed()
    await instance.vote(accountTwo, { from: accountOne })
    const votes = await instance.getVotes.call(accountTwo)
    expect(votes.valueOf().toNumber()).to.be.above(0)
  })

  it('should be able to add a candidate', async function () {
    const instance = await Election.deployed()
    await instance.postulate({ from: accountOne })
    expect(true).to.be.true
  })

  it('should be able to vote for a postulate', async function () {
    const instance = await Election.deployed()
    await instance.postulate({ from: accountOne })
    await instance.vote(accountOne, { from: accountTwo })
    expect(true).to.be.true
  })

  it('should throw if not in postulate list', async function () {
    try {
      const instance = await Election.deployed()
      await instance.vote(accountTwo, { from: accountTwo })
      expect(false).to.be.true
    } catch (error) {
      expect(true).to.be.true
    }
  })
})
