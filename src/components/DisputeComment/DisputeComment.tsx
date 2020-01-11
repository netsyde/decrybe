import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import moment from 'moment';
import { makeStyles } from '@material-ui/core/styles';
import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  Link,
  Typography,
  colors
} from '@material-ui/core';

import getInitials from '../../utils/getInitials';

const useStyles = makeStyles(theme => ({
  root: {
    boxShadow: "none",
    backgroundColor: "inherit"
  },
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
const DisputeComment = props => {
  const { comment, rootStore, className, ...rest } = props;
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
            src={httpsFix(comment.user.avatar) || ""}
            imgProps={{ onError: handleBrokenImage }}
          >
            {comment.user ? getInitials(comment.user.name) : ""}
          </Avatar>
        }
        className={classes.header}
        disableTypography
        subheader={
          <div>
          <Typography variant="body2">
            Side: {comment.side ? comment.side : "undefined"} ({comment.createdAt ? moment(comment.createdAt).fromNow() : "undefined"})
          </Typography>
          </div>
        }
        title={
          <Link
            color="textPrimary"
            component={RouterLink}
            to={`/profile/${comment.user ? comment.user.address : "undefined"}`}
            variant="h5"
          >
            {comment.user ? (comment.user.name ? comment.user.name: "undefined") : "undefined"}
          </Link>
        }
      />
      <CardContent className={classes.content}>
        <div className={classes.description}>
          <Typography
            color="textSecondary"
            variant="subtitle2"
          >
            {comment.message ? validate(comment.message, 200) : "undefined"}
          </Typography>
        </div>
      </CardContent>
    </Card>
  );
};

export default DisputeComment;
