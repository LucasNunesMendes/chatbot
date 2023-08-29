import Image from 'next/image'
import { Inter } from 'next/font/google'
import ChatComponent from '../_componentes/ChatComponent'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main
      className={`  ${inter.className}`}>
     <ChatComponent/>
    </main>
  )
}
