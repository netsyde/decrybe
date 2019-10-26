import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { useMediaQuery } from '@material-ui/core';
import { Sidebar, Topbar} from './components';
import { Provider, observer, inject } from 'mobx-react';
import Signup  from './components/Signup'
import userStore from '../../store/UserStore';
import tasksStore from '../../store/TasksStore'

const stores = { userStore, tasksStore };

const useStyles = makeStyles(theme => ({
  root: {
    paddingTop: 56,
    height: '100%',
    [theme.breakpoints.up('sm')]: {
      paddingTop: 64
    }
  },
  shiftContent: {
    paddingLeft: 240
  },
  content: {
    height: '100%'
  }
}));

const RegisterModal = inject('userStore')(observer(({ userStore }) => {
  console.log(userStore.isReg)
  if (!userStore.isReg && userStore.isLogin) {
    return <Signup />
  } else {
    return null
  }
}))

const Main = props => {
  const { children } = props;

  const classes = useStyles(1);
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'), {
    defaultMatches: true
  });

  const [openSidebar, setOpenSidebar] = useState(false);

  const handleSidebarOpen = () => {
    setOpenSidebar(true);
  };

  const handleSidebarClose = () => {
    setOpenSidebar(false);
  };

  const shouldOpenSidebar = isDesktop ? true : openSidebar;

  return (
    <Provider { ...stores }>
      <div
        className={clsx({
          [classes.root]: true,
          [classes.shiftContent]: isDesktop
        })}
      >
        <Topbar onSidebarOpen={handleSidebarOpen} />
        <RegisterModal isReg={userStore.isUserReg} isLogin={userStore.isUserLogin} />
        <Sidebar
          onClose={handleSidebarClose}
          open={shouldOpenSidebar}
          variant={isDesktop ? 'persistent' : 'temporary'}
        />
        <main className={classes.content}>
          {children}
        </main>
      </div>
    </Provider>
  );
};

Main.propTypes = {
  children: PropTypes.node
};

export default Main;