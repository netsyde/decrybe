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
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator';

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
  const [isValid, setValid] = React.useState(false);
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

  let formRef = React.createRef();

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
      avatar: rootStore.settings.getAvatar,
      cover: rootStore.settings.getCover,
      publicKey: rootStore.user.getUserPublicKey

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
      rootStore.user.updateStorage()


    } else {
      console.log('tx error')
    }
  
  };

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  let validatorListener = async () => {
    const valid = await formRef.current.isFormValid();
    setValid(valid)
  }

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <ValidatorForm onSubmit={handleSubmit} onError={errors => console.log(errors)}
        ref={formRef}
      >
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
              <TextValidator
                fullWidth
                helperText="Please specify the name"
                label="Name"
                name="name"
                onChange={event => rootStore.settings.setName(event.target.value)}
                value={rootStore.settings.getName || ""}
                variant="outlined"
                validators={['required', 'minStringLength:3', 'maxStringLength:15', 'trim']}
                errorMessages={['This field is required', 'Minimum 3 characters', 'Maximum 15 characters', 'Please enter words']}
                validatorListener={validatorListener}
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextValidator
                fullWidth
                helperText="Please enter only https link"
                label="Avatar"
                name="avatar"
                onChange={event => rootStore.settings.setAvatar(event.target.value)}
                required
                value={rootStore.settings.getAvatar || ""}
                variant="outlined"
                validators={['matchRegexp:^https://']}
                errorMessages={['Use only https link']}
                validatorListener={validatorListener}
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextValidator
                fullWidth
                label="Location"
                name="location"
                onChange={event => rootStore.settings.setLocation(event.target.value)}
                value={rootStore.settings.getLocation || ""}
                variant="outlined"
                validators={['minStringLength:2', 'maxStringLength:15', 'trim']}
                errorMessages={['Minimum 2 characters', 'Maximum 15 characters', 'Please enter words']}
                validatorListener={validatorListener}
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextValidator
                fullWidth
                helperText="Any information about you (70 characters)"
                label="Bio"
                name="bio"
                onChange={event => rootStore.settings.setBio(event.target.value)}
                type="text"
                value={rootStore.settings.getBio || ""}
                variant="outlined"
                validators={['required', 'minStringLength:5', 'maxStringLength:70', 'trim']}
                errorMessages={['This field is required', 'Minimum 5 characters', 'Maximum 70 characters', 'Please enter words']}
                validatorListener={validatorListener}
              />
            </Grid>
            <Grid
              item
              md={4}
              xs={12}
            >
              <TextValidator
                fullWidth
                label="Telegram"
                name="telegram"
                onChange={event => rootStore.settings.setTelegram(event.target.value)}
                type="text"
                value={rootStore.settings.getTelegram || ""}
                variant="outlined"
                helperText="Please enter the link"
                validators={['matchRegexp:^https://']}
                errorMessages={['Use only https link']}
                validatorListener={validatorListener}
              />
            </Grid>
            <Grid
              item
              md={4}
              xs={12}
            >
              <TextValidator
                fullWidth
                label="Twitter"
                name="twitter"
                onChange={event => rootStore.settings.setTwitter(event.target.value)}
                type="text"
                value={rootStore.settings.getTwitter || ""}
                variant="outlined"
                helperText="Please enter the link"
                validators={['matchRegexp:^https://']}
                errorMessages={['Use only https link']}
                validatorListener={validatorListener}
              />
            </Grid>
            <Grid
              item
              md={4}
              xs={12}
            >
              <TextValidator
                fullWidth
                label="Github"
                name="github"
                onChange={event => rootStore.settings.setGithub(event.target.value)}
                type="text"
                value={rootStore.settings.getGithub || ""}
                variant="outlined"
                helperText="Please enter the link"
                validators={['matchRegexp:^https://']}
                errorMessages={['Use only https link']}
                validatorListener={validatorListener}
              />
            </Grid>
            <Grid
              item
              md={12}
              xs={12}
            >
              <TextValidator
                fullWidth
                helperText="Please enter the https link"
                label="Profile cover"
                name="profile_cover"
                onChange={event => rootStore.settings.setCover(event.target.value)}
                value={rootStore.settings.getCover || ""}
                variant="outlined"
                validators={['matchRegexp:^https://']}
                errorMessages={['Use only https link']}
                validatorListener={validatorListener}
              />
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <CardActions>
          <Button
            className={classes.saveButton}
            type="submit"
            variant="contained"
            disabled={!isValid}
          >
            Save Changes
          </Button>
        </CardActions>
      </ValidatorForm>
      <SuccessSnackbar
        onClose={handleSnackbarClose}
        open={openSnackbar}
      />
    </Card>
  );
});

export default GeneralSettings;
