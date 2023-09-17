import '@/styles/globals.css'
import { SessionProvider } from 'next-auth/react'
import { ThemeProvider } from '@material-tailwind/react'
import { RecoilRoot } from 'recoil'

export default function App({ Component, pageProps:{session,...pageProps} }) {
  return (
    <SessionProvider session={session}>
    <ThemeProvider>
    <Component {...pageProps} />
    </ThemeProvider>
    </SessionProvider>
  )
}
