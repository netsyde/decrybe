import React, { useRef, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import {
  IconButton,
  Toolbar,
  Tooltip,
  Typography,
  Button
} from '@material-ui/core';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import { observer } from 'mobx-react';
import * as dAppInt from '../../../../../../modules/dAppInt'
import * as nodeInt from '../../../../../../modules/nodeInt'

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: '#ffffff'
  },
  backButton: {
    marginRight: theme.spacing(2),
    '@media (min-width: 864px)': {
      display: 'none'
    }
  },
  user: {
    flexShrink: 0,
    flexGrow: 1
  },
  activity: {
    display: 'flex',
    alignItems: 'center'
  },
  statusBullet: {
    marginRight: theme.spacing(1)
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
    color: theme.palette.icon
  },
  searchInput: {
    flexGrow: 1
  },
  button: {
    marginRight: theme.spacing(1),
  }
}));

const ConversationToolbar = observer((props) => {
  const { conversation, className, rootStore, ...rest } = props;

  const classes = useStyles(props);
  const moreRef = useRef(null);
  const [openMenu, setOpenMenu] = useState(false);

  const handleMenuOpen = () => {
    setOpenMenu(true);
  };

  const handleMenuClose = () => {
    setOpenMenu(false);
  };

  const handleClick = async (event) => {
    event.preventDefault();
    let data = await nodeInt.getClearTaskData(rootStore.user.getStorage, conversation.task.uuid);
    data.freelancer = conversation.user.address;
    data.status = "in progress"
    let tx = await dAppInt.hireFreelancer(conversation.task.uuid, conversation.user.address, data, rootStore.user.getWavesKeeper)
    console.log(tx)
  };

  return (
    <Toolbar
      {...rest}
      className={clsx(classes.root, className)}
    >
      <Tooltip title="Back">
        <IconButton
          className={classes.backButton}
          component={RouterLink}
          edge="start"
          to="/chat"
        >
          <KeyboardBackspaceIcon />
        </IconButton>
      </Tooltip>
      <div className={classes.user}>
        <Typography variant="h6">{conversation.user.name}</Typography>
      </div>

      {rootStore.user.getUserAddress == conversation.task.author.address  && !conversation.task.freelancer ? <Button
        color="primary"
        variant="contained"
        type="submit"
        onClick={handleClick}
        //className={classes.button}
        //disabled={!isValid}
      >
       Hire
      </Button> : null}
    {/* {<Button
      color="primary"
      variant="contained"
      type="submit"
      //disabled={!isValid}
    >
      Report
    </Button>} */}
    </Toolbar>
  );
});

export default ConversationToolbar;
