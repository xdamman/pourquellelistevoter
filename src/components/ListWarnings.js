import React from 'react';
import parties from '../../data/parties.json'

class ListWarnings extends React.Component {

  constructor(props) {
      super(props);
  }

  renderPartyInfo(sigle) {
    let info;
    for (let i=0; i< parties.length; i++) {
      const list = parties[i];
      if (list.sigle.toLowerCase() === sigle.toLowerCase()) {
        info = list;
      }
      if (sigle.toLowerCase().indexOf(list.sigle.toLowerCase()) > -1) {
        info = list;
      }
    }    
    if (!info) {
      console.log(">>> no info found for", sigle, "among", parties);
      return;
    }
    const d = new Date;
    const year = d.getFullYear();
    const wikipedia = info.wikipedia ? <a href={info.wikipedia}>(wikipedia)</a> : '';
    let originalName = info.original_name || info.sigle;
    if (originalName.length < 5) {
      originalName = originalName.toUpperCase();
    }
    return (
      <span>
        <b>{originalName}</b>, créé il y a {year - info.year_established} ans (en {info.year_established}) {wikipedia}.
      </span>
    )
  }

  render() {
    const { list } = this.props;
    if (!list || !list.info) return (<div />);

    return (
      <div className="ListWarnings">
        { list.info.program === 'process' &&
        <p>Cette liste milite avant tout pour un nouveau processus démocratique pour impliquer le citoyen dans les décisions politiques.</p>
        }
        { list.info.year_established < 2000 &&
        <p>Cette liste émane du { this.renderPartyInfo(list.name) }</p>
        }
        { list.candidates[0].party && list.candidates[0].party !== list.party &&
          <div>
            <p>Cette liste est tirée par un.e membre du parti <b>{list.candidates[0].party}</b>&nbsp;
            ({ this.renderPartyInfo(list.candidates[0].party) })</p>
          </div>
        }
        { list.info.inclusive === false &&
          <p>⚠️ ce parti n'est pas inclusif. Il oppose les habitants de la ville les uns aux autres. Il refuse d'accepter que tout habitant doit pouvoir participer aux à notre démocratie.</p>
        }
      </div>
    );
  }
}

export default ListWarnings;