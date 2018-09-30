import Document, { Head, Main, NextScript } from 'next/document'

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <html>
        <Head>
          <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.3.3/semantic.min.css"></link>
          <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Lato:400,700,900|Rubik" />
          <style>{`
            body {
              margin: 0;
              font-family: Lato, Open Sans, Arial;
            }
            .page {
              max-width: 960px;
              margin: 0 auto;
            }
            input, button {
              font-size: 2rem;
            }
            .content {
              margin: 2rem 1rem;
            }
            .row {
              display: flex;
              margin: 1rem 0;
            }
          `}</style>
        </Head>
        <body className="custom_class">
          <div className="page">
            <Main />
          </div>
          <NextScript />
        </body>
      </html>
    )
  }
}