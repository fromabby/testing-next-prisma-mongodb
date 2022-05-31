import '../styles/globals.css'
import axios from 'axios'
import type { AppProps } from 'next/app'

import { SWRConfig } from 'swr'

// axios.defaults.baseURL = `http://localhost:3000/api`

function MyApp({ Component, pageProps }: AppProps) {
    const fetcher = async (url: string) => {
        try {
            const { data } = await axios.get(url)

            return data
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <SWRConfig value={{ fetcher, dedupingInterval: 10000 }}>
            <Component {...pageProps} />
        </SWRConfig>
    )
}

export default MyApp
