import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { IconButton, Input, Paper, Tooltip, Typography } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: "#fff",
    padding: theme.spacing(2),
    height: 68,
    display: 'flex',
    alignItems: 'center'
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
  previousButton: {}

}));

const DisputeToolbar = props => {
  const { onBack, className, ...rest } = props;

  const classes = useStyles(1);

  return (
    <div
      {...rest}
      className={clsx(classes.root, className)}
    >
      <Typography variant="h2" component="h3">
        Task Dispute: the customer deceived me
      </Typography>
    {/*
      <Tooltip title="More options">
        <IconButton
          className={classes.moreButton}
          size="small"
        >
          <MoreIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title="Previous email">
        <IconButton
          className={classes.previousButton}
          size="small"
        >
          <KeyboardArrowLeftIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title="Next email">
        <IconButton
          className={classes.nextButton}
          size="small"
        >
          <KeyboardArrowRightIcon />
        </IconButton>
      </Tooltip>} */}
    </div>
  );
};

export default DisputeToolbar;
