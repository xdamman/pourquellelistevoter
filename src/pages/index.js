import React from 'react';
import Head from 'next/head'
import { Button } from 'semantic-ui-react'
import Router from 'next/router'
import Link from 'next/link';
import Footer from '../components/Footer';
import ReactPlayer from 'react-player';

class HomePage extends React.Component {

  static getInitialProps({ req, res, query }) {
    if (res) {
      res.setHeader('Cache-Control', `s-maxage=${60*15}`);
    }
    return { query };
  }

  constructor(props) {
    super(props);
    this.state = { zipcode: null };
  }

  goto(url) {
    window.location.href = url;
  }

  continue() {
    if (!this.state.zipcode) return;
    Router.push(`/${this.state.zipcode}`);
  }

  render() {
    const { firstname } = this.props;
    return (
        <div>
          <Head>
            <title>Pour Quelle Liste Voter? (ce 14 octobre 2018 aux élections communales en Belgique)</title>
            <meta name="viewport" content="initial-scale=1.0, width=device-width" />
          </Head>
          <div className="content">
            <h1>Pour Quelle Liste Voter?</h1>
            <h2>Ce 14 octobre 2018 aux élections communales 2018 en Belgique</h2>
            <section>
              <label>Quel est votre code postal?</label><br />
              <div className="row">
                <input name="zipcode" type="number" maxLength={4} style={ { width: '10rem' }} onChange={ e => this.setState({ zipcode: e.target.value })} />
                <Button onClick={() => this.continue()} primary>continuer</Button>
              </div>
              <div>
                <b>Par exemple:</b>
                <ul>
                  <li><Link href="/1000"><a>1000</a></Link> (Bruxelles)</li>
                  <li><Link href="/7100"><a>7100</a></Link> (La Louvière)</li>
                  <li><Link href="/7000"><a>7000</a></Link> (Mons)</li>
                  <li><Link href="/1348"><a>1348</a></Link> (Ottignies-Louvain-la-Neuve)</li>
                </ul>
              </div>
            </section>

            <section>
              <h2>Carte interactive des mandats</h2>
              <a href="/stats"><img src="https://d.pr/free/i/0sPk1G+" style={{width: '100%', maxWidth: '600px' }} /></a>
            </section>

            <section>
              <h2>Contribuer</h2>
              <p>Ceci est un projet open source. Contribuez!</p>
              <Button
                basic
                color="violet"
                onClick={() => this.goto('/contribuer')}
                >contribuer</Button>
            </section>

          </div>
          <Footer />
        </div>
    )
  }
}

export default HomePage;