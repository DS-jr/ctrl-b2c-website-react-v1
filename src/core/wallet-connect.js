import Web3 from 'web3'
import SignClient from './SignClient'
import QRCodeModal from '@walletconnect/qrcode-modal'
import { setInitializing, setConnecting, setPairings, setSession } from '../redux/wallet-connect-slice'
import { setAddressInfo } from '../redux/contract-slice'
import { chains } from './chain'

export class WalletConnect {

  sendRequest(userAddress, topic, inputData, contract) {
    const client = this.client

    if (!client) {
      throw new Error('WalletConnect is not initialized')
    }

    return client.sendRequest(userAddress, topic, inputData, `eip155:${chains.activeChain.id}`, contract || chains.activeChain.contract)
  }

  initialize = () => async dispatch => {
    dispatch(setInitializing('initializing'))

    await this.syncLastBlocks()

    try {
      this.client = await SignClient.initialize()

      dispatch(this.subscribeToEvents(this.client))
      dispatch(this.checkPersistedState(this.client))
      dispatch(setInitializing('initialized'))

    } catch (e) {
      dispatch(setInitializing('failed'))
    }
  }

  connect = pairingTopic => async (dispatch, getState) => {
    const { wc } = getState()
    const client = this.client

    if (wc.initializing !== 'initialized' || !client) {
      throw new Error('WalletConnect is not initialized')
    }

    if (wc.connecting === 'connected' || wc.connecting === 'connecting') {
      return
    }

    dispatch(setConnecting('connecting'))

    try {
      const { uri, approval } = await client.connect({
        pairingTopic,
        requiredNamespaces: {
          eip155: {
            methods: ['eth_sendTransaction'],
            chains: chains.list.map(chain => `eip155:${chain.id}`),
            events: []
          }
        }
      })

      if (uri) {
        QRCodeModal.open(uri, () => {
          console.log('EVENT', 'QR Code Modal closed')
          dispatch(setConnecting(null))
        })
      }

      const session = await approval()
      console.log('Session established')
      dispatch(setSession(session))
      dispatch(setPairings(client.pairing.getAll({ active: true })))
    } catch (e) {
      dispatch(setConnecting('failed'))
      console.error(e)
    } finally {
      QRCodeModal.close()
    }
  }

  disconnect = () => async (dispatch, getState) => {
    const { wc } = getState()
    const client = this.client

    if (wc.initializing !== 'initialized' || !client) {
      throw new Error('WalletConnect is not initialized')
    }

    if (wc.connecting === 'connecting' || !wc.session) {
      return
    }

    await client.disconnect({ topic: wc.session.topic })

    dispatch(setAddressInfo({}))
    dispatch(setSession(null))
  }

  subscribeToEvents = client => dispatch => {
    client.on('display_uri', uri => {
      console.log('EVENT', 'display_uri', 'QR Code Modal open')
      QRCodeModal.open(uri, () => null)
    })

    client.on('session_ping', ({ id, topic }) => {
      console.log('EVENT', 'session_ping', id, topic)
    })

    client.on('session_event', ({ event, chainId }) => {
      console.log('EVENT', 'session_event', event, chainId)
    })

    client.on('session_update', ({ session }) => {
      console.log('EVENT', 'session_updated')
      dispatch(setSession(session))
    })

    client.on('session_delete', ({ id, topic }) => {
      console.log('EVENT', 'session_deleted', id, topic)
      dispatch(setAddressInfo({}))
      dispatch(setSession(null))
    })
  }

  checkPersistedState = client => dispatch => {
    dispatch(setPairings(client.pairing.getAll({ active: true })))

    if (client.session.length) {
      const activeSessinIndex = client.session.keys.length - 1
      const session = client.session.get(client.session.keys[activeSessinIndex])
      console.log('SESSION RESTORED')

      dispatch(setSession(session))
    }
  }

  async syncLastBlocks() {
    for (let i = 0; i < chains.list.length; i++) {
      const chain = chains.list[i]
      try {
        const { eth } = new Web3(chain.rpc)
        const blockNumber = await eth.getBlockNumber()
        chain.block = blockNumber - (chain.id === 1 ? 1000 : 3000)
      } catch (e) {
        console.log(e)
      }
    }
  }
}

export const walletConnect = new WalletConnect()