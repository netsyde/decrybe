import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import * as nodeInt from '../modules/nodeInt';

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
  let data;
  if (props.address && props.dAppAddress && props.nodeUrl) {

    async function getTaskId() {
      try {
        let id = await nodeInt.taskIdGenerator(props.address, props.dAppAddress, props.nodeUrl)
        console.log(id)
        data.id = id;
      } catch (e) {
        console.log(e)
      }
    }
    getTaskId();
    data = {
      type: "task",
      title: "",
      price: "",
      description: "",
      id: "", // add logic
      customer: props.address,
      freelancer: "",
      status: "active", // active, closed, completed
      version: 1 // version of task
    }
  }
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

  let sendDataTx = (data, seed, nodeUrl) => {
    nodeInt.dataTx(data, seed, nodeUrl);
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
            sendDataTx(data, seed, props.nodeUrl)
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