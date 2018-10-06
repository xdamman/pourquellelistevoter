import React from 'react';

class ProfilePage extends React.Component {

    static getInitialProps({ req: { data }, query }) {
        return { query, data };
    }

    constructor(props) {
        super(props);
    }

    render() {
        console.log(">>> this.props.data", this.props.data);
        const { data } = this.props;
        if (!data) {
            return (
                <div>
                    <h1>Pas de profil trouvé</h1>
                </div>
            )
        }
        const cumuleo = data.cumuleo;
        const incomplete = !(data.profession && data.birthyear);
        return (
            <div>
                <h1>Profil de {data.firstname} {data.lastname}</h1>
                <ul>
                    { cumuleo &&
                        <li>
                            {data.firstname} a {cumuleo.cumuls_2017} mandats. Plus d'info sur <a href={cumuleo.cumuleo_url}>cumuleo.be</a>.
                        </li>
                    }
                </ul>
                { incomplete &&
                    <div>
                        Ce profil n'est pas complet. 
                        Vous pouvez nous aider à le compléter en <a href="https://docs.google.com/spreadsheets/d/1tdnQS234_Zpw4XpbkbAISI6XM0jzw8w7IKe-PLMLj6Y/edit#gid=440894185">éditant ce document public</a>. 
                        Merci!
                    </div>
                }
            </div>
        )
    }

}

export default ProfilePage;