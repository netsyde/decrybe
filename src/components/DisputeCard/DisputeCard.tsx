import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import moment from 'moment';
import { makeStyles } from '@material-ui/core/styles';
import {
  Avatar,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  IconButton,
  Link,
  Tooltip,
  Typography,
  colors
} from '@material-ui/core';
import ShareIcon from '@material-ui/icons/Share';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';

import getInitials from '../../utils/getInitials';
import { Label } from '../';

const useStyles = makeStyles(theme => ({
  root: {},
  header: {
    paddingBottom: 0
  },
  content: {
    padding: 0,
    '&:last-child': {
      paddingBottom: 0
    }
  },
  description: {
    padding: theme.spacing(2, 3, 1, 3)
  },
  tags: {
    padding: theme.spacing(0, 3, 1, 3),
    '& > * + *': {
      marginLeft: theme.spacing(1)
    }
  },
  learnMoreButton: {
    marginLeft: theme.spacing(2)
  },
  likedButton: {
    color: colors.red[600]
  },
  shareButton: {
    marginLeft: theme.spacing(1)
  },
  details: {
    padding: theme.spacing(1, 3)
  },
  priceContainer: {
    display: "flex",
    flexDirection: "row"
  },
  wavesLogo: {
    paddingLeft: 4,
    width: 22
  }
}));

function getRandomArbitary(min, max) {
  let rand = Math.random() * (max - min) + min;
  return rand.toFixed(0)
}

function wordCount(str) {
  var m = str.match(/[^\s]+/g)
  return m ? m.length : 0;
}

function validate (str, trim) {
  if (str) {
    if (wordCount(str) == 1) {
      return str.substr(0, 25) + "..."
    } else {
      if(str.length > trim) {
        return str.substr(0, trim) + "..."
      } else {
        return str
      }
    }
  }
  
}

function httpsFix(str) {
  str = str.replace('http://', 'https://')
  return str;

}
const DisputeCard = props => {
  const { project, rootStore, className, ...rest } = props;

  const classes = useStyles(1);

  const [liked, setLiked] = useState(false);
  const handleLike = () => {
    setLiked(true);
  };

  const handleUnlike = () => {
    setLiked(false);
  }; 

  const handleBrokenImage = e => (e.target.src = "/img/gag.png");

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <CardHeader
        avatar={
          <Avatar
            alt="Author"
            src={httpsFix(project.creator.avatar) || ""}
            imgProps={{ onError: handleBrokenImage }}
          >
            {project.creator ? getInitials(project.creator.name) : ""}
          </Avatar>
        }
        className={classes.header}
        disableTypography
        subheader={
          <Typography variant="body2">
            by{' '}
            <Link
              color="textPrimary"
              component={RouterLink}
              to={`/profile/${project.creator ? (project.creator.address ? project.creator.address: "") : "undefined"}`}
              variant="h6"
            >
              {project.creator ? (project.creator.name ? project.creator.name: "undefined") : "undefined"}
            </Link>{' '}
            | Created: {project.createdAt ? moment(project.createdAt).fromNow() : "undefined"}
          </Typography>
        }
        title={
          <Link
            color="textPrimary"
            component={RouterLink}
            to={`/tasks/${project.task.uuid ? project.task.uuid : "undefined"}`}
            variant="h5"
          >
            {project.title ? validate(project.title, 25) : "undefined"}
          </Link>
        }
      />
      <CardContent className={classes.content}>
        <div className={classes.description}>
          <Typography
            color="textSecondary"
            variant="subtitle2"
          >
            {project.brief ? validate(project.brief, 50) : "undefined"}
          </Typography>
        </div>
        <Divider />
        <div className={classes.details}>
          <Grid
            alignItems="center"
            container
            justify="space-between"
            spacing={3}
          >
            <Grid item>
              {liked ? (
                <Tooltip title="Unlike">
                  <IconButton
                    className={classes.likedButton}
                    onClick={handleUnlike}
                    size="small"
                  >
                    <FavoriteIcon />
                  </IconButton>
                </Tooltip>
              ) : (
                <Tooltip title="Like">
                  <IconButton
                    onClick={handleLike}
                    size="small"
                  >
                    <FavoriteBorderIcon />
                  </IconButton>
                </Tooltip>
              )}
              <Tooltip title="Share">
                <IconButton
                  className={classes.shareButton}
                  size="small"
                >
                  <ShareIcon />
                </IconButton>
              </Tooltip>
              <Button
                className={classes.learnMoreButton}
                component={RouterLink}
                size="small"
                to={`/disputes/${project.task.uuid ? project.task.uuid : "undefined"}/overview`}
              >
                Learn more
              </Button>
            </Grid>
          </Grid>
        </div>
      </CardContent>
    </Card>
  );
};

export default DisputeCard;
