import React, { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
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
import * as nodeInt from '../../../../../../modules/nodeInt'
import getInitials from '../../../../../../utils/getInitials';
import { Label } from '../../../../../../components';
import { observer, inject } from 'mobx-react';
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

const HolderContainer = props => {
  const { project, className, rootStore, ...rest } = props;

  const classes = useStyles(1);
  const [user, setUser] = useState("");

  useEffect(() => {
    
    async function getAuthorData () {
      let userData = await nodeInt.getUserData(project.author, rootStore.user.getDapp, rootStore.user.getUserNetwork)
      if (userData) {
        setUser(userData)
      }
    }
    getAuthorData()

  }, []);

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
            src={user.avatar ? user.avatar : ""}
            to={`/profile/${user.address ? user.address : "undefined"}`}
          >
            {user.name ? getInitials(user.name) : "Undefined"}
          </Avatar>
        }
        className={classes.header}
        disableTypography
        subheader={
          <Typography
            component={RouterLink}
            to={`/profile/${user.address ? user.address : "undefined"}`}
            variant="h5"
          >
            {user.name}
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
              {(project.expireTime) ? moment(project.expireTime).format('DD MMM YYYY') : "undefined"}
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
            <Label color={"#e74c3c"}>{project.tags ? project.tags[0] : "Undefined"}</Label>
          </ListItem>
          <ListItem
            className={classes.listItem}
            disableGutters
            divider
          >
            <Typography variant="subtitle2">Last Update</Typography>
            <Typography variant="h6">
              {project.updatedAt ? moment(project.updatedAt).format('DD MMM YYYY') : "Undefined"}
            </Typography>
          </ListItem>
        </List>
      </CardContent>
    </Card>
  );
};

@inject("rootStore")
@observer
class Holder extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <HolderContainer rootStore={this.props.rootStore} project={this.props.project}/>
    )
  }
}

export default Holder;
