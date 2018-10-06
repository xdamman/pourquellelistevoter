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
          <meta name="viewport" content="width=device-width, user-scalable=no" />
          <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.3.3/semantic.min.css"></link>
          <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Lato:400,700,900|Rubik" />
          <style>{`
            body {
              margin: 0;
              font-family: Lato, Open Sans, Arial;
            }
            .page {
              max-width: 960px;
              width: 100%;
              margin: 2rem auto;
              padding: 0 1rem;
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
            .home .ui.teal.button {
              margin: 0.5rem 0.5rem 0.5rem 0;
              min-width: 20rem;
            }
            .ListSummmary {
              margin: 2rem 0;
            }
            .recommendation {
              margin-top: 2rem;
              padding: 1rem;
              color: #0c5460;
              background-color: #d1ecf1;
              border-color: #bee5eb;
            }
            .recommendation p {
              margin-top: 2rem;
            }
            .emoji {
              font-size: 64px;
            }
            table {
              margin: 2rem 0;
            }

            .video {
              position: relative;
              padding-top: 56.25% /* Player ratio: 100 / (1280 / 720) */
            }

            .player {
              position: absolute;
              top: 0;
              left: 0;
              width: 100%;
              height: 100%;
            }

            ul.list {
              list-style: none;
              margin: 0;
              padding: 0;
            }
            ul.list li {
              margin: 2rem 0;
            }
            h3 {
              margin-bottom: 0.5rem;
            }
            @media (max-width: 600px) {
              .home .ui.teal.button {
                width: 100%;
              }
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
