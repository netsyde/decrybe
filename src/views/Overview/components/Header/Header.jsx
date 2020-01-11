import React, { forwardRef } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Grid, Button, Hidden } from '@material-ui/core';
import BarChartIcon from '@material-ui/icons/BarChart';
import { observer } from 'mobx-react';
import { Link as RouterLink } from 'react-router-dom';
const useStyles = makeStyles(theme => ({
  root: {},
  summaryButton: {
    backgroundColor: '#ffffff'
  },
  barChartIcon: {
    marginRight: theme.spacing(1)
  },
  image: {
    width: '100%',
    maxHeight: 400
  }
}));

const CustomRouterLink = forwardRef((props, ref) => (
  <div
    //ref={ref}
  >
      <RouterLink {...props} />
  </div>
));

const Header = observer((props) => {
  const { className, rootStore, ...rest } = props;

  const classes = useStyles(props);
  const handleClick = () => {
    
    rootStore.snackbar.setOpen()
	};
  return (
    <div
      {...rest}
      className={clsx(classes.root, className)}
    >
      <Grid
        alignItems="center"
        container
        justify="space-between"
        spacing={3}
      >
        <Grid
          item
          md={6}
          xs={12}
        >
          <Typography
            component="h2"
            gutterBottom
            variant="overline"
          >
            Home
          </Typography>
          <Typography
            component="h1"
            gutterBottom
            variant="h3"
          >
            Hola, {rootStore.user.getUserName}
          </Typography>
          <Typography
            gutterBottom
            variant="subtitle1"
          >
            Here’s what’s happening with Decrybe
          </Typography>
          <Button
            className={classes.summaryButton}
            edge="start"
            variant="contained"
            component={CustomRouterLink}
            to="/tasks"
            onClick={handleClick}
          >
            <BarChartIcon className={classes.barChartIcon} />
            View tasks
          </Button>
        </Grid>
        <Hidden smDown>
          <Grid
            item
            md={6}
          >
            <img
              alt="Cover"
              className={classes.image}
              src="/img/undraw_cookie_love_ulvn.svg"
            />
          </Grid>
        </Hidden>
      </Grid>
    </div>
  );
});

export default Header;
