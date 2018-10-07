import React from 'react';

class ListWarnings extends React.Component {

  constructor(props) {
      super(props);
  }

  render() {
    const { list } = this.props;
    if (!list || !list.info) return (<div />);
    const d = new Date;
    const year = d.getFullYear();

    return (
      <div className="ListWarnings">
        { list.info.program === 'process' &&
        <p>✅ Cette liste milite avant tout pour un nouveau processus démocratique pour impliquer le citoyen dans les décisions politiques.<br />
          En votant pour cette liste, vous ne devrez pas attendre 2024 ou descendre dans la rue pour faire entendre votre voix!</p>
        }
        { list.info.climate_first &&
        <p>✅ Cette liste milite avant tout pour prendre des mesures contre le réchauffement climatique 🌍 🌱</p>
        }
        { list.info.year_established < 2000 &&
        <p>⚠️ Cette liste émane d'un parti politique du {Math.ceil(list.info.year_established/100)}e siècle. Il a été créé en {list.info.year_established} (il y a {year - list.info.year_established} ans!).<br />
        A ce moment, il n'y avait pas d'Internet. Ce n'est donc pas dans leur ADN de partager l'information et de permettre à tout le monde de collaborer.</p>
        }
        { list.info.particracy &&
          <p>⚠️ En votant pour n'importe quel candidat de cette liste, vous votez également pour la <a href="https://fr.wikipedia.org/wiki/Particratie">particratie</a>.</p>
        }
        { list.info.inclusive === false &&
          <p>⚠️ ce parti n'est pas inclusif. Il oppose les habitants de la ville aux uns aux autres. Il refuse d'accepter que tout habitant doit pouvoir participer aux à notre démocratie.</p>
        }
      </div>
    );
  }
}

export default ListWarnings;