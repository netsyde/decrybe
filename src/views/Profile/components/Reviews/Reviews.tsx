import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import { OverallReviews, ReviewCard } from './components';
import * as nodeInt from '../../../../modules/nodeInt'
import { observer, inject } from 'mobx-react';
const useStyles = makeStyles(theme => ({
  review: {
    marginTop: theme.spacing(2)
  },
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  inner: {
    textAlign: 'center'
  },
  image: {
    maxWidth: 400
  },
  title: {
    margin: theme.spacing(4, 0, 1, 0)
  }
}));

const Reviews = observer((props) => {
  const { className, rootStore, id, ...rest } = props;

  const classes = useStyles(1);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    let mounted = true;
    const fetchReviews = async () => {
      let reviewsData = await nodeInt.getUserReviewsData(rootStore.user.getStorage, id)
      console.log(reviewsData)
      if (reviewsData) {
        setReviews(reviewsData)
      }
    };
    
    if (props.rootStore.user.isLogin) {
      if (mounted) {
        fetchReviews();
      }
    }

    return () => {
      mounted = false;
    };
    
  }, [rootStore.user.getStorage]);
  if (reviews.length > 0) {
    return (
      
      <div
        {...rest}
        className={clsx(className)}
      >
        <OverallReviews ratings={reviews ? reviews.map(review => review.stars) : [0]} />
        {reviews ? reviews.map(review => (
          <ReviewCard
            className={classes.review}
            key={review.key}
            review={review}
          />
        )) : null}
      </div>
    );
  } else {
    return (
      <div
      {...rest}
      className={clsx(classes.root, className)}
    >
      <div className={classes.inner}>
        <img
          alt="Еhere's nothing here yet"
          className={classes.image}
          src="/img/undraw_work_chat_erdt.svg"
        />
        <Typography
          className={classes.title}
          variant="h4"
        >
          There's nothing here yet
        </Typography>
        <Typography variant="subtitle1">
          The user has no feedback
        </Typography>
      </div>
    </div>
    )
  }
});

export default Reviews;
