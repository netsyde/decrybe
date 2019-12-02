import React from 'react';
import { Redirect } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Tabs, Tab, Divider, colors } from '@material-ui/core';
import { observer, inject } from 'mobx-react';
import { Page } from '../../components';
import { Header, Tasks, Reviews } from './components';
import Error401 from '../Error401'

const useStyles = makeStyles(theme => ({
  root: {},
  inner: {
    width: theme.breakpoints.values.lg,
    maxWidth: '100%',
    margin: '0 auto',
    padding: theme.spacing(3)
  },
  divider: {
    backgroundColor: colors.grey[300]
  },
  content: {
    marginTop: theme.spacing(3)
  }
}));

const ProfileContainer = observer((props) => {
  const classes = useStyles(props);
  const { id, tab } = props.match.params;

  const handleTabsChange = (event, value) => {
    props.history.push(value);
  };

  const tabs = [
    { value: 'tasks', label: 'Tasks' },
    { value: 'reviews', label: 'Reviews' }
  ];

  if (!tab) {
    return <Redirect to={`/profile/${id}/tasks`} />;
  }

  if (!tabs.find(t => t.value === tab)) {
    return <Redirect to="/404" />;
  }

  return (
    <Page
      className={classes.root}
      title="Profile"
    >
      <Header rootStore={props.rootStore} id={id}/>
      <div className={classes.inner}>
        <Tabs
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
          {tab === 'tasks' && <Tasks rootStore={props.rootStore} id={id}/>}
          {tab === 'reviews' && <Reviews rootStore={props.rootStore} id={id}/>}
        </div>
      </div>
    </Page>
  );
});

@inject("rootStore")
@observer
class Profile extends React.Component {
  constructor(props) {
    super(props)
  }


  render() {
    if (this.props.rootStore.user.isLogin) {
      return (
        <ProfileContainer match={this.props.match} history={this.props.history} rootStore={this.props.rootStore} />
      )
    } else {
      return (
        <Error401 />
      )
    }
  }
}

export default Profile;
