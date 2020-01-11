import React, { Fragment, Suspense } from 'react';
import { renderRoutes } from 'react-router-config';
import { makeStyles } from '@material-ui/core/styles';
import { LinearProgress } from '@material-ui/core';
import { Provider } from 'mobx-react';
import { Topbar } from './components';
import rootStore from '../../store/RootStore'
import light from '../../theme/light';
import dark from '../../theme/dark'
import { observer } from 'mobx-react';
import { ThemeProvider } from '@material-ui/core/styles';
const stores = { rootStore };

const useStyles = makeStyles(theme => ({
  content: props => ({
    height: '100%',
    paddingTop: 56,
    [theme.breakpoints.up('sm')]: {
      paddingTop: 64
    },
    backgroundColor: props.theme == false ? "#F4F6F8" : "#212121"
  })
}));

const Auth = observer((props) => {
  const { route } = props;
  let theme = rootStore.user.getTheme;
  const classes = useStyles({theme});

  return (
    <ThemeProvider theme={rootStore.user.getTheme == false ? light : dark}>
      <Provider { ...stores }>
        <Fragment>
          <Topbar />
          <main className={classes.content}>
            <Suspense fallback={<LinearProgress />}>
              {renderRoutes(route.routes)}
            </Suspense>
          </main>
        </Fragment>
      </Provider>
    </ThemeProvider>
  );
});

export default Auth;
