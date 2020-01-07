import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { Avatar, Paper, Button, IconButton, Tooltip } from '@material-ui/core';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import AddPhotoIcon from '@material-ui/icons/AddPhotoAlternate';
import { observer } from 'mobx-react';
import * as dAppInt from "../../../../../../modules/dAppInt"

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3),
    display: 'flex'
  },
  avatar: {
    marginRight: theme.spacing(2)
  },
  paper: {
    flexGrow: 1,
    padding: theme.spacing(2)
  },
  textArea: {
    ...theme.typography.body1,
    border: 'none',
    outline: 'none',
    resize: 'none',
    width: '100%'
  },
  actions: {
    display: 'flex',
    alignItems: 'center',
    marginTop: theme.spacing(2)
  },
  sendButton: {
    marginRight: theme.spacing(2)
  },
  fileInput: {
    display: 'none'
  }
}));

const DisputeForm = observer((props) => {
  const { className, dispute, rootStore, ...rest } = props;

  const classes = useStyles(1);

  const fileInputRef = useRef(null);
  let formRef = React.createRef();
  const [value, setValue] = useState('');
  const [isValid, setValid] = React.useState(false);

  const handleChange = event => {
    event.persist();
    setValue(event.target.value);
    if (event.target.value.length > 0) {
      setValid(true)
    } else {
      setValid(false)
    }
  };

  const handleAttach = () => {
    fileInputRef.current.click();
  };

  const handleSubmit = async () => {
    event.preventDefault();
    let data = {
      message: value,
      createdAt: Date.now()
    }
    let tx = await dAppInt.taskDisputeMessage(dispute.task, data, rootStore.user.getWavesKeeper)

    if (tx) {
      rootStore.user.updateStorage()
      setValue("")
    } else {
      console.log("Error")
    }
  }

  return (
    <div
      {...rest}
      className={clsx(classes.root, className)}
    >
      <Avatar
        alt="Person"
        className={classes.avatar}
        src={rootStore.user.getUserAvatar}
      />
      <Paper
        className={classes.paper}
        elevation={1}
      >
        <TextareaAutosize
          className={classes.textArea}
          onChange={handleChange}
          placeholder="Leave a message"
          rows={6}
          value={value}
          //validatorListener={validatorListener}
        />
        <div className={classes.actions}>
          <Button
            className={classes.sendButton}
            color="primary"
            variant="contained"
            onClick={handleSubmit}
            type="submit"
            disabled={!isValid}
          >
            Send
          </Button>
          {/* <Tooltip title="Attach image">
            <IconButton onClick={handleAttach}>
              <AddPhotoIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Attach file">
            <IconButton onClick={handleAttach}>
              <AttachFileIcon />
            </IconButton>
          </Tooltip> */}
        </div>
      </Paper>
      {/* <input
        className={classes.fileInput}
        ref={fileInputRef}
        type="file"
      /> */}
    </div>
  );
});

export default DisputeForm;
