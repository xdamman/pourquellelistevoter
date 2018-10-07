import React from 'react';
import Link from 'next/link';

class Footer extends React.Component {

  constructor(props) {
      super(props);
  }

  render() {
    const { list } = this.props;

    return (
      <div className="Footer">
        <style jsx>{`
          .Footer {
            margin: 3rem 0 1rem 0;
            border-top: 1px solid #ccc;
            padding: 0.5rem 0;
          }
          ul {
            list-style: none;
            padding: 0;
            margin: 0.5rem 0;
          }
          li {
            display: inline-block;
            margin: 0 0.5rem;
          }
        `}</style>
        <ul>
          <li><Link href="/"><a title="retour page d'accueil">🏡</a></Link></li>
          <li><a href="https://github.com/xdamman/pourquellelistevoter/issues">🐞 Rapporter une erreur</a></li>
          <li><Link prefetch href="/contribuer"><a>🙌 Contribuer</a></Link></li>
          <li><Link prefetch href="/faq"><a>﹖ FAQ</a></Link></li>
          <li><a href="https://listescitoyennes.be">🇧🇪 listescitoyennes.be</a></li>
          <li><a href="https://facebook.com/listescitoyennesbelgique">🌏 Page Facebook</a></li>
          <li><a href="https://opencollective.com/listescitoyennes">💶 Faire un don</a></li>
        </ul>
      </div>
    );
  }
}

export default Footer;