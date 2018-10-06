import React from 'react';
import Link from 'next/link';
import listsData from '../../data/lists.json';
import Head from 'next/head';
import ReactPlayer from 'react-player'

class ListPage extends React.Component {

    static getInitialProps({ req: { data }, query }) {
        return { query, data };
    }

    constructor(props) {
        super(props);
    }

    render() {
        console.log(">>> this.props.data", this.props.data);
        const { list, stats, city } = this.props.data;
        // const total = data.total;
        const totalCandidates = Object.keys(list.candidates).length;
        if (totalCandidates === 0) {
            return (
                <div>
                    <h1>Désolé, nous n'avons pas de données pour cette liste</h1>
                    <h2>Vous pouvez nous aider en contribuant à <a href="https://docs.google.com/spreadsheets/d/1tdnQS234_Zpw4XpbkbAISI6XM0jzw8w7IKe-PLMLj6Y/edit#gid=440894185">ce fichier public</a>. Merci!</h2>
                </div>
            )
        }
        const listInfo = listsData[list.name.toLowerCase()];
        let recommendation;
        if (listInfo.program === 'process') {
          listInfo.name = list.name;
          recommendation = listInfo;
        }
        return (
          <div className="content">
            <Head>
              <title>Pour qui voter à {city}? A propos de la liste {list.name.toUpperCase()}...</title>
            </Head>
            <h1>Pour qui voter à {city}?</h1>
            <h2>A propos de la liste {list.name.toUpperCase()}</h2>
            <ul className="links">
              { listInfo.website && <li><a href={listInfo.website}>{listInfo.website}</a></li>}
              { listInfo.facebook && <li><a href={listInfo.facebook}>Facebook Page</a></li>}
              { listInfo.twitter && <li><a href={listInfo.twitter}>Twitter: @{listInfo.twitter.replace(/https?:\/\/(www\.)?twitter\.com\//i, '')}</a></li>}
            </ul>

            { recommendation &&
              <div className="recommendation">
                <div className="emoji">🎉</div>
                <p>{list.name} est une liste citoyenne qui limite avant tout pour un nouveau processus démocratique où vous pourrez participer en tant que citoyen!</p>
              </div>
            }

            <p>
              { stats.totalPoliticians ? <div>Au moins {stats.totalPoliticians} sont des politiciens appartenant au {Object.keys(stats.parties).join(', ')}.</div> : '' }
              { (stats.totalCumuls || stats.totalYearsInPolitics) ? <div>Ensemble, ils cumulent plus de {stats.totalCumuls} mandats et ont déjà passé plus de {stats.totalYearsInPolitics} années en politique.</div> : '' }
            </p>

            {  listInfo && listInfo.year_established < 2000 &&
              <div>
                <p>
                  ⚠️ En votant pour n'importe quel candidat de cette liste, vous votez également pour la <a href="https://fr.wikipedia.org/wiki/Particratie">particratie</a>.
                </p>
                <p>
                  ⚠️ Ce parti a été créé au {Math.floor(listInfo.year_established / 100)}e siècle (<a href={listInfo.wikipedia}>Wikipedia</a>).<br />
                  Êtes-vous sûr que c'est cela dont on a encore besoin pour faire face aux défis du 21e siècle?
                </p>
                <p>
                  <Link href={`/villes/${city}`}><a>Voir les autres listes à {city}</a></Link>
                </p>
              </div>
            }
            
            { listInfo && listInfo.video && <div className="video">
                <ReactPlayer url={listInfo.video} className="player" width='320' height='240' />
              </div> }

            <table>
              <tr>
                <th>position</th>
                <th>sexe</th>
                <th>candidat</th>
                <th>parti politique</th>
                <th>mandats</th>
                <th>années en politique</th>
              </tr>
              { list.candidates.map((candidate, index) => (
                <tr key={index}>
                  <td>{candidate.position}</td>
                  <td>{candidate.gender}</td>
                  <td>{candidate.firstname} {candidate.lastname}</td>
                  <td>{candidate.party}</td>                  
                  { candidate.cumuls_2017 ? <td align="center"><a href={candidate.cumuleo_url}>{candidate.cumuls_2017}</a></td> : <td align="center">0</td> }
                  { candidate.politicalYears ? <td align="center"><a href={candidate.cumuleo_url}>{candidate.politicalYears}</a></td> : <td align="center">0</td> }
                </tr>
              ))}
            </table>
            <p><br />
              <Link href={`/villes/${city}`}><a>Voir les autres listes à {city}</a></Link>
            </p>
          </div>
        )
    }

}

export default ListPage;