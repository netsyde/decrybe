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
