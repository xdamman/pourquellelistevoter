import React from "react";
import Link from "next/link";
import Head from "next/head";
import ReactPlayer from "react-player";
import ListWarnings from "../components/ListWarnings";
import Footer from "../components/Footer";
import { get } from "lodash";

class ListPage extends React.Component {
  static getInitialProps({ req, res, query }) {
    if (res) {
      res.setHeader("Cache-Control", `s-maxage=${60 * 60 * 24}`);
    }
    return { query, data: req && req.data };
  }

  constructor(props) {
    super(props);
    this.data = props.data;
    const d = new Date();
    this.year = d.getFullYear();
  }

  render() {
    console.log(">>> this.data", this.data);
    const { list, stats, city } = this.data;
    // const total = data.total;
    const totalCandidates = Object.keys(list.candidates).length;
    if (totalCandidates === 0) {
      return (
        <div>
          <h1>Désolé, nous n'avons pas de données pour cette liste</h1>
          <h2>
            Vous pouvez nous aider en contribuant à{" "}
            <a href="https://docs.google.com/spreadsheets/d/1tdnQS234_Zpw4XpbkbAISI6XM0jzw8w7IKe-PLMLj6Y/edit#gid=440894185">
              ce fichier public
            </a>
            . Merci!
          </h2>
        </div>
      );
    }
    let recommendation;
    if (list.info && list.info.program === "process") {
      recommendation = list.info;
    }
    const couldBeACitizenList =
      !recommendation &&
      !(get(list, "info.year_established") < 2000) &&
      !(get(list, "info.inclusive") === false);
    return (
      <div className="content">
        <Head>
          <title>
            Pour qui voter à {city.name}? A propos de la liste{" "}
            {list.name.toUpperCase()}
            ...
          </title>
        </Head>
        <h1>Pour qui voter à {city.name}?</h1>
        <h2>
          A propos de la liste {get(list, "info.name", list.name.toUpperCase())}
        </h2>
        {list.info && (
          <ul className="links">
            {list.info.website && (
              <li>
                <a href={list.info.website}>{list.info.website}</a>
              </li>
            )}
            {list.info.facebook && (
              <li>
                <a href={list.info.facebook}>Facebook Page</a>
              </li>
            )}
            {list.info.twitter && (
              <li>
                <a href={list.info.twitter}>
                  Twitter: @
                  {list.info.twitter.replace(
                    /https?:\/\/(www\.)?twitter\.com\//i,
                    ""
                  )}
                </a>
              </li>
            )}
          </ul>
        )}

        {recommendation && (
          <div className="recommendation">
            <div className="emoji">🎉</div>
            <p>
              <b>{list.name}</b> est une liste citoyenne qui milite avant tout
              pour un nouveau processus démocratique où vous pourrez participer
              en tant que citoyen!
            </p>
          </div>
        )}
        {get(list, "info.description") && (
          <section>
            <p>{list.info.description}</p>
          </section>
        )}
        <p>
          {stats.totalPoliticians ? (
            <div>
              Au moins {stats.totalPoliticians} sont des politiciens appartenant
              au {Object.keys(stats.parties).join(", ")}.
            </div>
          ) : (
            ""
          )}
          {stats.totalCumuls || stats.totalYearsInPolitics ? (
            <div>
              Ensemble, ils cumulent plus de {stats.totalCumuls} mandats et ont
              déjà passé plus de {stats.totalYearsInPolitics} années en
              politique.
            </div>
          ) : (
            ""
          )}
        </p>

        <section>
          <ListWarnings list={list} />
        </section>

        {list.info &&
          list.info.video && (
            <div className="video">
              <ReactPlayer
                url={list.info.video}
                className="player"
                width="320"
                height="240"
              />
            </div>
          )}

        <table>
          <tr>
            <th />
            <th>sexe</th>
            <th>candidat</th>
            <th>
              parti
              <br />
              politique
            </th>
            <th>
              mandats
              <sup>
                <a href="#footnote">*</a>
              </sup>
            </th>
            <th>
              années
              <br />
              en politique
            </th>
          </tr>
          {list.candidates.map((candidate, index) => (
            <tr key={index}>
              <td>{candidate.position}</td>
              {candidate.gender ? (
                <td align="center">{candidate.gender}</td>
              ) : (
                <td align="center" className="unknown">
                  ?
                </td>
              )}
              <td>
                {candidate.firstname} {candidate.lastname}
              </td>
              <td align="center">{candidate.party}</td>
              {candidate.cumuls_2017 ? (
                <td align="center">
                  <a href={candidate.cumuleo_url}>{candidate.cumuls_2017}</a>
                </td>
              ) : (
                <td align="center" className="unknown">
                  ?
                </td>
              )}
              {candidate.politicalYears ? (
                <td align="center">
                  <a href={candidate.cumuleo_url}>{candidate.politicalYears}</a>
                </td>
              ) : (
                <td align="center" className="unknown">
                  ?
                </td>
              )}
            </tr>
          ))}
        </table>
        <div id="footnote">
          <b>Notes:</b>
          <br />
          <ul>
            <li>
              Tous les mandats ne sont pas égaux. Certains sont rémunérés,
              d'autres pas. Certains demandent plus de temps que d'autres.
              Cliquez sur le lien pour voir plus d'informations sur ces mandats
              sur le site Cumuleo.be
            </li>
            <li>
              Les "années en politiques" ne représentent que les années où le
              mandataire a exercé, depuis 2004, un ou plusieurs mandats soumis à
              l'obligation de déclaration envers la Cour des comptes (les
              mandats de conseiller communal, provincial et de CPAS ne sont donc
              pas inclus).
            </li>
          </ul>
        </div>
        <p>
          <br />
          <Link href={`/villes/${city.name}`}>
            <a>Voir les autres listes à {city.name}</a>
          </Link>
        </p>
        {couldBeACitizenList && (
          <p>
            👋 Est-ce que cette liste est une liste citoyenne? Si oui, merci de
            la rajouter en utilisant{" "}
            <a
              href={`https://docs.google.com/forms/d/e/1FAIpQLScBkngPG2j9BO-WDQCksqJOXALku1ikHHVDMnNDwvovdvhPlg/viewform?usp=pp_url&entry.2096957254=https://pourquellelistevoter.be/villes/${
                city.name
              }/${list.name}+&entry.804413786=${
                city.zipcode
              }&entry.1851737445=${list.name}&entry.871124266=${this.year}`}
            >
              ce formulaire
            </a>
            .
          </p>
        )}
        {!couldBeACitizenList && (
          <p>
            Pour rajouter des informations à propos de cette liste, veuillez
            consulter la page sur{" "}
            <Link href="/contribuer">
              <a>comment contribuer</a>
            </Link>
            .
          </p>
        )}
        <Footer />
      </div>
    );
  }
}

export default ListPage;
