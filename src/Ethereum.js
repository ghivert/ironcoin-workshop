import Web3 from 'web3'
import * as Bitcoin from 'bitcoin'
import ContractInterface from 'build/contracts/IronCoin.json'
import * as reducer from 'reducer'

const getBitcoinPrices = async dispatch => {
  const [price, prices] = await Promise.all([
    Bitcoin.getCurrent(),
    Bitcoin.getPastMonth(),
  ])
  dispatch({ type: reducer.UPDATE_BITCOIN_VALUE, price })
  dispatch({ type: reducer.UPDATE_BITCOIN_VALUES, prices })
}

const getIroncoinBalance = (contract, account) => async dispatch => {
  // Get the balance here
  const balance = Infinity
  dispatch({ type: reducer.UPDATE_IRONCOIN_BALANCE, balance })
}

const getEthereumBalance = account => async dispatch => {
  const wei = await window.web3.eth.getBalance(account)
  const balance = parseFloat(window.web3.utils.fromWei(wei), 10)
  dispatch({ type: reducer.UPDATE_ETHEREUM_BALANCE, balance })
}

const subscribeTransfer = (contract, account) => async dispatch => {
  // Do something here.
}

const sendTransaction = async (dispatch, getState) => {
  const { sending, account, contract, sendCoins } = getState()
  const { to, valueContent } = sending
  if (to !== '' && valueContent !== 0) {
    if (sendCoins === 'ETH') {
      // Send Ethers
      console.log('Ethereum')
    } else {
      // Send coins
      console.log('Ironcoin')
    }
  }
}

const connect = () => async dispatch => {
  if (window.ethereum) {
    window.web3 = new Web3(window.ethereum)
    try {
      const [account] = await window.ethereum.enable()
      const contract = new window.web3.eth.Contract(
        ContractInterface.abi,
        ContractInterface.networks['5777'].address,
        { from: account }
      )
      dispatch({ type: reducer.CONNECT_ETHEREUM, account, contract })
      dispatch(getBitcoinPrices)
      dispatch(getIroncoinBalance(contract, account))
      dispatch(getEthereumBalance(account))
      dispatch(subscribeTransfer(contract, account))
    } catch (error) {
      console.error(error)
    }
  } else {
    console.log('Not Dapp browser.')
  }
}

export { connect, sendTransaction }
