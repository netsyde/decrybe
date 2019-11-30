import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { Card, Typography, Grid, colors } from '@material-ui/core';
import { observer } from 'mobx-react';
import { Label } from '../../../../components';

const useStyles = makeStyles(theme => ({
  root: {},
  content: {
    padding: 0
  },
  item: {
    padding: theme.spacing(3),
    textAlign: 'center',
    [theme.breakpoints.up('md')]: {
      '&:not(:last-of-type)': {
        borderRight: `1px solid ${theme.palette.divider}`
      }
    },
    [theme.breakpoints.down('sm')]: {
      '&:not(:last-of-type)': {
        borderBottom: `1px solid ${theme.palette.divider}`
      }
    }
  },
  titleWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  label: {
    marginLeft: theme.spacing(1)
  },
  overline: {
    marginTop: theme.spacing(1)
  }
}));

const Statistics = observer((props) => {
  const { className, rootStore, ...rest } = props;

  const classes = useStyles(1);
  const [statistics, setStatistics] = useState(null);

  useEffect(() => {
      let statistics = {
        payout: '4,250',
        projects: '12,500',
        visitors: '230',
        watching: '5'
      }
      setStatistics(statistics);
      
  }, []);

  if (!statistics) {
    return null;
  }

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <Grid
        alignItems="center"
        container
        justify="space-between"
      >
        <Grid
          className={classes.item}
          item
          md={4}
          sm={6}
          xs={12}
        >
          <Typography variant="h2">{rootStore.user.getUserBalance/10e7} Waves</Typography>
          <Typography
            className={classes.overline}
            variant="overline"
          >
           Your balance
          </Typography>
        </Grid>
        <Grid
          className={classes.item}
          item
          md={4}
          sm={6}
          xs={12}
        >
          <Typography variant="h2">{rootStore.tasks.getLength}</Typography>
          <Typography
            className={classes.overline}
            variant="overline"
          >
            Total tasks
          </Typography>
        </Grid>
        <Grid
          className={classes.item}
          item
          md={4}
          sm={12}
          xs={12}
        >
          <Typography variant="h2">{rootStore.users.getCount}</Typography>
          <Typography
            className={classes.overline}
            variant="overline"
          >
            Total users
          </Typography>
        </Grid>
      </Grid>
    </Card>
  );
});

export default Statistics;
