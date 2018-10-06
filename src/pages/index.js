import React from 'react';
import Head from 'next/head'
import { Button } from 'semantic-ui-react'
import Router from 'next/router'

class HomePage extends React.Component {

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
    console.log(">>> this.props", this.props);
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
            <label>Quel est votre code postal?</label><br />
            <div className="row">
              <input name="zipcode" type="number" maxLength={4} style={ { width: '10rem' }} onChange={ e => this.setState({ zipcode: e.target.value })} />
              <Button onClick={() => this.continue()} primary>continuer</Button>
            </div>
            <h2>Contribuer</h2>
            <p>Ceci est un projet open source. Rejoignez-nous!</p>
            <Button
              basic
              color="violet"
              onClick={() => this.goto('/contribuer')}
              >contribuer</Button>
          </div>
        </div>
    )
  }
}

export default HomePage;