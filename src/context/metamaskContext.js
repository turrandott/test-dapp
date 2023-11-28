import React, { createContext, useState } from 'react'
import { ethers, formatEther } from 'ethers'

export const MetamaskContext = createContext()

export const MetamaskProvider = ({ children }) => {
  const [connected, setConnected] = useState(false)
  const [provider, setProvider] = useState()

  const [wallet, setWallet] = useState({
    signer: null,
    address: '',
    balance: ''
  })

  const connect = async () => {
    if (window.ethereum == null) {
      throw new Error('Metamask is not installed')
    } else {
      const _provider = new ethers.BrowserProvider(window.ethereum)
      setProvider(_provider)

      const signer = await _provider.getSigner()
      const balance = formatEther(await _provider.getBalance(signer.address))
      setWallet({
        signer,
        address: signer.address,
        balance
      })
    }
  }

  const disconnect = async () => {
   
  }

  return (
    <MetamaskContext.Provider
      value={{ 
        connected,
        provider,
        ...wallet,
        connect,
        disconnect
      }}
    >
      {children}
    </MetamaskContext.Provider>
  )
}
