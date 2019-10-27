/* eslint-disable react/no-multi-comp */
import React from 'react';
import { matchPath } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { List, Typography } from '@material-ui/core';

import useRouter from '../../utils/useRouter';
import { NavigationListItem } from './components';

const useStyles = makeStyles(theme => ({
  root: {
    marginBottom: theme.spacing(3)
  }
}));

const NavigationList = props => {
  const { pages, ...rest } = props;

  return (
    <List>
      {pages.reduce(
        (items, page) => reduceChildRoutes({ items, page, ...rest }),
        []
      )}
    </List>
  );
};

NavigationList.propTypes = {
  depth: PropTypes.number,
  pages: PropTypes.array
};

const reduceChildRoutes = props => {
  const { router, items, page, depth } = props;

  if (page.children) {
    const open = matchPath(router.location.pathname, {
      path: page.href,
      exact: false
    });

    items.push(
      <NavigationListItem
        depth={depth}
        icon={page.icon}
        key={page.title}
        label={page.label}
        open={Boolean(open)}
        title={page.title}
      >
        <NavigationList
          depth={depth + 1}
          pages={page.children}
          router={router}
        />
      </NavigationListItem>
    );
  } else {
    items.push(
      <NavigationListItem
        depth={depth}
        href={page.href}
        icon={page.icon}
        key={page.title}
        label={page.label}
        title={page.title}
      />
    );
  }

  return items;
};

const Navigation = props => {
  const { title, pages, className, component: Component, ...rest } = props;

  const classes = useStyles(1);
  const router = useRouter();

  return (
    <Component
      {...rest}
      className={clsx(classes.root, className)}
    >
      {title && <Typography variant="overline">{title}</Typography>}
      <NavigationList
        depth={0}
        pages={pages}
        router={router}
      />
    </Component>
  );
};

Navigation.propTypes = {
  className: PropTypes.string,
  component: PropTypes.any,
  pages: PropTypes.array.isRequired,
  title: PropTypes.string
};

Navigation.defaultProps = {
  component: 'nav'
};

export default Navigation;
