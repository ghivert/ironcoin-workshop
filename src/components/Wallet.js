import React from 'react'
import { connect } from 'react-redux'
import * as reducer from 'reducer'
import VariationCell from 'components/VariationCell'
import * as Ethereum from 'Ethereum'

const BorderRight = () => (
  <div style={{ borderRight: '1px solid rgba(0, 40, 100, 0.12)' }} />
)

const isActive = (sendCoins, currency) => {
  return sendCoins === currency ? 'active' : ''
}

const SendCoinChoice = ({ sendCoins, ...props }) => {
  const base = 'clickable btn'
  const ethActive = isActive(sendCoins, 'ETH')
  const ircActive = isActive(sendCoins, 'IRC')
  return (
    <div className="send-coins_coins-selector flex-1">
      <span className={`${base} ${ethActive}`} onClick={props.activateEth}>
        Ether
      </span>
      <span className={`${base} ${ircActive}`} onClick={props.activateIrc}>
        IronCoin
      </span>
    </div>
  )
}

const FormHeader = ({ sendCoins }) => (
  <div className="padding-6">
    <span>Send some {sendCoins === 'ETH' ? 'Ether' : 'IronCoin'}!</span>
  </div>
)

const InputField = ({ label, type, placeholder, onChange, value }) => (
  <div className="padding-6">
    <label>
      {label}
      <input
        className="send-amount-field"
        type={type}
        placeholder={placeholder}
        onChange={event => onChange(event.target.value)}
        value={value}
      />
    </label>
  </div>
)

const FormSubmit = props => (
  <div className="padding-6">
    <div
      className="btn btn_outline_primary btn_sm"
      onClick={() => props.sendTransaction(props)}
    >
      Send!
    </div>
  </div>
)

const SenderForm = props => (
  <div className="sender flex-1">
    <div className="sender-inside">
      <FormHeader {...props} />
      <InputField
        label="Amount"
        type="number"
        placeholder="123.456"
        onChange={props.updateValueContent}
        value={props.sending.valueContent}
      />
      <InputField
        label="To"
        type="text"
        placeholder="0xcbcb6bd2a1e6085584e323edafb5cf9bb8d77e44"
        onChange={props.updateRecipientContent}
        value={props.sending.to}
      />
      <FormSubmit {...props} />
    </div>
  </div>
)

const Wallet = props => (
  <div className="wallet">
    <div className="card">
      <div className="card-header_variations wallet-header">
        <VariationCell
          price={`${props.ironcoinBalance.toString()} IRC`}
          subPrice="On your account"
        />
        <BorderRight />
        <VariationCell
          price={`${props.ethereumBalance.toString()} ETH`}
          subPrice="On your account"
        />
      </div>
    </div>
    <div className="card send-coins">
      <div className="card-header">
        Send coins
      </div>
      <div className="send-coins">
        <SendCoinChoice {...props} />
        <BorderRight />
        <SenderForm {...props} />
      </div>
    </div>
  </div>
)

const mapStateToProps = ({ account, sendCoins, sending, ironcoinBalance, ethereumBalance, contract }) => ({ account, sendCoins, sending, ironcoinBalance, ethereumBalance, contract })

const mapDispatchToProps = dispatch => ({
  activateEth: () => dispatch({ type: reducer.SEND_ETH }),
  activateIrc: () => dispatch({ type: reducer.SEND_IRC }),
  updateValueContent: value => {
    const parsed = parseInt(value, 10)
    dispatch({ type: reducer.UPDATE_VALUE_CONTENT, value: isNaN(parsed) ? 0 : parsed })
  },
  updateRecipientContent: to => dispatch({ type: reducer.UPDATE_RECIPIENT_CONTENT, to }),
  sendTransaction: props => dispatch(Ethereum.sendTransaction(props)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Wallet)
