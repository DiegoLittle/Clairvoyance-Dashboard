import React from 'react'
import App from 'next/app'
import Sitelayout from '../src/components/layout'
import '../styles/timepicker.css'
import '../styles/globals.css'

import { Provider } from 'react-redux'
import store from '../src/store'
import { SessionProvider,useSession } from "next-auth/react"


class MyApp extends App {
  render() {
    
    const { Component, pageProps,session } = this.props
    return (
      <SessionProvider session={session}>
      <Provider store={store}>
        <Sitelayout>
          <Component {...pageProps}></Component>
        </Sitelayout>
        </Provider>
        </SessionProvider>
    )
  }
}

// function MyApp({ Component, pageProps }) {
//   return <Component {...pageProps} />
// }

export default MyApp
