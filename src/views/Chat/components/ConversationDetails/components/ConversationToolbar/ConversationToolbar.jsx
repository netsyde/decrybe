import React, { useState, forwardRef } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import {
  IconButton,
  Toolbar,
  Tooltip,
  Typography,
  Button,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
} from '@material-ui/core';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import { observer } from 'mobx-react';
import * as dAppInt from '../../../../../../modules/dAppInt'
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import MoreIcon from '@material-ui/icons/MoreVert';
import ReportIcon from '@material-ui/icons/Report';
import AddAlarmIcon from '@material-ui/icons/AddAlarm';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import GavelIcon from '@material-ui/icons/Gavel';
import AssignmentIcon from '@material-ui/icons/Assignment';
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

const CustomRouterLink = forwardRef((props, ref) => (
  <div
    //ref={ref}
  >
      <RouterLink {...props} />
  </div>
));

const ConversationToolbar = observer((props) => {
  const { conversation, className, rootStore, ...rest } = props;

  const classes = useStyles(props);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [openMenu, setOpenMenu] = useState(false);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
    setOpenMenu(true);
  };

  const handleMenuClose = (event) => {
    setAnchorEl(null);
    setOpenMenu(false);
  };

  const handleMenuItemClick = async (event, index) => {
    switch (index) {
      case 0:
        console.log('completition')
        let completition = await dAppInt.reportCompleteTask(conversation.task.uuid, rootStore.user.getWavesKeeper)
        if (completition) {
          console.log("Succesfully completition")
        }
        break;
      case 1:
        console.log("accept")
        let accept = await dAppInt.acceptWork(conversation.task.uuid, true, rootStore.user.getWavesKeeper)
        if (accept) {
          console.log("Succesfully accept")
        }
        break;
      case 2:
        console.log("reject")
        let reject = await dAppInt.acceptWork(conversation.task.uuid, false, rootStore.user.getWavesKeeper)
        if (reject) {
          console.log("Succesfully accept")
        }
        break
      case 3:
        console.log("move deadline")
        break
      case 4:
        console.log("dispute")
        rootStore.disputeCreate.setTask(conversation.task.uuid)
        break
      case 5:
        console.log("task")
        break
      case 6:
        let report = await dAppInt.reportUser(conversation.user.address, rootStore.user.getWavesKeeper)
        console.log(report)
        break

    }
    setOpenMenu(false);
    //console.log(index)
  };

  const handleClick = async (event) => {
    event.preventDefault();
    //let data = await nodeInt.getClearTaskData(rootStore.user.getStorage, conversation.task.uuid);
    let tx = await dAppInt.hireFreelancer(conversation.task.uuid, conversation.user.address, rootStore.user.getWavesKeeper)
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
      <Tooltip title="More options">
        <IconButton
          onClick={handleMenuOpen}
          //ref={moreRef}
        >
          <MoreIcon />
        </IconButton>
      </Tooltip>
      <Menu
        anchorEl={anchorEl}
        disableScrollLock={true}
        keepMounted
        onClose={handleMenuClose}
        open={openMenu}
      >

        {rootStore.user.getUserAddress == conversation.task.freelancer && conversation.task.status == "In progress" ? <MenuItem
          onClick={event => handleMenuItemClick(event, 0)}
          //selected={0 === selectedIndex}
        >
          <ListItemIcon>
            <AssignmentTurnedInIcon />
          </ListItemIcon>
          <ListItemText primary="Report completion of the task" />
        </MenuItem> : null}
       { rootStore.user.getUserAddress == conversation.task.author.address && conversation.task.freelancer == conversation.user.address && conversation.task.status == "Pending" ? <MenuItem
          onClick={event => handleMenuItemClick(event, 1)}
          //selected={1 === selectedIndex}
        >
          <ListItemIcon>
            <ThumbUpIcon />
          </ListItemIcon>
          <ListItemText primary="Accept work" />
        </MenuItem> : null}
        { rootStore.user.getUserAddress == conversation.task.author.address && conversation.task.freelancer == conversation.user.address && conversation.task.status == "Pending" ? <MenuItem
          onClick={event => handleMenuItemClick(event, 2)}
          //selected={1 === selectedIndex}
        >
          <ListItemIcon>
            <ThumbDownIcon />
          </ListItemIcon>
          <ListItemText primary="Reject work" />
        </MenuItem> : null}
        {rootStore.user.getUserAddress == conversation.task.author.address && conversation.task.freelancer == conversation.user.address && conversation.task.status != "Completed" ? <MenuItem
          onClick={event => handleMenuItemClick(event, 3)}
          //selected={2 === selectedIndex}
        >
          <ListItemIcon>
            <AddAlarmIcon />
          </ListItemIcon>
          <ListItemText primary="Move the deadline" />
        </MenuItem> : null}
        {(((rootStore.user.getUserAddress == conversation.task.author.address && conversation.task.freelancer == conversation.user.address) || (rootStore.user.getUserAddress == conversation.task.freelancer)) && conversation.task.status != "Completed") ? 
        <MenuItem
          onClick={event => handleMenuItemClick(event, 4)}
          component={CustomRouterLink}
          to={`/disputes/create`}
        >
        >
          <ListItemIcon>
            <GavelIcon />
          </ListItemIcon>
          <ListItemText primary="Open dispute" />
        </MenuItem> : null}
        <MenuItem
          component={CustomRouterLink}
          to={`/tasks/${conversation.task.uuid}`}
        >
          <ListItemIcon>
            <AssignmentIcon />
          </ListItemIcon>
          <ListItemText primary="Open task" />
        </MenuItem>
        <MenuItem
          onClick={event => handleMenuItemClick(event, 6)}
        >
          <ListItemIcon>
            <ReportIcon />
          </ListItemIcon>
          <ListItemText primary="Report user" />
        </MenuItem>
      </Menu>
    </Toolbar>
  );
});

export default ConversationToolbar;
