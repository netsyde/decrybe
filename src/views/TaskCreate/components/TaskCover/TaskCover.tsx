import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import { Card, CardHeader, CardContent } from '@material-ui/core';

import { FilesDropzone } from '../../../../components';

const useStyles = makeStyles(() => ({
  root: {}
}));

const TaskCover = props => {
  const { className, ...rest } = props;

  const classes = useStyles(1);

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <CardHeader title="Task cover" />
      <CardContent>
        <FilesDropzone />
      </CardContent>
    </Card>
  );
};

TaskCover.propTypes = {
  className: PropTypes.string
};

export default TaskCover;
