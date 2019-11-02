import React, { useState } from 'react';
import PropTypes from 'prop-types';
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
      marginLeft: theme.spacing(1)
    }
  },
  flexGrow: {
    flexGrow: 1
  },
  dateField: {
    '& + &': {
      marginLeft: theme.spacing(2)
    }
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
    width: 227,
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

const AboutTask = props => {
  const { className, ...rest } = props;

  const classes = useStyles(1);

  const initialValues = {
    name: '',
    tag: '',
    tags: ['Full-Time', 'ReactJS'],
    startDate: moment(),
    endDate: moment().add(1, 'day')
  };

  const [values, setValues] = useState({ ...initialValues });
  const [calendarTrigger, setCalendarTrigger] = useState(null);
  const [currency, setCurrency] = React.useState('EUR');

  const handleChange = event => {
    setCurrency(event.target.value);
  };

  const handleFieldChange = (event, field, value) => {
    event.persist && event.persist();
    setValues(values => ({
      ...values,
      [field]: value
    }));
  };

  const handleTagAdd = () => {
    setValues(values => {
      const newValues = { ...values };

      if (newValues.tag && !newValues.tags.includes(newValues.tag)) {
        newValues.tags = [...newValues.tags];
        newValues.tags.push(newValues.tag);
      }

      newValues.tag = '';
      console.log(values.tags)
      return newValues;
    });
  };

  const handleTagDelete = tag => {
    setValues(values => {
      const newValues = { ...values };

      newValues.tags = newValues.tags.filter(t => t !== tag);

      return newValues;
    });
  };

  const handleCalendarOpen = trigger => {
    setCalendarTrigger(trigger);
    console.log(values.startDate)
  };

  const handleCalendarChange = () => {};

  const handleCalendarAccept = date => {
    setValues(values => ({
      ...values,
      [calendarTrigger]: date
    }));
  };

  const handleCalendarClose = () => {
    setCalendarTrigger(false);
  };

  const calendarOpen = Boolean(calendarTrigger);
  const calendarMinDate =
    calendarTrigger === 'startDate'
      ? moment()
      : moment(values.startDate).add(1, 'day');
  const calendarValue = values[calendarTrigger];

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <CardHeader title="About this task" />
      <CardContent>
        <form>
          <div className={classes.formGroup}>
            <TextField
              fullWidth
              label="Task Name"
              name="name"
              onChange={event =>
                handleFieldChange(event, 'name', event.target.value)
              }
              value={values.name}
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
                  handleFieldChange(event, 'tag', event.target.value)
                }
                value={values.tag}
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
              {values.tags.map(tag => (
                <Chip
                  deleteIcon={<CloseIcon />}
                  key={tag}
                  label={tag}
                  onDelete={() => handleTagDelete(tag)}
                />
              ))}
            </div>
          </div>
          <div className={classes.formGroup}>
            <div className={classes.fieldGroup}>

              <TextField
                id="category"
                select
                label="Category"
                className={classes.textField}
                value={currency}
                onChange={handleChange}
                SelectProps={{
                  //native: true,
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
              <TextField
                className={classes.dateField}
                label="End Date"
                name="endDate"
                onClick={() => handleCalendarOpen('endDate')}
                value={moment(values.endDate).format('DD/MM/YYYY')}
                variant="outlined"
              />

            </div>
          </div>
        </form>
        <RichEditor placeholder={"Say something about the task..."} />
      </CardContent>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <DatePicker
        minDate={calendarMinDate}
        onAccept={handleCalendarAccept}
        onChange={handleCalendarChange}
        onClose={handleCalendarClose}
        open={calendarOpen}
        style={{ display: 'none' }} // Temporal fix to hide the input element
        value={calendarValue}
        variant="dialog"
      />
      </MuiPickersUtilsProvider>
    </Card>
  );
};

AboutTask.propTypes = {
  className: PropTypes.string
};

export default AboutTask;
