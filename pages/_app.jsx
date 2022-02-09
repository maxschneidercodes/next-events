import { Fragment } from "react"
import Head from "next/head"

import "../styles/globals.css"
import Layout from "../components/layout/layout"

function MyApp({ Component, pageProps }) {
    return <Fragment>
        <Head>
            <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        </Head>
        <Layout>
            <Component {...pageProps} />
        </Layout>
    </Fragment>
}

export default MyApp 