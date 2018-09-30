import React from 'react';

class HomePage extends React.Component {

    render() {
        console.log(">>> this.props", this.props);
        const { firstname } = this.props;
        return (
            <div>
                <h1>Pour Qui Voter?</h1>
                <input name="zipcode" type="number" maxLength={4} />
                <button onClick="">continuer</button>
                <h2>Aidez-nous à compléter notre base de donnée!</h2>
                Vous pouvez contribuer à notre base de donnée en <a href="https://docs.google.com/spreadsheets/d/1tdnQS234_Zpw4XpbkbAISI6XM0jzw8w7IKe-PLMLj6Y/edit#gid=440894185">éditant ce document</a>.
            </div>
        )
    }

}

export default HomePage;