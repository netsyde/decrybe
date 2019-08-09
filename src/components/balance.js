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

export default function Balance(props) {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Title>Balance</Title>
      <Typography component="p" variant="h4">
        {props.balance}
      </Typography>
      <Typography color="textSecondary" className={classes.depositContext}>
        on 9 August, 2019
      </Typography>
      <div>
        <Link color="primary" href="javascript:;">
          View balance
        </Link>
      </div>
    </React.Fragment>
  );
}