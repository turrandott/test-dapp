import { useContext } from 'react'
import { MetamaskContext } from '@/context/metamaskContext'
import { ethers, formatEther } from 'ethers'
import erc20Abi from '@/abi/MyToken' 

const erc20Address = '0x1c9E0fd867675621356C5213b40e55187C387d72'

export const useMetamask = () => {
  const { 
    connected,
    provider,

    signer,
    address, 
    balance,

    connect,
    disconnect
  } = useContext(MetamaskContext)

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
    const tx = await erc20Contract.transfer(to, amount)
    return await tx.wait()
  }

  return {
    connected,
    
    address, 
    balance,

    connect, 
    disconnect,
    sendTransaction,
    getErc20Balance,
    sendErc20
  }
}
