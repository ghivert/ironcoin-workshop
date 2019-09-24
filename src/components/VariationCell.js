import React from 'react'

const VariationCell = ({ price, subPrice }) => (
  <div className="card-header_variations_elem flex-1">
    <span className="price">{price}</span>
    <br />
    <span className="sub-price">{subPrice}</span>
  </div>
)

export default VariationCell
