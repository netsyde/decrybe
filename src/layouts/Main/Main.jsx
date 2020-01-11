import React, { useState, Suspense } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { NavBar, Topbar } from './components';
import { observer } from 'mobx-react';
import rootStore from '../../store/RootStore'
import { LinearProgress } from '@material-ui/core';
const stores = { rootStore };
import { renderRoutes } from 'react-router-config';
import { Snackbar } from '../../components'
import { Redirect } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core/styles';
import light from '../../theme/light';
import dark from '../../theme/dark'
import '../../assets/light/scss/index.scss';

const useStyles = makeStyles(theme => ({
  root: props => ({
    height: '100%',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
    backgroundColor: props.theme == false ? "#F4F6F8" : "#212121"
  }),
  topBar: {
    zIndex: 2,
    position: 'relative'
  },
  container: {
    display: 'flex',
    flex: '1 1 auto',
    overflow: 'hidden'
  },
  navBar: {
    zIndex: 3,
    width: 256,
    minWidth: 256,
    flex: '0 0 auto'
  },
  content: {
    overflowY: 'auto',
    flex: '1 1 auto'
  },
  
}));

const Main = observer((props) => {
  const { route } = props; // children
  let theme = rootStore.user.getTheme;
  const classes = useStyles({theme});

  const [openNavBarMobile, setOpenNavBarMobile] = useState(false);

  const handleNavBarMobileOpen = () => {
    setOpenNavBarMobile(true);
  };

  const handleNavBarMobileClose = () => {
    setOpenNavBarMobile(false);
  };

  if (rootStore.user.getShowRegister) {
    return <Redirect to={`/register`} />;
  }
  
  return (
    <ThemeProvider theme={rootStore.user.getTheme == false ? light : dark}>
      <div className={classes.root}>
      <Topbar
        className={classes.topBar}
        onOpenNavBarMobile={handleNavBarMobileOpen}
      />
      <div className={classes.container}>
        <NavBar
          className={classes.navBar}
          onMobileClose={handleNavBarMobileClose}
          openMobile={openNavBarMobile}
        />
        <main className={classes.content}>
          <Suspense fallback={<LinearProgress />}>
            {renderRoutes(route.routes)}
          </Suspense>
        </main>
      </div>
    </div>
    </ThemeProvider>
  );
});

export default Main;