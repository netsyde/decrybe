import ReactDOM from "react-dom";
import Button from '@material-ui/core/Button';
import React from 'react';

import NavBar from './components/navbar'

const nodeUrl = 'https://testnodes.wavesnodes.com';
const seed = 'melody eye stock ostrich camera talk unlock royal insane pipe step squeeze';
const address = '3N67wqt9Xvvn1Qtgz6KvyEcdmr8AL7EVaQM';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isAuth: false,
            keeperData: {},
            inventory: []

        }
        this.authFunc = this.authFunc.bind(this);
    }

    async authFunc () {
        const authData = {
            data: "Auth on my site"
        };
        if (WavesKeeper) {
            WavesKeeper.auth( authData )
            .then(auth => {
                console.log( auth );
                this.setState({
                    isAuth: true,
                    keeperData: auth})
            }).catch(error => {
                console.error( error );
            })
        } else {
            alert("To Auth WavesKeeper should be installed.");
        }
    }

    render() {
        return (
            <div className="container">
                <NavBar auth={this.authFunc}/>
            </div>
        )
    }
}

const app = document.getElementById('app');
if(app){
    ReactDOM.render(<App/>, app);
}