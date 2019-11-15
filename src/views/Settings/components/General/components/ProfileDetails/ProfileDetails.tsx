import React from 'react';
import PropTypes from 'prop-types';
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
import { observer, inject } from 'mobx-react';

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
    width: 100
  },
  removeBotton: {
    width: '100%'
  }
}));

const ProfileDetails = observer((props) => {
  const { profile, className, rootStore, ...rest } = props;

  const classes = useStyles(props);

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <CardContent className={classes.content}>
        <Avatar
          className={classes.avatar}
          src={rootStore.settings.getAvatar ? rootStore.settings.getAvatar : ""}
        />
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
        >
          Remove picture
        </Button>
      </CardActions>
    </Card>
  );
});

export default ProfileDetails;
