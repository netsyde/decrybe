import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import * as dAppInt from '../modules/dAppInt'
import * as nodeInt from '../modules/nodeInt';

const uuid = require('uuid/v4');
const seed = "melody eye stock ostrich camera talk unlock royal insane pipe step squeeze";

const useStyles = makeStyles(theme => ({
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
  containerFields: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  descriptionField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  button: {
    backgroundColor: "#654EA3",
    margin: theme.spacing(1),
    '&:hover': {
      backgroundColor: "#513e82"
    },
  },
  main: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  }
}));


export default function TaskCreator(props) {
  const classes = useStyles();
  let data = {};
  data.expiration = 50000;


  let changeField = (e, field) => {
    console.log(data.id);
    if (field == "title") {
      data.title = e.target.value;

    } else if (field == "price") {
      data.price = e.target.value;
    } else if (field == "description") {
      data.description = e.target.value;
    } else {
      console.log(`Поле не указано в аргументе field.`)
    }
  }

  return (
    <div className={classes.main}>
      <form className={classes.containerFields} noValidate autoComplete="off">
        <TextField
          id="title"
          label="Title"
          margin="normal"
          className={classes.textField}
          onChange = {(e) => {changeField(e, "title")}}
        />
        <TextField
          id="price"
          type="number"
          label="Price"
          margin="normal"
          className={classes.textField}
          onChange = {(e) => {changeField(e, "price")}}
        />
      </form>
      <TextField
        id="standard-name"
        label="Description"
        multiline
        margin="normal"
        className={classes.descriptionField}
        onChange = {(e) => {changeField(e, "description")}} 
      />
      <Button 
        variant="contained"
        onClick={() => { 
          console.log(data.title)
          console.log(`${data.title}: ${data.price}: ${data.description}`)
          if (data.title && data.price && data.description) {
            dAppInt.createTask(uuid(), data.expiration, data, props.wavesKeeper)
          } else {
            console.log("Err in sendDataTx (taskCreator)")
          }
        }}
        color="primary"
        className={classes.button}
      >
        Create a task
      </Button>
    </div>
  );
}