import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { Button } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
//import logo from '../img/1.png'
const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3, 2),
    display: 'flex',
  },
  button: {
    margin: theme.spacing(1),
  },
  buttons: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    display: 'none',
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

export default function Description() {
  const classes = useStyles();

  return (
      <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12} zeroMinWidth>
          <Paper className={classes.paper}>
            <Typography variant="h4" component="h2">
              deLance
            </ Typography >
            <Typography component="p">
                  In the 21st century, the so-called self-employment becomes very popular.
                  People try to avoid working in companies, preferring to work at home.
                  But how in that case to look for orders if nobody knows about You?
                  Come to the aid of freelance exchanges. But their problem is that they are all centralized,
                  deLance will solve this problem.
                  deLance is a decentralized freelancing exchange.
                  deLance at the initial stage will be a site only,
                  and later will get mobile applications with a convenient API.
                  All data of the exchange will be stored in a decentralized database – the Waves blockchain. Anyone can find them in our dApp.
            </Typography>
            <div className={classes.buttons}>
              <Button variant="contained" color="primary" className={classes.button}>
                I`m a customer
              </Button>
              <Button variant="contained" color="secondary" className={classes.button}>
                I`m a freelancer
              </Button>
            </div>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4} lg={3}>
          <Paper className={classes.paper}>
            <Typography variant="h4" component="h2">
              Stats
            </Typography >
            <Typography component="p">
              Freelancers: 56
            </Typography>
            <Typography component="p">
              Customers: 579
            </Typography>
            <Typography component="p">
              Waves earned: 3.461
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={8} lg={9}>
          <Paper className={classes.paper}>
            <Typography variant="h4" component="h2">
              Why deLance?
            </Typography >
            <Typography component="p">
            To combat centralization, we offer our decentralized application. Even if the main site in connection with any of the conditions of the outside will be closed,
            anyone will be able to run a similar site and continue to use the service. With all the data about orders, reviews, etc.will remain.
            To combat cheating reviews will help us blockchain technology and rating system. More details later.
            Cheating will be impossible to make. Since the contract between the customer and the contractor will be governed by a smart contract.
            When ordering, the smart contract checks whether the customer has money to pay for the order,
            if there is, then the money goes to dApp and remains there until the order is executed by the contractor or until n days have passed from the date of the order.
            If the order is executed by the contractor and the customer is satisfied with the result, the money is transferred to the contractor, and the order is sent to the customer.
            If one of the parties believes that it has been deceived, it can hold a so-called referendum,
            i.e. put on display the details of the order and provide an opportunity for all participants of the platform to vote and decide which of the parties is right. The winning side gets the money.
            </Typography>
          </Paper>
        </Grid>
      </Grid>
      </div>
  );
}