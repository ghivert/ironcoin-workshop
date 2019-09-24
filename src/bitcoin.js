const ENDPOINT = 'https://api.coindesk.com/v1'

const getCurrent = async () => {
  const response = await fetch([ ENDPOINT, 'bpi', 'currentprice', 'EUR.json' ].join('/'))
  const { bpi } = await response.json()
  return bpi.EUR.rate_float
}

const getPastMonth = async () => {
  const response = await fetch([ ENDPOINT, 'bpi', 'historical', 'close.json?currency=EUR' ].join('/'))
  const { bpi } = await response.json()
  return bpi
}

export { getCurrent, getPastMonth }
