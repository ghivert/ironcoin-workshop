import React from 'react'
import NavBar from 'components/NavBar'
import Main from 'components/Main'
import Footer from 'components/Footer'

const App = () => (
  <div className="main">
    <NavBar />
    <div className="app container">
      <Main />
    </div>
    <Footer />
  </div>
)

export default App
