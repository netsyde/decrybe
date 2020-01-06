import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Grid, Button } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import UpdateIcon from '@material-ui/icons/Update';
import { observer } from 'mobx-react';


const useStyles = makeStyles(theme => ({
  root: {},
  icon: {
    marginRight: theme.spacing(1)
  },
  updateButton: {
    marginRight: theme.spacing(1)
  }
}));

const Header = observer((props) => {
  const { className, rootStore, ...rest } = props;

  const classes = useStyles(1);

  const handleUpdate = async () => {
    await rootStore.user.updateStorage()
    
  };
  
  return (
    <div
      {...rest}
      className={clsx(classes.root, className)}
    >
      <Grid
        alignItems="flex-end"
        container
        justify="space-between"
        spacing={3}
      >
        <Grid item>
          <Typography
            component="h2"
            gutterBottom
            variant="overline"
          >
            Browse disputes
          </Typography>
          <Typography
            component="h1"
            variant="h3"
          >
            See the latest disputes
          </Typography>
        </Grid>
        <Grid item>
          <Button
            color="primary"
            component={RouterLink}
            onClick={handleUpdate}
            variant="contained"
            to="#"
            className={classes.updateButton}
          >
            <UpdateIcon className={classes.icon} />
            Update
          </Button>
        </Grid>
      </Grid>
    </div>
  );
});

export default Header;
