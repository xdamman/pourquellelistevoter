import React from 'react';
import Link from 'next/link';
import Head from 'next/head';
import { plural } from '../lib/utils';
import ListWarnings from '../components/ListWarnings';
import Footer from '../components/Footer';

class CityPage extends React.Component {

    static getInitialProps({ req, res, query }) {
      if (res) {
        res.setHeader('Cache-Control', `s-maxage=${60*15}`);
      }
      return { query, data: req && req.data };
    }

    constructor(props) {
        super(props);
        this.data = props.data;
    }

    render() {
        const { city, lists, zipcode } = this.data;
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
                    <p>Vous pouvez nous aider en <Link href="/contribuer"><a>contribuant à ce projet</a></Link>. Merci!</p>
                </div>
            )
        }
        return (
          <div className="content">
            <Head>
              <title>Pour qui voter à {city}?</title>
            </Head>
            <h1>Pour qui voter à {city}?</h1>
            <h2>{totalLists} listes</h2>
            { recommendations.length === 0 &&
              <div className="recommendation">
                <div className="emoji">😔</div>
                <p>Il n'y a malheureusement pas (encore) de liste citoyenne dans votre commune qui milite non pas pour un programme mais avant tout pour une nouvelle façon d'inclure tous les citoyens dans les prises de décisions politiques.</p>
                <p>Si vous voulez créer ou soutenir la création d'une liste citoyenne dans votre commune, <a href={`https://docs.google.com/forms/d/e/1FAIpQLSf_c5tsGZewUwH4ylwZLBmi2n1Zh6eJ99BUsP4HlnI3yn2VAw/viewform?entry.49500494=${zipcode}`}>faites-le nous savoir ici</a></p>              
              </div>
            }
            { recommendations.length > 0 &&
              <div className="recommendation">
                <div className="emoji">🎉</div>
                <p>Il y a {recommendations.length} {plural(recommendations.length, 'liste citoyenne', 'listes citoyennes')} dans votre ville qui {plural(recommendations.length, 'milite', 'militent')} avant tout pour un nouveau processus démocratique où vous pourrez participer en tant que citoyen!</p>
                { recommendations.map(recommendation => <ListSummary listname={recommendation.name} lists={lists} city={city} />) }
              </div>
            }
            { Object.keys(lists).map((listname, index) => <ListSummary listname={listname} lists={lists} city={city} key={index} />) }
            <Footer />
          </div>
        )
    }

}

const ListSummary = ({ key, listname, city, lists }) => (
  <div key={key} className="ListSummmary">
    <style jsx>{`
        .stats {
          margin: 0.5rem 0;
        }
    `}</style>
    <h3 className="listname">
      <Link href={`/villes/${city}/${listname}`}><a>{listname}</a></Link>
    </h3>
    <ListWarnings list={lists[listname]} />
    <div className="stats">
      <span className="col"><Link href={`/villes/${city}/${listname}`}><a>{lists[listname].candidates.length} candidats</a></Link></span>
      { lists[listname].totalPoliticians ? <span className="col"> dont au moins {lists[listname].totalPoliticians} {lists[listname].totalPoliticians > 1 ? 'sont des politiciens' : 'est un.e politicien.ne'}</span> : '' }
    { (lists[listname].totalCumuls || lists[listname].totalYearsInPolitics)
        ? <div className="col">Ensemble, ils cumulent plus de {lists[listname].totalCumuls} mandats et ont déjà passé plus de {lists[listname].totalYearsInPolitics} années en politique.</div>
        : '' }
    </div>
  </div>
)

export default CityPage;