/* eslint-disable react/no-multi-comp */
/* eslint-disable react/display-name */
import BarChartIcon from '@material-ui/icons/BarChart';
import CodeIcon from '@material-ui/icons/Code';
import DashboardIcon from '@material-ui/icons/DashboardOutlined';
import ErrorIcon from '@material-ui/icons/ErrorOutline';
import FolderIcon from '@material-ui/icons/FolderOutlined';
import HomeIcon from '@material-ui/icons/HomeOutlined';
import ListAltIcon from '@material-ui/icons/ListAlt';
import LockOpenIcon from '@material-ui/icons/LockOpenOutlined';
import PresentToAllIcon from '@material-ui/icons/PresentToAll';
import PeopleIcon from '@material-ui/icons/PeopleOutlined';
import PersonIcon from '@material-ui/icons/PersonOutlined';
import ReceiptIcon from '@material-ui/icons/ReceiptOutlined';
import SettingsIcon from '@material-ui/icons/SettingsOutlined';

export default [
  {
    title: 'Pages',
    pages: [
      /*
      {
        title: 'Profile',
        href: '/profile',
        icon: PersonIcon
      },
      */
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
        title: 'Settings',
        href: '/settings',
        icon: SettingsIcon,
        children: [
          {
            title: 'General',
            href: '/settings/general'
          },
          /*{
            title: 'Other',
            href: '/settings/other'
          }*/
        ]
      },
      /*
      {
        title: 'Authentication',
        href: '/auth',
        icon: LockOpenIcon,
        children: [
          {
            title: 'Login',
            href: '/auth/login'
          },
          {
            title: 'Register',
            href: '/auth/register'
          }
        ]
      },
      */
    ]
  /*
  {
    title: 'Support',
    pages: [
      {
        title: 'About us',
        href: '/about',
        icon: PresentToAllIcon
      },
      {
        title: 'Getting started',
        href: '/getting-started',
        icon: CodeIcon
      },
    ]
  }
  */
  }
];
