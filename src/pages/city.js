import React from 'react';
import Link from 'next/link'

class CityPage extends React.Component {

    static getInitialProps({ req: { data }, query }) {
        return { query, data };
    }

    constructor(props) {
        super(props);
    }

    render() {
        console.log(">>> this.props", this.props);
        const { data } = this.props;
        const total = data.length
        if (total === 0) {
            return (
                <div>
                    <h1>Désolé, nous n'avons pas de données pour cette commune</h1>
                    <h2>Vous pouvez nous aider en contribuant à <a href="https://docs.google.com/spreadsheets/d/1tdnQS234_Zpw4XpbkbAISI6XM0jzw8w7IKe-PLMLj6Y/edit#gid=440894185">ce fichier public</a>. Merci!</h2>
                </div>
            )
        }
        const city = data[0].city;
        return (
          <div className="content">
            <h1>Pour qui voter à {city}</h1>
            <h2>{total} candidats</h2>
            <ul>
              { data.map((r, index) => (
                <li key={index}>
                  <Link href={`/${r.zipcode}/${r.firstname}/${r.lastname}`}>
                  <a>{r.firstname} {r.lastname}</a>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )
    }

}

export default CityPage;