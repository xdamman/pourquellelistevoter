import React from 'react';
import Link from 'next/link';
import Head from 'next/head';
import { plural } from '../lib/utils';

class CityPage extends React.Component {

    static getInitialProps({ req, query }) {
        return { query, data: req && req.data };
    }

    constructor(props) {
        super(props);
        this.data = props.data;
    }

    render() {
        const { city, lists } = this.data;
        const recommendations = [];
        Object.keys(lists).map(listname => {
            const listInfo = lists[listname].info;
            if (listInfo && listInfo.program === 'process') {
              listInfo.name = listname;
              recommendations.push(listInfo);
            }
        });

        // const total = data.total;
        const totalLists = Object.keys(lists).length;
        if (totalLists === 0) {
            return (
                <div>
                    <h1>Désolé, nous n'avons pas de données pour cette commune</h1>
                    <p>Vous pouvez nous aider en contribuant à <a href="https://docs.google.com/spreadsheets/d/1tdnQS234_Zpw4XpbkbAISI6XM0jzw8w7IKe-PLMLj6Y/edit#gid=440894185">ce fichier public</a>. Merci!</p>
                </div>
            )
        }
        return (
          <div className="content">
            <Head>
              <title>Pour qui voter à {city}?</title>
            </Head>
            <style jsx>{`
                .stats {
                  margin-bottom: 0.5rem;
                }
            `}</style>
            <h1>Pour qui voter à {city}?</h1>
            <h2>{totalLists} listes</h2>
            { recommendations.length > 0 &&
              <div className="recommendation">
                <div className="emoji">🎉</div>
                <p>Il y a {recommendations.length} {plural(recommendations.length, 'liste citoyenne', 'listes citoyennes')} dans votre ville qui {plural(recommendations.length, 'limite', 'limitent')} avant tout pour un nouveau processus démocratique où vous pourrez participer en tant que citoyen!</p>
                { recommendations.map(recommendation => <ListSummary listname={recommendation.name} lists={lists} city={city} />) }
              </div>
            }
            { Object.keys(lists).map((listname, index) => <ListSummary listname={listname} lists={lists} city={city} key={index} />) }
          </div>
        )
    }

}

const ListSummary = ({ key, listname, city, lists }) => (
  <div key={key} className="ListSummmary">
    <h3 className="listname">
      <Link href={`/villes/${city}/${listname}`}><a>{listname}</a></Link>
    </h3>
    <div className="stats">
      <span className="col"><Link href={`/villes/${city}/${listname}`}><a>{lists[listname].candidates.length} candidats</a></Link></span>
      { lists[listname].totalPoliticians ? <span className="col"> dont au moins {lists[listname].totalPoliticians} {lists[listname].totalPoliticians > 1 ? 'sont des politiciens' : 'est un.e politicien.ne'}</span> : '' }
    </div>
    { lists[listname].info && lists[listname].info.program === 'process' &&
      <p>✅ Cette liste milite avant tout pour un nouveau processus démocratique pour impliquer le citoyen dans les décisions politiques.
        En votant pour cette liste, vous ne devrez pas attendre 2024 ou descendre dans la rue pour faire entendre votre voix!</p>
    }
    { lists[listname].info && lists[listname].info.year_established < 2000 &&
      <p>⚠️ En votant pour n'importe quel candidat de cette liste, vous votez également pour la <a href="https://fr.wikipedia.org/wiki/Particratie">particratie</a>.</p>
    }
    { (lists[listname].totalCumuls || lists[listname].totalYearsInPolitics)
      ? <div className="col">Ensemble, ils cumulent plus de {lists[listname].totalCumuls} mandats et ont déjà passé plus de {lists[listname].totalYearsInPolitics} années en politique.</div>
      : '' }
  </div>
)

export default CityPage;