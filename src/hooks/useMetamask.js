import { useContext } from 'react'
import { MetamaskContext } from '@/context/metamaskContext'

export const useMetamask = () => {
  const context = useContext(MetamaskContext)

  return context
}
