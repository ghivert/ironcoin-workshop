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
  }
}

const connectEthereum = (state, action) => ({
  ...state,
  ready: true,
  account: action.account,
  interface: ContractInterface,
  contract: action.contract,
})

const sendCoinType = (state, sendCoins) => ({
  ...state,
  sendCoins,
  sending: {
    valueContent: 0,
    to: '',
  },
})

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case CONNECT_ETHEREUM:
      return connectEthereum(state, action)
    case SEND_ETH:
      return sendCoinType(state, ETH)
    case SEND_IRC:
      return sendCoinType(state, IRC)
    case UPDATE_VALUE_CONTENT:
      return {
        ...state,
        sending: {
          ...state.sending,
          valueContent: action.value,
        }
      }
    case UPDATE_RECIPIENT_CONTENT:
      return {
        ...state,
        sending: {
          ...state.sending,
          to: action.to,
        }
      }
    case UPDATE_IRONCOIN_BALANCE:
      return {
        ...state,
        ironcoinBalance: action.balance,
      }
    case UPDATE_ETHEREUM_BALANCE:
      return {
        ...state,
        ethereumBalance: action.balance,
      }
    case UPDATE_BITCOIN_VALUE:
      return {
        ...state,
        bitcoinCurrentValue: action.price,
      }
    case UPDATE_BITCOIN_VALUES:
      return {
        ...state,
        bitcoinValues: action.prices,
      }
    case ADD_IRONCOIN:
      return {
        ...state,
        ironcoinBalance: state.ironcoinBalance + action.coins,
      }
    case REMOVE_IRONCOIN:
      return {
        ...state,
        ironcoinBalance: state.ironcoinBalance - action.coins,
      }
    default:
      return state
  }
}

export default reducer
