import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardContent, Grid, Typography } from '@material-ui/core';

import { ReviewStars } from '../../../../../../components';

const useStyles = makeStyles(theme => ({
  root: {},
  stars: {
    display: 'flex',
    alignItems: 'center'
  },
  rating: {
    marginLeft: theme.spacing(2),
    fontWeight: theme.typography.fontWeightBold
  },
  total: {

  },
  overall: {
    paddingBottom: 0
  }
}));

const OverallReviews = props => {
  const { ratings, className, ...rest } = props;

  const classes = useStyles(1);
  let rating = 0;

  if (ratings.length > 0) {
    rating = ratings.reduce((prev, current) => prev + current, 0) / ratings.length;
  }

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <CardContent>
        <Grid
          alignItems="center"
          container
          spacing={3}
        >
          <Grid item className={classes.overall}>
            <Typography variant="h5">Overall Reviews</Typography>
          </Grid>
          <Grid
            className={classes.stars}
            item
          >
            <ReviewStars value={rating} />
            <Typography
              className={classes.rating}
              variant="h6"
            >
              {rating}
            </Typography>
          </Grid>
          <Grid item>
            <Typography
              className={classes.total}
              color="textSecondary"
              variant="body2"
            >
              {ratings.length} reviews in total
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default OverallReviews;
