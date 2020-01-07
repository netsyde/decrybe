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
import { Application } from './components'
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

const DisputeComments = observer((props) => {
  const { comments, dispute, rootStore, className, ...rest } = props;

  const classes = useStyles(props);

  const [openApplication, setOpenApplication] = useState(false);

  const handleApplicationOpen = () => {
    setOpenApplication(true);
  };

  const handleApplicationClose = () => {
    setOpenApplication(false);
  };
  return (
    <div
      {...rest}
      className={clsx(classes.root, className)}
    >
      {(rootStore.user.getUserAddress != dispute.customer && rootStore.user.getUserAddress != dispute.freelancer) ?
       <div className={classes.toolbar}>
        <Button
          color="primary"
          fullWidth
          variant="contained"
          onClick={handleApplicationOpen}
        >
          <AddIcon className={classes.addIcon} />
          Compose message
        </Button>
      </div> : null}
      <Divider />
      {comments.map(comment => (
        <DisputeComment comment={comment} key={comment.key}/>
      ))}
      <Application
        onClose={handleApplicationClose}
        open={openApplication}
        rootStore={rootStore}
        dispute={dispute}
        handleApplicationClose={handleApplicationClose}
      />
    </div>
  );
});

export default DisputeComments;
