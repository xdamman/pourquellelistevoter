import React from "react";
import Link from "next/link";
import Head from "next/head";
import { plural } from "../lib/utils";
import ListWarnings from "../components/ListWarnings";
import Footer from "../components/Footer";
import { get } from "lodash";

class CityPage extends React.Component {
  static getInitialProps({ req, res, query }) {
    if (res) {
      res.setHeader("Cache-Control", `s-maxage=${60 * 60 * 24}`);
    }
    return { query, data: req && req.data };
  }

  constructor(props) {
    super(props);
    this.data = props.data;
    this.recommendations = [];
    this.data.lists.forEach(list => {
      if (
        get(list, "info.program") === "process" &&
        Number(get(list, "totalPoliticians")) <= 1
      ) {
        this.recommendations.push(list);
      }
    });
  }

  render() {
    const { city, lists, zipcode } = this.data;
    const totalLists = Object.keys(lists).length;
    if (totalLists === 0) {
      return (
        <div>
          <h1>Désolé, nous n'avons pas de données pour cette commune</h1>
          <p>
            Vous pouvez nous aider en{" "}
            <Link href="/contribuer">
              <a>contribuant à ce projet</a>
            </Link>
            . Merci!
          </p>
        </div>
      );
    }
    return (
      <div className="content">
        <style jsx>{`
          .graph {
            margin: 2rem 0 1rem 0;
          }
          .graph h4 {
            margin-top: 0;
          }
        `}</style>
        <Head>
          <title>Pour qui voter à {city.name}?</title>
        </Head>
        <h1>Pour qui voter à {city.name}?</h1>
        {this.recommendations.length === 0 && (
          <div className="recommendation">
            <div className="emoji">😔</div>
            <p>
              Il n'y a malheureusement pas (encore) de liste citoyenne (qui
              n'émane pas des partis politiques existants) dans votre commune
              qui milite non pas pour un programme mais avant tout pour une
              nouvelle façon d'inclure tous les citoyens dans les prises de
              décisions politiques.
            </p>
            <p>
              Si vous voulez créer ou soutenir la création d'une liste citoyenne
              dans votre commune,{" "}
              <a
                href={`https://docs.google.com/forms/d/e/1FAIpQLSf_c5tsGZewUwH4ylwZLBmi2n1Zh6eJ99BUsP4HlnI3yn2VAw/viewform?entry.49500494=${zipcode}`}
              >
                faites-le nous savoir ici
              </a>
              .
            </p>
            <p>
              Si vous faites partie d'une liste citoyenne ci-dessous et qu'elle
              n'est pas encore reconnue en tant que telle, cliquez dessus et en
              bas de la page cliquez sur "rajouter en tant que liste citoyenne".
            </p>
          </div>
        )}
        {false &&
          this.recommendations.length > 0 && (
            <div className="recommendation">
              <div className="emoji">🎉</div>
              <p>
                Il y a {this.recommendations.length}{" "}
                {plural(
                  this.recommendations.length,
                  "liste citoyenne",
                  "listes citoyennes"
                )}{" "}
                dans votre ville qui{" "}
                {plural(this.recommendations.length, "milite", "militent")}{" "}
                avant tout pour un nouveau processus démocratique où vous
                pourrez participer en tant que citoyen!
              </p>
              {this.recommendations.map((recommendation, index) => (
                <ListSummary list={recommendation} city={city} key={index} />
              ))}
            </div>
          )}
        {city.age_pyramid && (
          <div className="graph">
            <h3>Pyramide des âges à {city.name}</h3>
            <h4>{city.age_pyramid.caption}</h4>
            <a
              href={city.age_pyramid.image}
              title="voir la pyramide des âges des électeurs en grand"
            >
              <img src={city.age_pyramid.image} style={{ width: "100%" }} />
            </a>
          </div>
        )}
        {city.electors_cloud && (
          <div className="graph">
            <h3>
              Nuage des prénoms des électeurs qui peuvent voter à {city.name}
            </h3>
            <a
              href={city.electors_cloud}
              title="voir le cloud des prénoms des électeurs en grand"
            >
              <img src={city.electors_cloud} style={{ width: "100%" }} />
            </a>
          </div>
        )}
        <h2>{totalLists} listes (par ordre alphabétique)</h2>
        {lists.map(
          (list, index) =>
            list && <ListSummary list={list} city={city} key={index} />
        )}
        <Footer />
      </div>
    );
  }
}

const ListSummary = ({ key, list, city }) => (
  <div key={key} className="ListSummmary">
    <style jsx>{`
      .stats {
        margin: 0.5rem 0;
      }
    `}</style>
    <h3 className="listname">
      <Link prefetch href={`/villes/${city.name}/${list.name}`}>
        <a>{list.name}</a>
      </Link>
    </h3>
    <ListWarnings list={list} />
    <div className="stats">
      <span className="col">
        <Link href={`/villes/${city.name}/${list.name}`}>
          <a>{list.candidates.length} candidats</a>
        </Link>
      </span>
      {list.totalPoliticians ? (
        <span className="col">
          {" "}
          dont au moins {list.totalPoliticians}{" "}
          {list.totalPoliticians > 1
            ? "sont des politiciens"
            : "est un.e politicien.ne"}
        </span>
      ) : (
        ""
      )}
      {list.totalCumuls || list.totalYearsInPolitics ? (
        <div className="col">
          Ensemble, ils cumulent plus de {list.totalCumuls} mandats et ont déjà
          passé plus de {list.totalYearsInPolitics} années en politique.
        </div>
      ) : (
        ""
      )}
    </div>
  </div>
);

export default CityPage;
