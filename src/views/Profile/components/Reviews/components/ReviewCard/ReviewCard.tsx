import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import PropTypes from 'prop-types';
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
    marginRight: theme.spacing(1)
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
            src={review.reviewer.avatar}
          >
            {review.reviewer.name}
          </Avatar>
        }
        className={classes.header}
        disableTypography
        subheader={
          <div className={classes.subheader}>
            <div className={classes.stars}>
              <ReviewStars value={review.rating} />
              <Typography
                className={classes.rating}
                variant="h6"
              >
                {review.rating}
              </Typography>
            </div>
            <Typography variant="body2">
              | Reviewd by{' '}
              <Link
                color="textPrimary"
                component={RouterLink}
                to="/profile/1/timeline"
                variant="h6"
              >
                {review.reviewer.name}
              </Link>{' '}
              | {moment(review.created_at).fromNow()}
            </Typography>
          </div>
        }
        title={
          <Link
            color="textPrimary"
            component={RouterLink}
            to="/projects/1/overview"
            variant="h5"
          >
            {review.project.title}
          </Link>
        }
      />
      <CardContent className={classes.content}>
        <div className={classes.message}>
          <Typography variant="subtitle2">{review.message}</Typography>
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
              <Typography variant="h5">
                {review.currency}
                {review.project.price}
              </Typography>
              <Typography variant="body2">Project price</Typography>
            </Grid>
            <Grid item>
              <Typography variant="h5">
                {review.currency}
                {review.pricePerHour}
              </Typography>
              <Typography variant="body2">Per project</Typography>
            </Grid>
            <Grid item>
              <Typography variant="h5">{review.hours}</Typography>
              <Typography variant="body2">Hours</Typography>
            </Grid>
          </Grid>
        </div>
      </CardContent>
    </Card>
  );
};

ReviewCard.propTypes = {
  className: PropTypes.string,
  review: PropTypes.object.isRequired
};

export default ReviewCard;
