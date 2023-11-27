import React, { createContext, useState, useEffect } from 'react'
import { ethers, formatEther } from 'ethers'
import erc20Abi from '@/abi/MyToken' 

export const MetamaskContext = createContext()

const erc20Address = '0x1c9E0fd867675621356C5213b40e55187C387d72'

export const MetamaskProvider = ({ children }) => {
  const [connected, setConnected] = useState(false)
  const [provider, setProvider] = useState()
  const [signer, setSigner] = useState(null)

  const [address, setAddress] = useState()
  const [balance, setBalance] = useState()

  // const [erc20Contract, setErc20Contract] = useState()

  const connect = async () => {
    if (window.ethereum == null) {
      throw new Error('Metamask is not installed')
    } else {
      const _provider = new ethers.BrowserProvider(window.ethereum)
      setProvider(_provider)
      const _signer = await _provider.getSigner()
      // console.log({ _signer })
      setSigner(_signer)
      setAddress(_signer.address)
      const _balance = await _provider.getBalance(_signer.address)
      // console.log({ _balance })
      setBalance(formatEther(_balance))
    }
  }

  const disconnect = async () => {
   
  }

  const sendTransaction = async (to, value, data) => {
    try {
      if (signer) {
        const tx = {
          to,
          value,
          data,
        }
        const txHash = await signer.sendTransaction(tx)
        return txHash
      } else {
        throw new Error('Signer is not available')
      }
    } catch (error) {
      console.error(error)
    }
  }

  const getErc20Balance = async (address) => {
    const erc20Contract = new ethers.Contract(erc20Address, erc20Abi, provider)
    return formatEther(await erc20Contract.balanceOf(address))
  }

  const sendErc20 = async (to, amount) => {
    const erc20Contract = new ethers.Contract(erc20Address, erc20Abi, signer)
    console.log(await erc20Contract.balanceOf(address))
    console.log(amount)
    const tx = await erc20Contract.transfer(to, amount)
    return await tx.wait()
  }

  return (
    <MetamaskContext.Provider
      value={{ 
        connected, 
        connect, 
        disconnect, 
        sendTransaction, 
        address, 
        balance,
        getErc20Balance,
        sendErc20
      }}
    >
      {children}
    </MetamaskContext.Provider>
  )
}
