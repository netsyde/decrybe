/* eslint-disable react/no-multi-comp */
/* eslint-disable react/display-name */
import React, { lazy } from 'react';
import { Redirect } from 'react-router-dom';
import { Main as MainLayout } from './layouts';
import { Auth as AuthLayout } from './layouts'
const routes = [
  {
    path: '/',
    exact: true,
    component: () => <Redirect to="/overview" />
  },
  {
    path: '/register',
    component: AuthLayout,
    routes: [
      {
        path: '/register',
        exact: true,
        component: lazy(() => import('./views/Register'))
      },
      {
        path: '/register/terms',
        exact: true,
        component: lazy(() => import('./views/Terms'))
      },
      {
        component: () => <Redirect to="/404" />
      }
    ]
  },
  {
    route: '*',
    component: MainLayout,
    routes: [
      {
        path: '/overview',
        exact: true,
        component: lazy(() => import('./views/Overview'))
      },
      {
        path: '/disputes/create',
        exact: true,
        component: lazy(() => import('./views/DisputeCreate'))
      },
      {
        path: '/disputes',
        exact: true,
        component: lazy(() => import('./views/DisputeList'))
      },
      {
        path: '/disputes/:id',
        exact: true,
        component: lazy(() => import('./views/Dispute'))
      },
      {
        path: '/disputes/:id/:tab',
        exact: true,
        component: lazy(() => import('./views/Dispute'))
      },
      {
        path: '/tasks/create',
        exact: true,
        component: lazy(() => import('./views/TaskCreate'))
      },
      {
        path: '/tasks',
        exact: true,
        component: lazy(() => import('./views/TaskList'))
      },
      {
        path: '/tasks/:id',
        exact: true,
        component: lazy(() => import('./views/TaskDetails'))
      },
      
      {
        path: '/tasks/:id/:tab',
        exact: true,
        component: lazy(() => import('./views/TaskDetails'))
      },
      {
        path: '/settings',
        exact: true,
        component: lazy(() => import('./views/Settings'))
      },
      {
        path: '/settings/:tab',
        exact: true,
        component: lazy(() => import('./views/Settings'))
      },
      {
        path: '/chat',
        exact: true,
        component: lazy(() => import('./views/Chat'))
      },
      {
        path: '/chat/:id',
        exact: true,
        component: lazy(() => import('./views/Chat'))
      },
      {
        path: '/changelog',
        exact: true,
        component: lazy(() => import('./views/Changelog'))
      },
      {
        path: '/profile/:id',
        exact: true,
        component: lazy(() => import('./views/Profile'))
      },
      {
        path: '/profile/:id/:tab',
        exact: true,
        component: lazy(() => import('./views/Profile'))
      },
      {
        path: '/404',
        exact: true,
        component: lazy(() => import('./views/NotFound'))
      },
      {
        component: () => <Redirect to="/404" />
      }
    ]
  }
];

export default routes;
