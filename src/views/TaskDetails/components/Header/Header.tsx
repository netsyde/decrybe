import React, { useState } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Grid, Button, colors } from '@material-ui/core';
import ShareIcon from '@material-ui/icons/Share';
import { observer } from 'mobx-react';
import { Label } from '../../../../components';
import { Application } from './components';

const useStyles = makeStyles(theme => ({
  root: {},
  label: {
    marginTop: theme.spacing(1)
  },
  shareButton: {
    marginRight: theme.spacing(2)
  },
  shareIcon: {
    marginRight: theme.spacing(1)
  },
  applyButton: {
    color: "#FFFFFF",
    backgroundColor: colors.green[600],
    '&:hover': {
      backgroundColor: colors.green[900]
    }
  }
}));

const Header = observer((props) => {
  const { project, rootStore, className, ...rest } = props;

  const classes = useStyles(1);

  const [openApplication, setOpenApplication] = useState(false);

  const handleApplicationOpen = () => {
    setOpenApplication(true);
  };

  const handleApplicationClose = () => {
    setOpenApplication(false);
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
            Browse projects
          </Typography>
          <Typography
            component="h1"
            gutterBottom
            variant="h3"
          >
            {project.title ? project.title : "undefined"}
          </Typography>
          <Label
            className={classes.label}
            color={colors.green[600]}
            variant="outlined"
          >
            {project.status ? project.status : "undefined"}
          </Label>
        </Grid>
        <Grid item>
          <Button
            className={classes.shareButton}
            variant="contained"
          >
            <ShareIcon className={classes.shareIcon} />
            Share
          </Button>

          {rootStore.user.getUserAddress != project.author.address ?
            <Button
              className={classes.applyButton}
              onClick={handleApplicationOpen}
              variant="contained"
            >
              Apply for a role
            </Button>
          : null}
        </Grid>
      </Grid>
      <Application
        author={project.author ? project.author : "Undefined"}
        onApply={handleApplicationClose}
        onClose={handleApplicationClose}
        open={openApplication}
      />
    </div>
  );
});

export default Header;
