import React from 'react'
import { NavLink } from 'react-router-dom'

const Icon = ({ name, label, url }) => (
  <NavLink to={url}>
    <i className={`feather icon-${name}`} />
    {label}
  </NavLink>
)

const NavBar = () => (
  <nav className="navbar">
    <div className="container navbar_content">
      <Icon name="home" label="Home" url="/" />
    </div>
  </nav>
)

export default NavBar
