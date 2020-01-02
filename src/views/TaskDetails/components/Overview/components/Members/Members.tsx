import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  colors
} from '@material-ui/core';

import getInitials from '../../../../../../utils/getInitials';

const useStyles = makeStyles(() => ({
  root: {},
  header: {
    paddingBottom: 0
  },
  content: {
    paddingTop: 0,
    paddingBottom: 0
  },
  actions: {
    backgroundColor: colors.grey[50]
  },
  manageButton: {
    width: '100%'
  },
  avatar: {
    
  }
}));

const Members = props => {
  const { className, rootStore, project, ...rest } = props;

  const classes = useStyles(1);
    return (
      <Card
        {...rest}
        className={clsx(classes.root, className)}
      >
        <CardHeader
          className={classes.header}
          title="Project freelancer"
          titleTypographyProps={{
            variant: 'overline'
          }}
        />
        <CardContent className={classes.content}>
          <List>
              <ListItem
                disableGutters
                key={project.freelancerData ? project.freelancerData.address : 1}
              >
                <ListItemAvatar>
                  <Avatar
                    alt="Author"
                    className={classes.avatar}
                    src={project.freelancerData ? project.freelancerData.avatar : ""}
                  >
                    {getInitials(project.freelancerData ? project.freelancerData.name : "Undefined")}
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={project.freelancerData ? project.freelancerData.name : "Undefined"}
                  primaryTypographyProps={{ variant: 'h6' }}
                  secondary={project.freelancerData ? project.freelancerData.bio : "Undefined"}
                />
              </ListItem>
          </List>
        </CardContent>
        {/* {rootStore.user.getUserAddress == project.author.address ?
        <CardActions className={classes.actions}>
          <Button className={classes.manageButton}>Manage users</Button>
        </CardActions> : null} */}
      </Card>
    )
};

export default Members;
