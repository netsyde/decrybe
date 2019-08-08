import ReactDOM from "react-dom";
import React from 'react';
import NavBar from './components/navbar'
const nodeUrl = 'https://testnodes.wavesnodes.com';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import * as nodeInt from './modules/nodeInt';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import clsx from 'clsx';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 240,
  },
}));

export default function Main (props) {
	const classes = useStyles();
	const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
	return (
		<div className={classes.root}>
		<CssBaseline />
		<NavBar auth={props.auth} address={props.address ? props.address : "Login"} balance={props.balance ? props.balance : "Nan" }/>
		<main className={classes.content}>
			<div className={classes.appBarSpacer} />
			<Container maxWidth="lg" className={classes.container}>
				<Grid container spacing={3}>
					{/* Chart */}
					<Grid item xs={12} md={8} lg={9}>
						<Paper className={fixedHeightPaper}>
						 
						</Paper>
					</Grid>
					{/* Recent Deposits */}
					<Grid item xs={12} md={4} lg={3}>
						<Paper className={fixedHeightPaper}>
						 
						</Paper>
					</Grid>
					{/* Recent Orders */}
					<Grid item xs={12}>
						<Paper className={classes.paper}>
							
						</Paper>
					</Grid>
				</Grid>
			</Container>
			<MadeWithLove />
		</main>
	</div>
	)
}

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
	  	<Main auth={this.authFunc} address={this.state.keeperData.address ? this.state.keeperData.address : "Login"} balance={this.state.balance ? this.state.balance : "Nan" }/>
    )
  }
}

function MadeWithLove() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Built with love by the '}
      <Link color="inherit" href="https://netsy.de/">
        NetSyde
      </Link>
      {' team.'}
    </Typography>
  );
}
const app = document.getElementById('app');
if (app) {
  ReactDOM.render(<App />, app);
}