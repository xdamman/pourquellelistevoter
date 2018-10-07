import React from 'react';
import Link from 'next/link';
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
        let recommendation;
        if (list.info && list.info.program === 'process') {
          recommendation = list.info;
        }
        return (
          <div className="content">
            <Head>
              <title>Pour qui voter à {city}? A propos de la liste {list.name.toUpperCase()}...</title>
            </Head>
            <h1>Pour qui voter à {city}?</h1>
            <h2>A propos de la liste {list.name.toUpperCase()}</h2>
            { list.info &&
              <ul className="links">
                { list.info.website && <li><a href={list.info.website}>{list.info.website}</a></li>}
                { list.info.facebook && <li><a href={list.info.facebook}>Facebook Page</a></li>}
                { list.info.twitter && <li><a href={list.info.twitter}>Twitter: @{list.info.twitter.replace(/https?:\/\/(www\.)?twitter\.com\//i, '')}</a></li>}
              </ul>
            }

            { recommendation &&
              <div className="recommendation">
                <div className="emoji">🎉</div>
                <p><b>{list.name}</b> est une liste citoyenne qui limite avant tout pour un nouveau processus démocratique où vous pourrez participer en tant que citoyen!</p>
              </div>
            }

            <p>
              { stats.totalPoliticians ? <div>Au moins {stats.totalPoliticians} sont des politiciens appartenant au {Object.keys(stats.parties).join(', ')}.</div> : '' }
              { (stats.totalCumuls || stats.totalYearsInPolitics) ? <div>Ensemble, ils cumulent plus de {stats.totalCumuls} mandats et ont déjà passé plus de {stats.totalYearsInPolitics} années en politique.</div> : '' }
            </p>

            {  list.info && list.info.year_established < 2000 &&
              <div>
                <p>
                  ⚠️ En votant pour n'importe quel candidat de cette liste, vous votez également pour la <a href="https://fr.wikipedia.org/wiki/Particratie">particratie</a>.
                </p>
                <p>
                  ⚠️ Ce parti a été créé au {Math.floor(list.info.year_established / 100)}e siècle (<a href={list.info.wikipedia}>Wikipedia</a>).<br />
                  Êtes-vous sûr que c'est cela dont on a encore besoin pour faire face aux défis du 21e siècle?
                </p>
                <p>
                  <Link href={`/villes/${city}`}><a>Voir les autres listes à {city}</a></Link>
                </p>
              </div>
            }
            
            { list.info && list.info.video && <div className="video">
                <ReactPlayer url={list.info.video} className="player" width='320' height='240' />
              </div> }

            <table>
              <tr>
                <th></th>
                <th>sexe</th>
                <th>candidat</th>
                <th>parti<br />politique</th>
                <th>mandats<sup><a href="#footnote">*</a></sup></th>
                <th>années<br />en politique</th>
              </tr>
              { list.candidates.map((candidate, index) => (
                <tr key={index}>
                  <td>{candidate.position}</td>
                { candidate.gender ? <td align="center">{candidate.gender}</td> : <td align="center" className="unknown">?</td> }
                  <td>{candidate.firstname} {candidate.lastname}</td>
                  <td align="center">{candidate.party}</td>                  
                  { candidate.cumuls_2017 ? <td align="center"><a href={candidate.cumuleo_url}>{candidate.cumuls_2017}</a></td> : <td align="center" className="unknown">?</td> }
                  { candidate.politicalYears ? <td align="center"><a href={candidate.cumuleo_url}>{candidate.politicalYears}</a></td> : <td align="center" className="unknown">?</td> }
                </tr>
              ))}
            </table>
            <div id="footnote">
              <b>Notes:</b><br />
              <ul>
                <li>Tous les mandats ne sont pas égaux. Certains sont rémunérés, d'autres pas. Certains demandent plus de temps que d'autres. Cliquez sur le lien pour voir plus d'informations sur ces mandats sur le site Cumuleo.be</li>
                <li>Les mandats qui n'entraînent pas d'obligations de déclarations de mandats à la Cour des comptes (conseiller communal, provincial et de CPAS) sont des mandats non exécutifs et ne sont pas repris dans ce tableau.</li>
                <li>Les "années en politiques" ne représentent que les années avec des fonctions exécutives</li>
              </ul>
            </div>
            <p><br />
              <Link href={`/villes/${city}`}><a>Voir les autres listes à {city}</a></Link>
            </p>
            <p>
              Pour rajouter des informations à propos de cette liste, veuillez consulter la page sur <Link href="/contribuer"><a>comment contribuer</a></Link>.
            </p>
          </div>
        )
    }

}

export default ListPage;