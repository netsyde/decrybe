import ReactDOM from "react-dom";
import React from 'react';
import NavBar from './components/navbar'
import Description from './components/description'
const nodeUrl = 'https://testnodes.wavesnodes.com';
const seed = 'melody eye stock ostrich camera talk unlock royal insane pipe step squeeze';
const address = '3N67wqt9Xvvn1Qtgz6KvyEcdmr8AL7EVaQM';
import Container from '@material-ui/core/Container';
import * as nodeInt from './modules/nodeInt';

class App extends React.Component {
  constructor(props) {
   super(props);
    this.state = {
      isAuth: false,
      keeperData: {},
    }
    this.authFunc = this.authFunc.bind(this);
  }

  async authFunc () {
	  if (WavesKeeper) {
      const getPublicState = async () => {
        try {
          const state = await WavesKeeper.publicState();
          console.log(state);
          let balance = await nodeInt.getBalance(state.account.address, nodeUrl)
          this.setState({
            isAuth: true,
            keeperData: state.account,
            balance: balance.balance/1e8
          })
          console.log(balance)
        } catch(error) {
    	    console.error(error);
  	    }
      } 
      const result = await getPublicState();
    } else {
      alert("To Auth WavesKeeper should be installed.");
    }
	}

  render() {
	  return (
  	  <div className="container" style={{display: 'flex', flexDirection: "column", padding: 0, margin: 0}}>
        <NavBar position="static" auth={this.authFunc} address={this.state.keeperData.address ? this.state.keeperData.address : "Login"} balance={this.state.balance ? this.state.balance : "Nan" } />
        <Container maxWidth="lg">
          <Description />
        </Container>
      </div>
    )
  }
}

const app = document.getElementById('app');
if (app) {
  ReactDOM.render(<App/>, app);
}