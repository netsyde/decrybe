import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import {
  Button,
  Divider,
  List,
  ListItem,
  Typography,
  colors
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { observer } from 'mobx-react';

import { DisputeComment } from '../../../../components';

const useStyles = makeStyles(theme => ({
  root: {
    height: '100%',
    backgroundColor: "#fff"
  },
  toolbar: {
    padding: theme.spacing(2, 3)
  },
  addIcon: {
    marginRight: theme.spacing(1)
  },
  button: {
    justifyContent: 'flex-start',
    textTransform: 'none',
    letterSpacing: 0,
    fontWeight: theme.typography.fontWeightRegular
  },
  folderIcon: {
    marginRight: theme.spacing(1),
    color: colors.blueGrey[600]
  },
  totalItems: {
    marginLeft: theme.spacing(1)
  },
  newItems: {
    marginLeft: 'auto'
  },
  active: {
    fontWeight: theme.typography.fontWeightMedium,
    color: theme.palette.primary.main,
    '& $folderIcon': {
      color: theme.palette.primary.main
    }
  },
  listItem: {

  }
}));

const DisputeComments = props => {
  const { comments, className, ...rest } = props;

  const classes = useStyles(props);

  const [active, setActive] = useState('inbox');

  return (
    <div
      {...rest}
      className={clsx(classes.root, className)}
    >
      <div className={classes.toolbar}>
        <Button
          color="primary"
          fullWidth
          variant="contained"
        >
          <AddIcon className={classes.addIcon} />
          Compose message
        </Button>
      </div>
      <Divider />
      {comments.map(comment => (
        <DisputeComment comment={comment} key={comment.key}/>
      ))}
    </div>
  );
};

export default DisputeComments;
