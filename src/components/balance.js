import React from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';

function Title(props) {
  return (
    <Typography component="h2" variant="h6" style={{color:"#654EA3"}} gutterBottom>
      {props.children}
    </Typography>
  );
}

Title.propTypes = {
  children: PropTypes.node,
};

const useStyles = makeStyles({
  depositContext: {
    flex: 1,
  },
});

function GetDateNow() {
  let tempDate = new Date();
  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  let date = `on ${tempDate.getDate()} ${monthNames[tempDate.getMonth()]}, ${tempDate.getFullYear()}`;

  return date;
}

export default function Balance(props) {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Title>Balance</Title>
      <Typography component="p" variant="h4">
        {props.balance}
      </Typography>
      <Typography color="textSecondary" className={classes.depositContext}>
        <GetDateNow />
      </Typography>
      <div>
        <Link color="primary" href="javascript:;">
          View balance
        </Link>
      </div>
    </React.Fragment>
  );
}