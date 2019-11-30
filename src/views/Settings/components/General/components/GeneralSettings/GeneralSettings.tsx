import React, { useState } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { observer } from 'mobx-react';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Grid,
  Divider,
  TextField,
  colors
} from '@material-ui/core';
import { userUpdate } from '../../../../../../modules/dAppInt'

import SuccessSnackbar from '../SuccessSnackbar';

const useStyles = makeStyles(theme => ({
  root: {},
  saveButton: {
    color: '#ffffff',
    backgroundColor: colors.green[600],
    '&:hover': {
      backgroundColor: colors.green[900]
    }
  }
}));

const GeneralSettings = observer((props) => {
  const { profile, rootStore, className, ...rest } = props;

  const classes = useStyles(props);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [values, setValues] = useState({
    name: "",
    lastName: "profile.lastName",
    email: "profile.email",
    phone: "profile.phone",
    state: "profile.state",
    country: "profile.country",
    isPublic: true,
    canHire: false
  });

  const handleChange = event => {
    event.persist();

    setValues({
      ...values,
      [event.target.name]:
        event.target.type === 'checkbox'
          ? event.target.checked
          : event.target.value
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    let data = {
      name: rootStore.settings.getName,
      bio: rootStore.settings.getBio,
      location: rootStore.settings.getLocation,
      tags: [],
      address: rootStore.user.getUserAddress,
      createTime: rootStore.user.getUserCreateTime,
      status: rootStore.user.getUserStatus,
      socials: {
        telegram: rootStore.settings.getTelegram,
        twitter: rootStore.settings.getTwitter,
        github: rootStore.settings.getGithub
      },
      avatar: rootStore.settings.getAvatar

    }
    let tx = await userUpdate(rootStore.user.getUserAddress, data, rootStore.user.getWavesKeeper)
    if (tx) {
      setOpenSnackbar(true);
      rootStore.user.setUserName(data.name)
      rootStore.user.setUserBio(data.bio)
      rootStore.user.setUserLocation(data.location)
      rootStore.user.setUserTags(data.tags)
      rootStore.user.setUserSocials(data.socials)
      rootStore.user.setUserAvatar(data.avatar)


    } else {
      console.log('tx error')
    }
  };

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <form onSubmit={handleSubmit}>
        <CardHeader title="Profile" />
        <Divider />
        <CardContent>
          <Grid
            container
            spacing={4}
          >
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                helperText="Please specify the name"
                label="Name"
                name="name"
                onChange={event => rootStore.settings.setName(event.target.value)}
                required
                value={rootStore.settings.getName}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                helperText="Please enter the link"
                label="Avatar"
                name="avatar"
                onChange={event => rootStore.settings.setAvatar(event.target.value)}
                required
                value={rootStore.settings.getAvatar}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Location"
                name="location"
                onChange={event => rootStore.settings.setLocation(event.target.value)}
                required
                value={rootStore.settings.getLocation}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                required
                fullWidth
                helperText="Any information about you (70 characters)"
                label="Bio"
                name="bio"
                onChange={event => rootStore.settings.setBio(event.target.value)}
                type="text"
                value={rootStore.settings.getBio}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={4}
              xs={12}
            >
              <TextField
                fullWidth
                label="Telegram"
                name="telegram"
                onChange={event => rootStore.settings.setTelegram(event.target.value)}
                type="text"
                value={rootStore.settings.getTelegram}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={4}
              xs={12}
            >
              <TextField
                fullWidth
                label="Twitter"
                name="twitter"
                onChange={event => rootStore.settings.setTwitter(event.target.value)}
                type="text"
                value={rootStore.settings.getTwitter}
                variant="outlined"
              />
              </Grid>
              <Grid
                item
                md={4}
                xs={12}
              >
              <TextField
                fullWidth
                label="Github"
                name="github"
                onChange={event => rootStore.settings.setGithub(event.target.value)}
                type="text"
                value={rootStore.settings.getGithub}
                variant="outlined"
              />
            </Grid>
            {/*<Grid
              item
              md={6}
              xs={12}
            >
              <Typography variant="h6">Make Contact Info Public</Typography>
              <Typography variant="body2">
                Means that anyone viewing your profile will be able to see your
                contacts details
              </Typography>
              <Switch
                checked={values.isPublic}
                color="secondary"
                edge="start"
                name="isPublic"
                onChange={handleChange}
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <Typography variant="h6">Available to hire</Typography>
              <Typography variant="body2">
                Toggling this will let your teamates know that you are available
                for acquireing new projects
              </Typography>
              <Switch
                checked={values.canHire}
                color="secondary"
                edge="start"
                name="canHire"
                onChange={handleChange}
              />
            </Grid>*/}
          </Grid>
        </CardContent>
        <Divider />
        <CardActions>
          <Button
            className={classes.saveButton}
            type="submit"
            variant="contained"
          >
            Save Changes
          </Button>
        </CardActions>
      </form>
      <SuccessSnackbar
        onClose={handleSnackbarClose}
        open={openSnackbar}
      />
    </Card>
  );
});

export default GeneralSettings;
