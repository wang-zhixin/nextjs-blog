import { Html, Head, Main, NextScript } from 'next/document'
import { siteTitle } from '../components/layout'

export default function Document() {
  return (
    <Html>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
