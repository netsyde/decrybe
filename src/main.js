import ReactDOM from "react-dom";
import React from 'react';

import NavBar from './components/navbar'
import Description from './components/description'
import CenteredGrid from './components/grid'
const nodeUrl = 'https://testnodes.wavesnodes.com';
const seed = 'melody eye stock ostrich camera talk unlock royal insane pipe step squeeze';
const address = '3N67wqt9Xvvn1Qtgz6KvyEcdmr8AL7EVaQM';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import { spacing } from "@material-ui/system";

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
            <div className="container" style={{display: 'flex', flexDirection: "column", padding: 0, margin: 0}}>
                <NavBar position="static" auth={this.authFunc}/>
                <Container style={{paddingTop: "20px"}}>
                    <Description />
                    
                </Container>
            </div>
        )
    }
}

const app = document.getElementById('app');
if(app){
    ReactDOM.render(<App/>, app);
}