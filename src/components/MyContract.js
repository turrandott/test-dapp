import { useState } from 'react'
import { useMetamask } from '@/hooks/useMetamask'

const MyContract = () => {
  const {
    connect,
    address,
    balance,
    disconnect,
    sendTx,
    getErc20Balance,
    sendErc20
  } = useMetamask()

  const [erc20Balance, setErc20Balance] = useState()

  const connectMetamask = async () => {
    try {
      await connect()
    } catch (error) {
      console.log(error)
    }
  }
  
  const handleGetErc20Balance = async () => {
    try {
      setErc20Balance(await getErc20Balance(address))
    } catch (error) {
      console.log(error)
    }
  }

  const handleSendErc20 = async () => {
    try {
      const tx = await sendErc20('0xF5057436f98b722386002409B86295D61EDd1e15', '100')
      console.log({tx})
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='p-3 font-mono'>
      <div>
        <button type='button' className='btn my-btn my-5' onClick={connectMetamask}>
          Connect wallet
        </button>
        {address && 
          <div className='my-5'>
            <p>Your address: </p>
            <p className='break-all font-bold mb-4'>{address}</p>
            <p>Balance:</p>
            <p className='break-all font-bold'>{balance} xDAI</p>
          </div>
        }
      </div>
      {address &&
        <div className='my-5'>
          <button type='button' className='btn my-btn my-5' onClick={handleGetErc20Balance}>
            Get ERC20 balance
          </button>
          {erc20Balance && 
            <>
              <p>ERC20 balance:</p>
              <p className='break-all font-bold'>{erc20Balance} mtk</p>

              <button type='button' className='btn my-btn my-5' onClick={handleSendErc20}>
                Send small amount of ERC20
              </button>
            </>
          }
        </div>
      }
    </div>
  )
}

export default MyContract
