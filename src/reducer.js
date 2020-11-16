import ContractInterface from 'build/contracts/IronCoin.json'

export const CONNECT_ETHEREUM = 'CONNECT_ETHEREUM'
export const SEND_ETH = 'SEND_ETH'
export const SEND_IRC = 'SEND_IRC'
export const UPDATE_VALUE_CONTENT = 'UPDATE_VALUE_CONTENT'
export const UPDATE_RECIPIENT_CONTENT = 'UPDATE_RECIPIENT_CONTENT'
export const UPDATE_IRONCOIN_BALANCE = 'UPDATE_IRONCOIN_BALANCE'
export const UPDATE_ETHEREUM_BALANCE = 'UPDATE_ETHEREUM_BALANCE'
export const UPDATE_BITCOIN_VALUE = 'UPDATE_BITCOIN_VALUE'
export const UPDATE_BITCOIN_VALUES = 'UPDATE_BITCOIN_VALUES'
export const ADD_IRONCOIN = 'ADD_IRONCOIN'
export const REMOVE_IRONCOIN = 'REMOVE_IRONCOIN'

export const IRC = 'IRC'
export const ETH = 'ETH'

const initialState = {
  ready: false,
  account: null,
  bitcoinValues: {},
  bitcoinCurrentValue: null,
  ironcoinBalance: 0,
  ethereumBalance: 0,
  contract: null,
  sendCoins: IRC,
  sending: {
    valueContent: 0,
    to: '',
  },
}

const connectEthereum = (state, { account, contract }) => {
  const ready = true
  return { ...state, ready, account, interface: ContractInterface, contract }
}

const sendCoinType = (state, sendCoins) => {
  const sending = { valueContent: 0, to: '' }
  return { ...state, sendCoins, sending }
}

const updateValueContent = (state, { value }) => {
  const sending = { ...state.sending, valueContent: value }
  return { ...state, sending }
}

const updateRecipientContent = (state, { to }) => {
  const sending = { ...state.sending, to }
  return { ...state, sending }
}

const updateIroncoinBalance = (state, { balance }) => {
  return { ...state, ironcoinBalance: balance }
}

const updateEthereumBalance = (state, { balance }) => {
  return { ...state, ethereumBalance: balance }
}

const updateBitcoinValue = (state, { price }) => {
  return { ...state, bitcoinCurrentValue: price }
}

const updateBitcoinValues = (state, { prices }) => {
  return { ...state, bitcoinValues: prices }
}

const addIroncoin = (state, { coins }) => {
  const ironcoinBalance = state.ironcoinBalance + coins
  return { ...state, ironcoinBalance }
}

const removeIroncoin = (state, { coins }) => {
  const ironcoinBalance = state.ironcoinBalance - coins
  return { ...state, ironcoinBalance }
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case CONNECT_ETHEREUM:
      return connectEthereum(state, action)
    case SEND_ETH:
      return sendCoinType(state, ETH)
    case SEND_IRC:
      return sendCoinType(state, IRC)
    case UPDATE_VALUE_CONTENT:
      return updateValueContent(state, action)
    case UPDATE_RECIPIENT_CONTENT:
      return updateRecipientContent(state, action)
    case UPDATE_IRONCOIN_BALANCE:
      return updateIroncoinBalance(state, action)
    case UPDATE_ETHEREUM_BALANCE:
      return updateEthereumBalance(state, action)
    case UPDATE_BITCOIN_VALUE:
      return updateBitcoinValue(state, action)
    case UPDATE_BITCOIN_VALUES:
      return updateBitcoinValues(state, action)
    case ADD_IRONCOIN:
      return addIroncoin(state, action)
    case REMOVE_IRONCOIN:
      return removeIroncoin(state, action)
    default:
      return state
  }
}

export default reducer
