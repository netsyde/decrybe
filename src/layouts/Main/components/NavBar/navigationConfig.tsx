/* eslint-disable react/no-multi-comp */
/* eslint-disable react/display-name */
import React from 'react';
import FolderIcon from '@material-ui/icons/FolderOutlined';
import SettingsIcon from '@material-ui/icons/SettingsOutlined';
import ChatIcon from '@material-ui/icons/ChatOutlined';
import { Label } from '../../../../components'
import { colors } from '@material-ui/core';
import ViewModuleIcon from '@material-ui/icons/ViewModule';
import HomeIcon from '@material-ui/icons/HomeOutlined';

export default [
  {
    title: 'Pages',
    pages: [
      {
        title: 'Overview',
        href: '/overview',
        icon: HomeIcon
      },
      {
        title: 'Tasks',
        href: '/tasks',
        icon: FolderIcon,
        children: [
          {
            title: 'Browse',
            href: '/tasks'
          },
          {
            title: 'Create',
            href: '/tasks/create'
          }
        ]
      },
      {
        title: 'Chat',
        href: '/chat',
        icon: ChatIcon,
        label: () => (
          <Label
            color={colors.red[500]}
          >
            alpha
          </Label>
        )
      },
      {
        title: 'Settings',
        href: '/settings',
        icon: SettingsIcon,
        children: [
          {
            title: 'General',
            href: '/settings/general'
          },
        ]
      },
    ]
  },
  {
    title: 'Support',
    pages: [
      {
        title: 'Changelog',
        href: '/changelog',
        icon: ViewModuleIcon,
        label: () => <Label color={colors.blue['500']}>v0.5</Label>
      }
    ]
  }
];
