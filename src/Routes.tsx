/* eslint-disable react/no-multi-comp */
/* eslint-disable react/display-name */
import React, { lazy } from 'react';
import { Redirect } from 'react-router-dom';
import { Main as MainLayout } from './layouts';

const routes = [
  {
    path: '/',
    exact: true,
    component: () => <Redirect to="/tasks" />
  },
  {
    route: '*',
    component: MainLayout,
    routes: [
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
