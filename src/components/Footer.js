import React from 'react'

const NewTabLink = ({ href, children }) => (
  <a href={href} target="_blank" rel="noopener noreferrer">
    {children}
  </a>
)

const LegalMentions = () => (
  <div className="flex-1 flex">
    <p style={{ paddingRight: '3px' }}>
      Copyright © 2018-2020 Guillaume Hivert. Theme heavily inspired by
    </p>
    <NewTabLink href="https://tabler.github.io/tabler">Tabler</NewTabLink>
    <p>.</p>
  </div>
)

const SourceAndObligations = () => (
  <div className="mobile-top-padding flex" style={{ alignItems: 'center' }}>
    <NewTabLink
      href="https://www.coindesk.com/price"
      style={{ paddingRight: '12px' }}
    >
      Powered by CoinDesk
    </NewTabLink>
    <div style={{ paddingRight: '6px' }} />
    <NewTabLink
      href="https://github.com/ghivert/IronCoin"
      className="btn btn-outline_primary btn_sm"
    >
      Source code
    </NewTabLink>
  </div>
)

const Footer = () => (
  <footer>
    <div className="container flex mobile-column">
      <LegalMentions />
      <SourceAndObligations />
    </div>
  </footer>
)

export default Footer
