import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import {
  Card,
  CardContent,
  CardActions,
  Avatar,
  Typography,
  Button
} from '@material-ui/core';
import { observer } from 'mobx-react';
import getInitials from '../../../../../../utils/getInitials';
const useStyles = makeStyles(theme => ({
  root: {},
  content: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    textAlgin: 'center'
  },
  name: {
    marginTop: theme.spacing(1)
  },
  avatar: {
    height: 100,
    width: 100,
    fontSize: 40
  },
  removeBotton: {
    width: '100%'
  }
}));

function httpsFix(str) {
  str = str.replace('http://', 'https://')
  return str;
}

const ProfileDetails = observer((props) => {
  const { profile, className, rootStore, ...rest } = props;

  const classes = useStyles(props);
  const handleBrokenImage = e => (e.target.src = "/img/gag.png");

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <CardContent className={classes.content}>
        <Avatar
          className={classes.avatar}
          //style={{backgroundColor: rootStore.user.getUserAvatarColor}}
          src={rootStore.settings.getAvatar ? httpsFix(rootStore.settings.getAvatar) : ""}
          imgProps={{ onError: handleBrokenImage }}
        >
          {rootStore.user.getUserName ? getInitials(rootStore.user.getUserName) : "U"}
        </Avatar>
        <Typography
          className={classes.name}
          gutterBottom
          variant="h3"
        >
          {rootStore.settings.getName ? rootStore.settings.getName : ""}
        </Typography>
        <Typography
          color="textSecondary"
          variant="body1"
        >
          {rootStore.settings.getBio ? rootStore.settings.getBio : ""}
        </Typography>
        <Typography
          color="textSecondary"
          variant="body2"
        >
          {profile.timezone ? profile.timezone : ""}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          className={classes.removeBotton}
          variant="text"
          onClick={() => rootStore.settings.setAvatar('')}
        >
          Remove picture
        </Button>
      </CardActions>
    </Card>
  );
});

export default ProfileDetails;
