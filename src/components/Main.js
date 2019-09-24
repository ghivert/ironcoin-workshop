import React from 'react'
import Wallet from 'components/Wallet'
import { connect } from 'react-redux'
import VariationCell from 'components/VariationCell'
import { Line } from 'react-chartjs-2'

const computeDiffPercentage = (todayValue, values) => {
  const yesterdayDate = new Date(Date.now() - 864e5).toISOString().slice(0, 10)
  const yesterdayValue = values[yesterdayDate]
  if (yesterdayValue === undefined) {
    return null
  } else {
    return ((todayValue - yesterdayValue) * 100) / yesterdayValue
  }
}

const RenderVariation = ({ variation }) => {
  if (variation) {
    return (
      <VariationCell
        price={`${Math.round(variation)} %`}
        subPrice="Since yesterday"
      />
    )
  } else {
    return null
  }
}

const Chart = ({ bitcoinValues }) => {
  const labels = Object
    .keys(bitcoinValues)
    .map(date => date.split('-'))
    .map(([ year, month, day]) => `${month}/${day}/${year}`)
  const data = {
    labels,
    datasets: [{
      data: Object.values(bitcoinValues),
      backgroundColor: 'rgb(254, 232, 185)',
      borderColor: 'rgb(252, 161, 21)',
      borderWidth: 2,
      pointRadius: 0,
    }],
  }
  const axe = {
    display: false,
    ticks: { fontFamily: 'Source Sans Pro' },
  }
  const options = {
    legend: { display: false },
    tooltips: { mode: 'nearest' },
    hover: { intersect: false },
    scales: { xAxes: [axe], yAxes: [axe] }
  }
  return (
    <Line data={data} options={options} />
  )
}

const BitcoinChart = ({ bitcoinValues, bitcoinCurrentValue }) => {
  if (Object.keys(bitcoinValues).length > 0) {
    const variation = computeDiffPercentage(bitcoinCurrentValue, bitcoinValues)
    return (
      <div className="card">
        <div className="card-header">Bitcoin</div>
        <div className="card-header_variations">
          <RenderVariation variation={variation} />
        </div>
        <Chart bitcoinValues={bitcoinValues} />
      </div>
    )
  } else {
    return null
  }
}

const Main = props => (
  <React.Fragment>
    <BitcoinChart {...props} />
    <Wallet />
  </React.Fragment>
)

const mapStateToProps = ({ bitcoinValues, bitcoinCurrentValue }) => ({ bitcoinValues, bitcoinCurrentValue })

export default connect(mapStateToProps)(Main)
