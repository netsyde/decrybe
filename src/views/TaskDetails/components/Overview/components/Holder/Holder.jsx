import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import moment from 'moment';
import { makeStyles } from '@material-ui/core/styles';
import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  List,
  ListItem,
  Typography
} from '@material-ui/core';

import getInitials from '../../../../../../utils/getInitials';
import { Label } from '../../../../../../components';

const useStyles = makeStyles(theme => ({
  root: {},
  header: {
    paddingBottom: 0
  },
  content: {
    paddingTop: 0
  },
  listItem: {
    padding: theme.spacing(2, 0),
    justifyContent: 'space-between'
  },
  avatar: {

  }
}));

const Holder = props => {
  const { project, className, ...rest } = props;

  const classes = useStyles(1);

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <CardHeader
        avatar={
          <Avatar
            alt="Author"
            className={classes.avatar}
            component={RouterLink}
            src={project.author.avatar ? project.author.avatar : ""}
            to="/profile/1/timeline"
          >
            {project.author.name ? getInitials(project.author.name) : "Undefined"}
          </Avatar>
        }
        className={classes.header}
        disableTypography
        subheader={
          <Typography
            component={RouterLink}
            to="/profile/1/timeline"
            variant="h5"
          >
            {project.author.name ? project.author.name : "Undefined"}
          </Typography>
        }
        title={
          <Typography
            display="block"
            variant="overline"
          >
            Task Creator
          </Typography>
        }
      />
      <CardContent className={classes.content}>
        <List>
          <ListItem
            className={classes.listItem}
            disableGutters
            divider
          >
            <Typography variant="subtitle2">Deadline</Typography>
            <Typography variant="h6">
              {(project.createTime + project.expireTime) ? moment(project.createTime + project.expireTime).format('DD MMM YYYY') : "undefined"}
            </Typography>
          </ListItem>
          <ListItem
            className={classes.listItem}
            disableGutters
            divider
          >
            <Typography variant="subtitle2">Per Project</Typography>
            <Typography variant="h6">
              {project.price ? project.price : "Undefined"} {project.currency ? project.currency : "Undefined"}
            </Typography>
          </ListItem>
          <ListItem
            className={classes.listItem}
            disableGutters
            divider
          >
            <Typography variant="subtitle2">Main Technology</Typography>
            <Label color={project.tags ? project.tags[0].color : "#fff"}>{project.tags ? project.tags[0].text : "Undefined"}</Label>
          </ListItem>
          <ListItem
            className={classes.listItem}
            disableGutters
            divider
          >
            <Typography variant="subtitle2">Last Update</Typography>
            <Typography variant="h6">
              {project.updated_at ? moment(project.updated_at).format('DD MMM YYYY') : "Undefined"}
            </Typography>
          </ListItem>
        </List>
      </CardContent>
    </Card>
  );
};

export default Holder;
