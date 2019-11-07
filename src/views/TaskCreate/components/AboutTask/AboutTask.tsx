import React, { useState } from 'react';
import clsx from 'clsx';
import moment from 'moment';
import { makeStyles } from '@material-ui/core/styles';
import {
  Card,
  CardHeader,
  CardContent,
  TextField,
  Button,
  Chip,
  Typography
} from '@material-ui/core';
import { DatePicker } from '@material-ui/pickers';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';
import DateFnsUtils from '@date-io/date-fns';
import { RichEditor } from '../../../../components';
import MenuItem from '@material-ui/core/MenuItem';
import Grid from '@material-ui/core/Grid';
import { observer } from 'mobx-react';
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
const AboutTask = observer((props) => {
  const { className, rootStore, ...rest } = props;

  const classes = useStyles(1);

  const initialValues = {
    name: '',
    briefDescription: '',
    tag: '',
    tags: ['Decrybe', 'ReactJS'],
    price: 1,
    startDate: moment(),
    endDate: moment().add(1, 'day')
  };

  const [values, setValues] = useState({ ...initialValues });
  const [calendarTrigger, setCalendarTrigger] = useState(null);

  const handleTagAdd = () => {
      if (rootStore.taskCreate.getTag && !rootStore.taskCreate.getTags.includes(rootStore.taskCreate.getTag)) {
        rootStore.taskCreate.tags = [...rootStore.taskCreate.tags];
        rootStore.taskCreate.tags.push(rootStore.taskCreate.getTag);
      }

      rootStore.taskCreate.setTag("");
  };

  const handleTagDelete = tag => {
      rootStore.taskCreate.tags = rootStore.taskCreate.tags.filter(t => t !== tag);
  };

  const handleCalendarOpen = trigger => {
    setCalendarTrigger(trigger);
    console.log(values.startDate)
  };

  const handleCalendarChange = () => {};

  const handleCalendarClose = () => {
    setCalendarTrigger(false);
  };

  const calendarOpen = Boolean(calendarTrigger);
  const calendarMinDate =
    calendarTrigger === 'startDate'
      ? moment()
      : moment(values.startDate).add(1, 'day');
  const calendarValue = values[calendarTrigger];

  let onChange = e => {
    rootStore.taskCreate.setTitle(e.target.value)
    e.preventDefault();
  }

  let getValue = () => {
    let tesr = rootStore.taskCreate.getTitle
    return tesr
  }
  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <CardHeader title="About this task" />
      <CardContent>
        <form>
        <Grid container spacing={3}>
          <Grid item lg={8} md={6} sm={12} xs={12}>
            <TextField
              fullWidth
              required
              label="Task Name"
              name="name"
              className={classes.textField}
              onChange={event =>
                rootStore.taskCreate.setTitle(event.target.value)
              }
              value={rootStore.taskCreate.getTitle}
              variant="outlined"
            />
          </Grid>
          <Grid item lg={4} md={6} sm={12} xs={12}>
            <TextField
              fullWidth
              required
              type="number"
              label="Price"
              name="price"
              className={classes.textField}
              onChange={event =>
                rootStore.taskCreate.setPrice(event.target.value)
              }
              value={rootStore.taskCreate.getPrice}
              variant="outlined"
            />
          </Grid>
          <Grid item lg={4} md={6} sm={12} xs={12}>
            <TextField
              fullWidth
              required
              id="category"
              select
              label="Category"
              className={classes.textField}
              value={rootStore.taskCreate.getCategory}
              onChange={event =>
                rootStore.taskCreate.setCategory(event.target.value)
              }
              SelectProps={{
                MenuProps: {
                  className: classes.menu,
                },
              }}
              margin="normal"
              variant="outlined"
            >
              {categories.map(option => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item lg={4} md={12} sm={12} xs={12}>
            <TextField
              fullWidth
              required
              className={classes.dateField}
              label="End Date"
              name="endDate"
              onClick={() => handleCalendarOpen('endDate')}
              value={moment(rootStore.taskCreate.getEndDate).format('DD/MM/YYYY')}
              variant="outlined"
            />
          </Grid>
          </Grid>
          <div className={classes.formGroup}>
            <TextField
              fullWidth
              required
              label="Brief description"
              name="briefDescription"
              onChange={event =>
                rootStore.taskCreate.setBriefDescription(event.target.value)
              }
              value={rootStore.taskCreate.getBriefDescription}
              variant="outlined"
            />
          </div>
          <div className={classes.formGroup}>
            <div className={classes.fieldGroup}>
              <TextField
                className={classes.flexGrow}
                label="Task Tags"
                name="tag"
                onChange={event =>
                  rootStore.taskCreate.setTag(event.target.value)
                }
                value={rootStore.taskCreate.getTag}
                variant="outlined"
              />
              <Button
                className={classes.addButton}
                onClick={handleTagAdd}
                size="small"
              >
                <AddIcon className={classes.addIcon} />
                Add
              </Button>
            </div>
            <Typography
              className={classes.fieldHint}
              variant="body2"
            >
              Tags will be colored depending the technology if the system
              recognises.
            </Typography>
            <div className={classes.tags}>
              {rootStore.taskCreate.getTags.map(tag => (
                <Chip
                  deleteIcon={<CloseIcon />}
                  key={tag}
                  label={tag}
                  onDelete={() => handleTagDelete(tag)}
                />
              ))}
            </div>
          </div>
        </form>
        <RichEditor placeholder={"Say something about the task..."} rootStore={rootStore} />
      </CardContent>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <DatePicker
        minDate={calendarMinDate}
        onAccept={date => rootStore.taskCreate.setEndDate(date)}
        onChange={handleCalendarChange}
        onClose={handleCalendarClose}
        open={calendarOpen}
        style={{ display: 'none' }} // Temporal fix to hide the input element
        value={rootStore.taskCreate.getEndDate}
        variant="dialog"
      />
      </MuiPickersUtilsProvider>
    </Card>
  );
});
export default AboutTask;
