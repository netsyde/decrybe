import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import moment from 'moment';
import { makeStyles } from '@material-ui/core/styles';
import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  Link,
  Typography
} from '@material-ui/core';

import getInitials from '../../../../../../utils/getInitials'

import { ReviewStars } from '../../../../../../components';

const useStyles = makeStyles(theme => ({
  root: {},
  header: {
    paddingBottom: 0
  },
  subheader: {
    flexWrap: 'wrap',
    display: 'flex',
    alignItems: 'center'
  },
  stars: {
    display: 'flex',
    alignItems: 'center',
  },
  rating: {
    marginLeft: theme.spacing(1),
    fontWeight: theme.typography.fontWeightBold
  },
  content: {
    padding: 0,
    '&:last-child': {
      paddingBottom: 0
    }
  },
  message: {
    padding: theme.spacing(2, 3)
  },
  details: {
    padding: theme.spacing(1, 3)
  },
  avatar: {
    
  }
}));

const ReviewCard = props => {
  const { review, className, ...rest } = props;

  const classes = useStyles(1);
  const handleBrokenImage = e => (e.target.src = "/img/gag.png");
  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <CardHeader
        avatar={
          <Avatar
            alt="Reviewer"
            className={classes.avatar}
            src={review.sender.avatar || ""}
            imgProps={{ onError: handleBrokenImage }}
          >
            {review.sender ? getInitials(review.sender.name) : "undefined"}
          </Avatar>
        }
        className={classes.header}
        disableTypography
        subheader={
          <div className={classes.subheader}>
            <div className={classes.stars}>
              <ReviewStars value={review.stars} />
              <Typography
                className={classes.rating}
                variant="h6"
              >
                {review.rating}
              </Typography>
            </div>
            <Typography variant="body2">
              {moment(review.createdAt).fromNow()}
            </Typography>
          </div>
        }
        title={
          <Link
            color="textPrimary"
            component={RouterLink}
            to={`/profile/${review.sender.address}`}
            variant="h5"
          >
            {review.sender.name}
          </Link>
        }
      />
      <CardContent className={classes.content}>
        <div className={classes.message}>
          <Typography variant="subtitle2">{review.message}</Typography>
        </div>
        <Divider />
      </CardContent>
    </Card>
  );
};

export default ReviewCard;
