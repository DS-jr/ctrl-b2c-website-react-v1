import React from 'react'

import Icon from '../Icon/Icon'
import Container from '../Container/Container'

import './Footer.scss'

function Footer() {
  return (
    <Container>
      <div className="Divider" />
      <div className="Footer-bottom">
        <a href="#" rel="noopener noreferrer">
          <img className="Logo" src="/images/cLogo.svg" alt="" />

          <div className="Logo-icon">
            <Icon name="logo" fill="#05C46B" viewBox="0 0 40 40" size="40" />
          </div>
        </a>

        <span>@ 2023 CTRL Wallet</span>
      </div>
    </Container>
  )
}

export default Footer
