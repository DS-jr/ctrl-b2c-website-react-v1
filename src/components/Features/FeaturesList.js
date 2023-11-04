import React from 'react'
import Container from '../Container'

import './FeaturesList.scss'

function FeaturesList({ isPremium }) {
  const card = (title, text) => (
    <div className="col-6 col-md-3" key={title}>
      <div className="Features-list-card">
        <div className="Features-list-body">
          <div className="Features-list-title">{title}</div>
          <div className="Features-list-text py-2 text-grey">{text}</div>
        </div>
      </div>
    </div>
  )

  let items
  if (isPremium) {
    items = [
      ['CEX volume and Rank', 'Don\'t lock yourself in and don\'t let others do that to you.'],
      ['DEX volume and Rank', 'Bypass conditional barriers and access markets globally.'],
      ['DEX Liquidity and Rank', 'Do not leak your private and financial data to the world.'],
      ['30 Day Volume', 'Don\'t lock yourself in and don\'t let others do that to you.'],
      ['Active Addresses and Rank', 'Do not leak your private and financial data to the world.'],
      ['Transaction Count and Rank', 'Do not leak your private and financial data to the world.'],
      ['Holders and Major Holders', 'Bypass conditional barriers and access markets globally.'],
      ['Project TVL and Rank', 'Do not leak your private and financial data to the world.'],
      ['Project Revenue and Rank', 'Do not leak your private and financial data to the world.'],
      ['Reports', 'Don\'t lock yourself in and don\'t let others do that to you.'],
      ['Treasuries', 'Bypass conditional barriers and access markets globally.'],
      ['Funding', 'Do not leak your private and financial data to the world.'],
    ]
  } else {
    items = [
      ['In Telegram', 'Wallet app is (natively) integrated in Telegram messenger'],
      ['Non-custodial', 'Self-custodial. (?)You CTRL private keys'],
      ['Open-source', '100% open-sourced. Publicly visible development process'],
      ['Multi-wallet', 'Many wallets in a single app'],
      ['Instant Send', 'Send crypto to any Telegram user who has no wallet yet'],
      ['For communities in Telegram', 'Features (for groups & channels): Tipping; Paid subscriptions; Monetisation; ..??.., etc.'],
      ['For merchants in Telegram ', 'Features: Invoices. ..??.. '],
      ['(??) Payments & Transfers (globally)', '(?) In crypto. (??)Instant. (?)Borderless. (?)Globally. (?)Unsensored. (?)..(?) '],
      ['Privacy-first', 'No data collecting / selling. No ads. ..??..'],
      ['Recurrent crypto payments', '(??) Subscriptions paid in crypto automatically (Ex.: Netflix, Spotify, etc.)'],
      ['..??..'],         
      ['..??..'],         
    ]
  }

  return (
    <Container>
      <div className="Premium-space-top Premium-space-bottom">
        <div className="Page-title Page-header-text text-gradient text-center">
          {isPremium ? 'Premium Features' : 'Wallet Features'}
        </div>
        <div className="Features-list mt-4">
          <div className="row gx-5">
            {items.map(item => card(item[0], item[1]))}
          </div>
        </div>
      </div>
    </Container>
  )
}

export default FeaturesList
