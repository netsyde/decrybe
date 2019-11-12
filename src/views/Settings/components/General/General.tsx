import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';

import { ProfileDetails, GeneralSettings } from './components';
import { observer, inject } from 'mobx-react';
const useStyles = makeStyles(() => ({
  root: {}
}));

const General = observer((props) => {
  const { className, rootStore, ...rest } = props;

  const classes = useStyles(props);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    let mounted = true;

   let data = {
      avatar: rootStore.user.getUserAvatar,
      canHire: false,
      country: rootStore.user.getUserLocation,
      email: 'shen.zhi@devias.io',
      name: rootStore.user.getUserName,
      isPublic: true,
      lastName: 'Zhi',
      phone: '+40 777666555',
      state: 'Alabama',
      timezone: '4:32PM (GMT-4)'
    }

    setProfile(data)
  }, []);

  if (!profile) {
    return null;
  }

  return (
    <Grid
      {...rest}
      className={clsx(classes.root, className)}
      container
      spacing={3}
    >
      <Grid
        item
        lg={4}
        md={6}
        xl={3}
        xs={12}
      >
        <ProfileDetails profile={rootStore.user.getUserFullData} />
      </Grid>
      <Grid
        item
        lg={8}
        md={6}
        xl={9}
        xs={12}
      >
        <GeneralSettings profile={rootStore.user.getUserFullData} />
      </Grid>
    </Grid>
  );
});

export default General;
