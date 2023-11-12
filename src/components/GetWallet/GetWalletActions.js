import React from 'react'
import cn from 'classnames'
import { Tooltip } from 'react-tooltip'
import Icon from '../Icon'
import Button from '../Button'

import './GetWalletActions.scss'

function GetWallet({ btnSteal }) {
  return (
    <div className="Wallet-actions">
      <div className="Banner-actions">
        <Tooltip
          id="registerTip"
          data-tooltip-place="top"
          variant="light"
          className="QqCodeTooltip"
          content={<img src="/images/qrcode-get-wallet.svg" alt="" />}
        />
        <Button
          className={cn('Button-circle Button-nowrap', { 'Button-steal20': btnSteal })}
          role="button"
          data-tooltip-id="registerTip"
          text="Join Early Adopters"
          link="https://t.me/+9IhxoQn5gv9jZTY8"
          yellow={!btnSteal}
          steal20={btnSteal}
          newTab />
      </div>
      <br/>
    </div>
  )
}

export default GetWallet
