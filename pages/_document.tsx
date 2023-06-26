import Document, { Html, Head, Main, NextScript } from "next/document";
import Link from "next/link";
import Script from "next/script";

class MyDocument extends Document {
    render() {
        return (
            <Html>
                <Head>
                    <meta charSet="utf-8" />
                    {/* <meta name="viewport" content="width=device-width,initial-scale=1.0,minimum-scale=1.0" /> */}
                    <meta name="format-detection" content="telephone=no, email=no, address=no" />
                    <link rel="preconnect" href="https://fonts.googleapis.com" />
                    <link rel="preconnect" href="https://fonts.gstatic.com" />
                    <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;500;700&display=swap" rel="stylesheet" />
                    {/* <link rel="stylesheet" href="/styles/globals.css" /> */}
                    <link rel="icon" href="favicon.ico" />
                    <link rel="apple-touch-icon" type="image/png" href="apple-touch-icon-180x180.png" />
                    <link rel="icon" type="image/png" href="icon-192x192.png" />
                    {/* <title>ログイン｜キャリアワークアウト</title> */}
                    <Script src="https://code.jquery.com/jquery-3.6.2.min.js"
                        integrity="sha256-2krYZKh//PcchRtd+H+VyyQoZ/e3EcrkxhM8ycwASPA=" crossOrigin="anonymous" />
                    <Script src="/js/common.js" />

                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        )
    }
}

export default MyDocument;