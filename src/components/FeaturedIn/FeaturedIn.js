import React from 'react'

import Container from '../Container'

import './Featured.scss'

function FeaturedIn() {
  return (
    <Container>
      <div className="Featured">
        <div className="Featured-text Page-header-text text-gradient">Ecosystem Partners</div>
        <div className="Featured-list">
          <a target="_blank" href="https://solana.com" rel="noopener noreferrer">
            <img className="Featured-item" src="/images/featured/solana.svg" alt="Solana" />
          </a>
          <a target="_blank" href="https://1inch.io" rel="noopener noreferrer">
            <img className="Featured-item" src="/images/featured/1inch.svg" alt="1 Inch Network" />
          </a>
          <a target="_blank" href="https://www.coingecko.com" rel="noopener noreferrer">
            <img className="Featured-item" src="/images/featured/coingecko.svg" alt="Coin Gecko" />
          </a>
          <a target="_blank" href="https://walletconnect.org" rel="noopener noreferrer">
            <img className="Featured-item" src="/images/featured/wallet-connect.svg" alt="Wallet Connect" />
          </a>
        </div>
      </div>
    </Container>
  )
}

export default FeaturedIn
