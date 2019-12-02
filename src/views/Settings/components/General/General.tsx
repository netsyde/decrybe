import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
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
        <ProfileDetails profile={rootStore.user.getUserFullData} rootStore={rootStore}/>
      </Grid>
      <Grid
        item
        lg={8}
        md={6}
        xl={9}
        xs={12}
      >
        <GeneralSettings profile={rootStore.settings.getData} rootStore={rootStore}/>
      </Grid>
    </Grid>
  );
});

export default General;
