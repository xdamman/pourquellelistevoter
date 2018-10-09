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
        <b>{originalName}</b>, créé en {info.year_established} (il y a {year - info.year_established} ans) {wikipedia}.
      </span>
    )
  }

  render() {
    const { list } = this.props;
    if (!list) return (<div />);
    console.log("show list", list);
    return (
      <div className="ListWarnings">
        { list.info && list.info.program === 'process' &&
        <p>🙋🏻‍ Cette liste ne milite pas pour un programme mais milite avant tout pour un nouveau processus démocratique pour impliquer le citoyen dans les décisions politiques.</p>
        }
        { list.info && list.info.year_established < 2000 &&
        <p>Cette liste émane du { this.renderPartyInfo(list.name) }</p>
        }
        { list.candidates[0].party && list.name.toLowerCase() !== list.candidates[0].party.toLowerCase() &&
          <div>
            <p>Cette liste est tirée par un.e membre du parti <b>{list.candidates[0].party}</b>&nbsp;
            ({ this.renderPartyInfo(list.candidates[0].party) })</p>
          </div>
        }
        { false && list.info && list.info.inclusive === false &&
          <p>⚠️ ce parti n'est pas inclusif. Il oppose les habitants de la ville les uns aux autres. Il refuse d'accepter que tout habitant doit pouvoir participer aux à notre démocratie.</p>
        }
      </div>
    );
  }
}

export default ListWarnings;