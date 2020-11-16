const ENDPOINT = 'https://api.coindesk.com/v1'

const currentPriceEpt = [ENDPOINT, 'bpi', 'currentprice', 'EUR.json'].join('/')
const pastMonthEpt = [ENDPOINT, 'bpi', 'historical', 'close.json'].join('/')
const pastMonthParams = 'currency=EUR'

const getCurrent = async () => {
  const response = await fetch(currentPriceEpt)
  const { bpi } = await response.json()
  return bpi.EUR.rate_float
}

const getPastMonth = async () => {
  const response = await fetch([pastMonthEpt, pastMonthParams].join('?'))
  const { bpi } = await response.json()
  return bpi
}

export { getCurrent, getPastMonth }
