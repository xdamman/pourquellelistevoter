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
            <title>Pour Qui Voter?</title>
            <meta name="viewport" content="initial-scale=1.0, width=device-width" />
          </Head>
          <div className="content">
            <h1>Pour Qui Voter?</h1>
            <label>Quel est votre code postal?</label><br />
            <div className="row">
              <input name="zipcode" type="number" maxLength={4} style={ { width: '10rem' }} onChange={ e => this.setState({ zipcode: e.target.value })} />
              <Button onClick={() => this.continue()} primary>continuer</Button>
            </div>
            <h2>Aidez-nous à compléter notre base de donnée!</h2>
            <Button
              basic
              color="violet"
              onClick={() => this.goto('https://docs.google.com/spreadsheets/d/1tdnQS234_Zpw4XpbkbAISI6XM0jzw8w7IKe-PLMLj6Y/edit#gid=440894185')}
              >contribuer</Button>
          </div>
        </div>
    )
  }
}

export default HomePage;