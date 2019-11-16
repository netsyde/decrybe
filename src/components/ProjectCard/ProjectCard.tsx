import React, { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import PropTypes from 'prop-types';
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
let color = ["#1abc9c", "#2ecc71", "#3498db", "#9b59b6", "#34495e", "#16a085",
"#27ae60", "#2980b9", "#8e44ad", "#2c3e50", "#e67e22", "#e74c3c"]

const ProjectCard = props => {
  const { project, rootStore, className, ...rest } = props;

  const classes = useStyles(1);

  const [liked, setLiked] = useState(project.liked);
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
            src={project.author.avatar || "/img/gag.png"}
            imgProps={{ onError: handleBrokenImage }}
          >
            {project.author ? getInitials(project.author.name) : ""}
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
              to={`/profile/${project.author ? (project.author.address ? project.author.address: "") : "undefined"}`}
              variant="h6"
            >
              {project.author ? (project.author.name ? project.author.name: "undefined") : "undefined"}
            </Link>{' '}
            | Updated: {project.updatedAt ? moment(project.updatedAt).fromNow() : "undefined"}
          </Typography>
        }
        title={
          <Link
            color="textPrimary"
            component={RouterLink}
            to={`/tasks/${project.uuid ? project.uuid : "undefined"}`}
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
            {project.title ? validate(project.title, 150) : "undefined"}
          </Typography>
        </div>
        <div className={classes.tags}>
          {project.tags ? (project.tags.map(tag => (
            <Label
              color={color[getRandomArbitary(0, color.length - 1)]}
              key={tag}
            >
              {tag ? (tag.length > 10 ? (project.brief.substr(0, 10)) : tag) : "undefined"}
            </Label>
          ))) : ""}
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
              <Typography variant="h5">${project.price ? ((project.price.toString()).length > 5 ? (project.price.toString()).substr(0, 5) : project.price) : "undefined"}</Typography>
              <Typography variant="body2">Per Task</Typography>
            </Grid>
            <Grid item>
              <Typography variant="h5">{project.status ? project.status : "undefined"}</Typography>
              <Typography variant="body2">Status</Typography>
            </Grid>
            <Grid item>
              <Typography variant="h5">{project.category ? project.category : "undefined"}</Typography>
              <Typography variant="body2">Category</Typography>
            </Grid>
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
                to={`/tasks/${project.uuid ? project.uuid : "undefined"}/overview`}
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

export default ProjectCard;
