import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import * as reducer from 'reducer'
import VariationCell from 'components/VariationCell'
import * as Ethereum from 'Ethereum'

const BorderRight = () => (
  <div style={{ borderRight: '1px solid rgba(0, 40, 100, 0.12)' }} />
)

const isActive = (sendCoins, currency) => {
  return sendCoins === currency ? 'active' : ''
}

const SendCoinChoice = ({ sendCoins }) => {
  const base = 'clickable btn'
  const ethActive = isActive(sendCoins, 'ETH')
  const ircActive = isActive(sendCoins, 'IRC')
  const dispatch = useDispatch()
  const activateEth = () => dispatch({ type: reducer.SEND_ETH })
  const activateIrc = () => dispatch({ type: reducer.SEND_IRC })
  return (
    <div className="send-coins_coins-selector flex-1">
      <span className={`${base} ${ethActive}`} onClick={activateEth}>
        Ether
      </span>
      <span className={`${base} ${ircActive}`} onClick={activateIrc}>
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

const FormSubmit = () => {
  const dispatch = useDispatch()
  const sendTransaction = () => dispatch(Ethereum.sendTransaction)
  return (
    <div className="padding-6">
      <div className="btn btn_outline_primary btn_sm" onClick={sendTransaction}>
        Send!
      </div>
    </div>
  )
}

const SenderForm = () => {
  const dispatch = useDispatch()
  const updateValueContent = val => {
    const parsed = parseInt(val, 10)
    const type = reducer.UPDATE_VALUE_CONTENT
    const value = isNaN(parsed) ? 0 : parsed
    dispatch({ type, value })
  }
  const updateRecipientContent = to => {
    const type = reducer.UPDATE_RECIPIENT_CONTENT
    dispatch({ type, to })
  }
  const { sendCoins, sending } = useSelector(({ sendCoins, sending }) => {
    return { sendCoins, sending }
  })
  return (
    <div className="sender flex-1">
      <div className="sender-inside">
        <FormHeader sendCoins={sendCoins} />
        <InputField
          label="Amount"
          type="number"
          placeholder="123.456"
          onChange={updateValueContent}
          value={sending.valueContent}
        />
        <InputField
          label="To"
          type="text"
          placeholder="0xcbcb6bd2a1e6085584e323edafb5cf9bb8d77e44"
          onChange={updateRecipientContent}
          value={sending.to}
        />
        <FormSubmit />
      </div>
    </div>
  )
}

const Wallet = props_ => {
  const { ironcoinBalance, ethereumBalance, sendCoins } = useSelector(
    ({ ironcoinBalance, ethereumBalance, sendCoins }) => {
      return { ironcoinBalance, ethereumBalance, sendCoins }
    }
  )
  return (
    <div className="wallet">
      <div className="card">
        <div className="card-header_variations wallet-header">
          <VariationCell
            price={`${ironcoinBalance.toString()} IRC`}
            subPrice="On your account"
          />
          <BorderRight />
          <VariationCell
            price={`${ethereumBalance.toString()} ETH`}
            subPrice="On your account"
          />
        </div>
      </div>
      <div className="card send-coins">
        <div className="card-header">Send coins</div>
        <div className="send-coins">
          <SendCoinChoice sendCoins={sendCoins} />
          <BorderRight />
          <SenderForm />
        </div>
      </div>
    </div>
  )
}

export default Wallet
