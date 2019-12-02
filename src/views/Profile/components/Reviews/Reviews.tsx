import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import { OverallReviews, ReviewCard } from './components';

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

const Reviews = props => {
  const { className, rootStore, id, ...rest } = props;

  const classes = useStyles(1);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    let reviews2 = [
      {
        id: 1,
        rating: 4,
        message:
          'Shen was really great during the all time session we created the project',
        reviewer: {
          name: 'Ekaterina Tankova',
          avatar: 'https://img1.goodfon.ru/original/2726x1823/c/57/lana-del-rey-lana-del-rey-1013.jpg'
        },
        project: {
          title: 'Mella Full Screen Slider',
          price: '5,240.00'
        },
        pricePerHour: '43.00',
        hours: 31,
        currency: '$',
        created_at: 1
      },
      {
        id: 2,
        rating: 5,
        reviewer: {
          name: 'Cao Yu',
          avatar: 'https://www.koeitecmoamerica.com/dw9/images/characters/gi/junyu.png'
        },
        project: {
          title: 'Dashboard Design',
          price: '3,680.00'
        },
        pricePerHour: '38.00',
        hours: 76,
        currency: '$',
        message:
          'Being the savage\'s bowsman, that is, the person who pulled the bow-oar in his boat (the second one from forward), it was my cheerful duty to attend upon him while taking that hard-scrabble scramble upon the dead whale\'s back. You have seen Italian organ-boys holding a dancing-ape by a long cord. Just so, from the ship\'s steep side, did I hold Queequeg down there in the sea, by what is technically called in the fishery a monkey-rope, attached to a strong strip of canvas belted round his waist.',
        created_at: 2
      }
    ];
    setReviews(reviews)
    
  }, []);
  if (reviews.length > 0) {
    return (
      
      <div
        {...rest}
        className={clsx(className)}
      >
        <OverallReviews ratings={reviews.map(review => review.rating)} />
        {reviews.map(review => (
          <ReviewCard
            className={classes.review}
            key={review.id}
            review={review}
          />
        ))}
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
};

export default Reviews;
