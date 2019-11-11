import React from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Tabs, Tab, Divider, colors } from '@material-ui/core';

import { Page } from '../../components';
import {
  Header,
  General,
  Notifications,
} from './components';

const useStyles = makeStyles(theme => ({
  root: {
    width: theme.breakpoints.values.lg,
    maxWidth: '100%',
    margin: '0 auto',
    padding: theme.spacing(3)
  },
  tabs: {
    marginTop: theme.spacing(3)
  },
  divider: {
    backgroundColor: colors.grey[300]
  },
  content: {
    marginTop: theme.spacing(3)
  }
}));

const Settings = props => {
  const { match, history } = props;
  const classes = useStyles(props);
  const { tab } = match.params;

  const handleTabsChange = (event, value) => {
    history.push(value);
  };

  const tabs = [
    { value: 'general', label: 'General' },
    { value: 'notifications', label: 'Notifications' },
  ];

  if (!tab) {
    return <Redirect to="/settings/general" />;
  }

  if (!tabs.find(t => t.value === tab)) {
    return <Redirect to="/404" />;
  }

  return (
    <Page
      className={classes.root}
      title="Settings"
    >
      <Header />
      <Tabs
        className={classes.tabs}
        onChange={handleTabsChange}
        scrollButtons="auto"
        value={tab}
        variant="scrollable"
      >
        {tabs.map(tab => (
          <Tab
            key={tab.value}
            label={tab.label}
            value={tab.value}
          />
        ))}
      </Tabs>
      <Divider className={classes.divider} />
      <div className={classes.content}>
        {tab === 'general' && <General />}
        {tab === 'notifications' && <Notifications />}
      </div>
    </Page>
  );
};
export default Settings;
