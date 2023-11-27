import Image from 'next/image'
import { Inter } from 'next/font/google'
import MyContract from '@/components/MyContract'
import { MetamaskProvider } from '@/context/metamaskContext'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main
      className={`flex min-h-screen flex-col p-5 ${inter.className}`}
    >
      <h1 className='animated-h1'>ERC20 chiado gnosis test</h1>
      <MetamaskProvider>
        <MyContract />
      </MetamaskProvider>
    </main>
  )
}
