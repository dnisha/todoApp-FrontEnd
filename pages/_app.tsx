import type { AppProps } from 'next/app'
import "../styles/global.css"
import { Provider } from 'react-redux'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Component {...pageProps} />

  )
}
