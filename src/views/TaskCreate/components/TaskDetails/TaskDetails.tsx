import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import { Card, CardHeader, CardContent } from '@material-ui/core';

import { RichEditor } from '../../../../components';

const useStyles = makeStyles(() => ({
  root: {}
}));

const TaskDetails = props => {
  const { className, ...rest } = props;

  const classes = useStyles(1);

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <CardHeader title="Task details" />
      <CardContent>
        <RichEditor placeholder={"Say something about the task..."} />
      </CardContent>
    </Card>
  );
};

export default TaskDetails;
