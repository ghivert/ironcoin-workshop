import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import reducer from 'reducer'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'

import * as Ethereum from 'Ethereum'
import './stylesheet.css'

const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(thunk))
)

store.dispatch(Ethereum.connect())

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
)
