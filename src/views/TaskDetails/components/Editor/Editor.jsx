import React, { useState, useEffect } from 'react';
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
import { observer, inject } from 'mobx-react';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import { CustomSnackbar } from '../../../../components'
import { Redirect } from 'react-router-dom';
import * as dAppInt from '../../../../modules/dAppInt'
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
  actions: {
    marginTop: theme.spacing(3)
  }
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
const Editor = observer((props) => {
  const { className, project, history, updateTask, rootStore, id, ...rest } = props;

  const classes = useStyles(1);

  const initialValues = {
    title: '',
    price: 1,
    category: '',
    tags: ['Decrybe', 'ReactJS'],
    startDate: moment(),
    endDate: moment().add(1, 'day'),
    briefDescription: "",
    tag: "",
    createTime: "",
    status: "featured",
    freelancers: [],
    members: [],
    currency: "Waves",
    author: ""

  };
  const len = (arg) => {
    if (arg.length > 0) {
      return true
    } else {
      return false
    }
  }
  const [taskEdited, setTaskEdited] = useState(false);
  const [task, setTask] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarType, setSnackbarType] = useState("")

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };
  const createSnackbar = (type, message) => {
    setSnackbarMessage(message)
    setSnackbarType(type)
    setOpenSnackbar(true);
  }

  const handleSubmit = event => {
    event.preventDefault();
    let store = rootStore.taskEdit;
    if (len(store.getTitle) && store.getPrice > 0 && store.getCategory && 
        len(store.getBriefDescription) && len(store.getTags) &&
        len(store.getDescription) && store.getCurrency &&
        len(store.getStatus) && store.getEndDate) {
      //     console.log(`title: ${len(store.getTitle)}; price: ${store.getPrice}; category: ${store.getCategory}
      // endDate: ${store.getEndDate}; brief: ${len(store.getBriefDescription)}; tags: ${len(store.getTags)}; desc: ${len(store.getDescription)};
      // currency: ${len(store.getCurrency)}; author: ${len(store.getAuthor)}; status: ${len(store.getStatus)}`)
      createTask()
    } else {
      createSnackbar('info', 'You have not filled in all the fields')
    }
  
  };

  const createTask = async () => {
      let store = rootStore.taskEdit;
          let now = Date.now()
          let taskId = id
          let data = {
            title: store.getTitle,
            createTime: store.getCreateDate,
            expireTime: store.getEndDate,
            price: store.getPrice,
            currency: store.getCurrency,
            author: rootStore.user.getUserAddress,
            brief: store.getBriefDescription,
            uuid: taskId,
            tags: store.getTags,
            updatedAt: now,
            members: store.getMembers,
            freelancers: store.getFreelancers,
            status: store.getStatus,
            description: store.getDescription,
            category: store.getCategory
          }
        
          let tx = await dAppInt.taskUpdate(taskId, data, rootStore.user.getWavesKeeper)
          
          if (tx) {
            createSnackbar('success', 'Task successfully updated!')
            await rootStore.user.updateStorage()
            await updateTask()
            setTask(taskId)
            setTaskEdited(true)
            
          } else {
            createSnackbar('error', 'Error: transaction is rejected')
          }
  }
  if (taskEdited) {
    history.push(`/tasks/${task}/overview`);
  }
  const [values, setValues] = useState({ ...initialValues });
  const [calendarTrigger, setCalendarTrigger] = useState(null);

  let formRef = React.createRef();
  const [isValid, setValid] = React.useState(false);

  const handleTagAdd = () => {
      if (rootStore.taskEdit.getTag && !rootStore.taskEdit.getTags.includes(rootStore.taskEdit.getTag)) {
        rootStore.taskEdit.tags = [...rootStore.taskEdit.tags];
        rootStore.taskEdit.tags.push(rootStore.taskEdit.getTag);
      }

      rootStore.taskEdit.setTag("");
  };

  const handleTagDelete = tag => {
      rootStore.taskEdit.tags = rootStore.taskEdit.tags.filter(t => t !== tag);
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

  let validatorListener = async () => {
    const valid = await formRef.current.isFormValid();
    setValid(valid)
  }

  return (
    <ValidatorForm onSubmit={handleSubmit} onError={errors => console.log(errors)}
    ref={formRef}>
      <Card
        {...rest}
        className={clsx(classes.root, className)}
      >
        <CardHeader title="About this task" />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item lg={8} md={6} sm={12} xs={12}>
              <TextValidator
                fullWidth
                label="Task Name"
                name="name"
                className={classes.textField}
                onChange={event =>
                  rootStore.taskEdit.setTitle(event.target.value)
                }
                value={rootStore.taskEdit.getTitle}
                variant="outlined"
                validators={['required', 'minStringLength:5', 'maxStringLength:50', 'trim']}
                errorMessages={['This field is required', 'Minimum 5 characters', 'Maximum 50 characters', 'Please enter words']}
                validatorListener={validatorListener}
              />
            </Grid>
            <Grid item lg={4} md={6} sm={12} xs={12}>
              <TextValidator
                fullWidth
                type="number"
                label="Price"
                name="price"
                validators={['minNumber:1', 'maxNumber: 100000', 'required']}
                errorMessages={['Minimum price is 1', 'Maximum price is 100k', 'This field is required']}
                className={classes.textField}
                onChange={event =>
                  rootStore.taskEdit.setPrice(event.target.value)
                }
                value={rootStore.taskEdit.getPrice}
                variant="outlined"
                validatorListener={validatorListener}
              />
            </Grid>
            <Grid item lg={4} md={6} sm={12} xs={12}>
              <TextValidator
                fullWidth
                id="category"
                select
                label="Category"
                className={classes.textField}
                value={rootStore.taskEdit.getCategory}
                validators={['required']}
                errorMessages={['This field is required']}
                onChange={event =>
                  rootStore.taskEdit.setCategory(event.target.value)
                }
                SelectProps={{
                  MenuProps: {
                    className: classes.menu,
                  },
                }}
                margin="normal"
                variant="outlined"
                validatorListener={validatorListener}
              >
                {categories.map(option => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextValidator>
            </Grid>
            <Grid item lg={4} md={12} sm={12} xs={12}>
              <TextValidator
                fullWidth
                className={classes.dateField}
                label="End Date"
                name="endDate"
                onClick={() => handleCalendarOpen('endDate')}
                value={moment(rootStore.taskEdit.getEndDate).format('DD/MM/YYYY')}
                variant="outlined"
              />
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
                  rootStore.taskEdit.setBriefDescription(event.target.value)
                }
                value={rootStore.taskEdit.getBriefDescription}
                variant="outlined"
                validatorListener={validatorListener}
              />
            </div>
            <div className={classes.formGroup}>
              <div className={classes.fieldGroup}>
                <TextValidator
                  className={classes.flexGrow}
                  label="Task Tags"
                  name="tag"
                  onChange={event =>
                    rootStore.taskEdit.setTag(event.target.value)
                  }
                  value={rootStore.taskEdit.getTag}
                  variant="outlined"
                  validators={['maxStringLength:15']}
                  errorMessages={['Maximum 15 characters']}
                  validatorListener={validatorListener}
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
                {rootStore.taskEdit.getTags.map(tag => (
                  <Chip
                    deleteIcon={<CloseIcon />}
                    key={tag}
                    label={tag}
                    onDelete={() => handleTagDelete(tag)}
                  />
                ))}
              </div>
            </div>
          <RichEditor placeholder={"Say something about the task..."} store={rootStore.taskEdit} rootStore={rootStore} project={project}/>
        </CardContent>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <DatePicker
          minDate={calendarMinDate}
          onAccept={date => rootStore.taskEdit.setEndDate(date)}
          onChange={handleCalendarChange}
          onClose={handleCalendarClose}
          open={calendarOpen}
          style={{ display: 'none' }} // Temporal fix to hide the input element
          value={rootStore.taskEdit.getEndDate}
          variant="dialog"
        />
        </MuiPickersUtilsProvider>
      </Card>
      <div className={classes.actions}>
        <Button
          color="primary"
          variant="contained"
          type="submit"
          disabled={!isValid}
        >
          Save
        </Button>
      </div>
      <CustomSnackbar
        onClose={handleSnackbarClose}
        open={openSnackbar}
        message={snackbarMessage}
        type={snackbarType}
      />
    </ValidatorForm>
  );
});
export default Editor;
