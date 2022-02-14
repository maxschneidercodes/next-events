import { Fragment } from "react"
import Head from "next/head"

import "../styles/globals.css"
import Layout from "../components/layout/layout"
import { ContextProvider } from "../store/notification-context"

function MyApp({ Component, pageProps }) {
    return <Fragment>
        <ContextProvider>
            <Layout>
                <Head>
                    <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                </Head>
                <Component {...pageProps} />
            </Layout>
        </ContextProvider>
    </Fragment>
}

export default MyApp 