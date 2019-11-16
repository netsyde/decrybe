import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardContent, Typography, Link } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  root: {}
}));

const Deliverables = props => {
  const { className, ...rest } = props;

  const classes = useStyles(1);

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <CardContent>
        <Typography variant="h4">Notification:</Typography>
        <Typography variant="body1">
          There may be some errors in the display.
          Please report them to our
          <Link
           href="https://t.me/decrybechat"
           target="_blank"
           rel="noopener"
          > telegram </Link>
           chat
        </Typography>
      </CardContent>
    </Card>
  );
};

export default Deliverables;
