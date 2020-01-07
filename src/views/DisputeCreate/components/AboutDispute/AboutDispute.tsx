import React from 'react';
import clsx from 'clsx';
import moment from 'moment';
import { makeStyles } from '@material-ui/core/styles';
import {
  Card,
  CardHeader,
  CardContent,
} from '@material-ui/core';
import { RichEditor } from '../../../../components';
import MenuItem from '@material-ui/core/MenuItem';
import Grid from '@material-ui/core/Grid';
import { observer } from 'mobx-react';
import { TextValidator } from 'react-material-ui-form-validator';
const useStyles = makeStyles(theme => ({
  root: {},
  alert: {
    marginBottom: theme.spacing(3)
  },
  formGroup: {
    marginBottom: theme.spacing(3)
  },
  fieldGroup: {
    display: 'flex',
    alignItems: 'center'
  },
  fieldHint: {
    margin: theme.spacing(1, 0)
  },
  tags: {
    marginTop: theme.spacing(1),
    '& > * + *': {
      margin: theme.spacing(1)
    }
  },
  flexGrow: {
    flexGrow: 1
  },
  dateField: {
    '& + &': {
      marginLeft: theme.spacing(2)
    },
    marginBottom: theme.spacing(3),
  },
  addButton: {

  },
  addIcon: {

  },
  menu: {
    width: 227,
  },
  textField: {
    marginRight: theme.spacing(1),
    marginBottom: theme.spacing(3),
  },
}));
const categories = [
  {
    value: 1,
    label: 'Websites, IT & Software',
  },
  {
    value: 2,
    label: 'Design & Media',
  },
  {
    value: 3,
    label: 'Product Sourcing',
  },
  {
    value: 4,
    label: 'Sales & Marketing',
  },
  {
    value: 5,
    label: 'Translation & Languages',
  },
  {
    value: 6,
    label: 'Local Jobs & Services',
  },
  {
    value: 7,
    label: 'Other',
  },
];

const AboutDispute = observer((props) => {
  const { className, rootStore, validatorListener, ...rest } = props;
  const classes = useStyles(1);

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <CardHeader title="About this dispute" />
      <CardContent>
        <Grid container spacing={3}>
          <Grid item lg={8} md={6} sm={12} xs={12}>
            <TextValidator
              fullWidth
              label="Dispute Name"
              name="name"
              className={classes.textField}
              onChange={event =>
                rootStore.disputeCreate.setTitle(event.target.value)
              }
              value={rootStore.disputeCreate.getTitle}
              variant="outlined"
              validators={['required', 'minStringLength:5', 'maxStringLength:50', 'trim']}
              errorMessages={['This field is required', 'Minimum 5 characters', 'Maximum 50 characters', 'Please enter words']}
              validatorListener={validatorListener}
            />
          </Grid>
          <Grid item lg={4} md={12} sm={12} xs={12}>
            <TextValidator
              fullWidth
              id="task"
              select
              label="Task"
              className={classes.textField}
              value={rootStore.disputeCreate.getTask}
              onChange={event =>
                rootStore.disputeCreate.setTask(event.target.value)
              }
              SelectProps={{
                MenuProps: {
                  className: classes.menu,
                },
              }}
              margin="normal"
              variant="outlined"
              validators={['required']}
              errorMessages={['This field is required']}
              validatorListener={validatorListener}
            >
              {rootStore.user.getUserAttachedTasks.map(task => (
                <MenuItem key={task.uuid} value={task.uuid}>
                  {task.title}
                </MenuItem>
              ))}
              
            </TextValidator>
            </Grid>
          </Grid>
          <div className={classes.formGroup}>
            <TextValidator
              fullWidth
              label="Brief description"
              name="briefDescription"
              validators={['required', 'minStringLength:15', 'maxStringLength:80', 'trim']}
              errorMessages={['This field is required', 'Minimum 15 characters', 'Maximum 80 characters', 'Please enter words']}
              onChange={event =>
                rootStore.disputeCreate.setBriefDescription(event.target.value)
              }
              value={rootStore.disputeCreate.getBriefDescription}
              variant="outlined"
              validatorListener={validatorListener}
            />
          </div>
        <RichEditor placeholder={"Say something..."} store={rootStore.disputeCreate} />
      </CardContent>
    </Card>
  );
});
export default AboutDispute;
