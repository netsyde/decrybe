import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  root: {}
}));

const Header = props => {
  const { className, ...rest } = props;

  const classes = useStyles(1);

  return (
    <div
      {...rest}
      className={clsx(classes.root, className)}
    >
      <Typography
        component="h2"
        gutterBottom
        variant="overline"
      >
        New Dispute
      </Typography>
      <Typography
        component="h1"
        variant="h3"
      >
        Create new dispute
      </Typography>
    </div>
  );
};

Header.propTypes = {
  className: PropTypes.string
};

export default Header;
