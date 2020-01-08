import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { IconButton, Input, Paper, Tooltip, Typography } from '@material-ui/core';
import CircularProgress from './components/CircularProgress';
const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: "#fff",
    padding: theme.spacing(2),
    height: 68,
    display: 'flex',
    alignItems: 'center',
    justifyContent: "space-between"
  },
  backButton: {
    marginRight: theme.spacing(2)
  },
  search: {
    height: 42,
    padding: theme.spacing(0, 2),
    display: 'flex',
    alignItems: 'center',
    flexBasis: 300,
    marginLeft: 'auto',
    [theme.breakpoints.down('sm')]: {
      flex: '1 1 auto'
    }
  },
  searchIcon: {
    marginRight: theme.spacing(2),
    color: "#000"
  },
  searchInput: {
    flexGrow: 1
  },
  moreButton: {
    marginLeft: theme.spacing(2)
  },
  nextButton: {

  },
  previousButton: {},
  progress: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center"
  }

}));

const DisputeToolbar = props => {
  const { onBack, dispute, className, ...rest } = props;

  const classes = useStyles(1);

  return (
    <div
      {...rest}
      className={clsx(classes.root, className)}
    >
      <Typography variant="h2" component="h3">
        {dispute.messages ? dispute.messages[0].title : "undefined"}
      </Typography>
      <div className={classes.progress}>
      <Typography variant="body2">
        Votes for dispute creator: {dispute.votes ? ((dispute.votes.creator / dispute.votes.total) * 100).toFixed(0) : "undefined"}%
        </Typography>
       <CircularProgress value={dispute.votes ? ((dispute.votes.creator / dispute.votes.total) * 100) : 0} />
      </div>
    </div>
  );
};

export default DisputeToolbar;
