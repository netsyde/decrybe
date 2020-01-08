import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import {
  Avatar,
  Divider,
  IconButton,
  Input,
  Paper,
  Tooltip,
  LinearProgress 
} from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';
import { observer } from 'mobx-react';
import * as dAppInt from '../../../../../../modules/dAppInt'
import getInitials from '../../../../../../utils/getInitials'
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor:'#ffffff',
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(1, 2)
  },
  paper: {
    flexGrow: 1,
    marginLeft: theme.spacing(2),
    padding: theme.spacing(0.5, 2)
  },
  input: {
    width: '100%'
  },
  divider: {
    width: 1,
    height: 24
  },
  fileInput: {
    display: 'none'
  }
}));

const ConversationForm = observer((props) => {
  const { className, conversation, rootStore, ...rest } = props;

  const classes = useStyles(props);

  const fileInputRef = useRef(null);

  const [value, setValue] = useState('');
  const [progressOn, setProgressOn] = useState(false);
  const sender = {
    avatar: '/img/gag.png'
  };

  const handleChange = event => {
    event.persist();

    setValue(event.target.value);

  };

  const handleAttach = () => {
    fileInputRef.current.click();
  };

  const onApply = async event => {
    setProgressOn(true)
    //await dAppInt.takeTask(project.uuid, value, project.author.publicKey, rootStore.user.getWavesKeeper)
    let message = await dAppInt.sendMessage(conversation.id, conversation.user.address, value, conversation.user.publicKey, Date.now(), rootStore.user.getWavesKeeper)
    if (message) {
      setValue('')
      setProgressOn(false)
      await rootStore.user.updateStorage()
    } else {
      setProgressOn(false)
    }
  };

  const handleBrokenImage = e => (e.target.src = "/img/gag.png");

  return (
    <ValidatorForm onSubmit={onApply} onError={errors => console.log(errors)}
      {...rest}
      className={clsx(classes.root, className)}
    >
      <Avatar
        alt="Person"
        src={rootStore.user.getUserAvatar || ""}
        imgProps={{ onError: handleBrokenImage }}
      >
        {rootStore.user.getUserName ? getInitials(rootStore.user.getUserName) : ""}
      </Avatar>
      <Paper
        className={classes.paper}
        elevation={1}
      >
        <TextValidator
          className={classes.input}
          //disableUnderline
          value={value}
          onChange={handleChange}
          placeholder="Leave a message"
          validators={['required', 'minStringLength:1', 'maxStringLength:500', 'trim']}
              errorMessages={['This field is required', 'Minimum 1 character', 'Maximum 500 characters', 'Please enter words']}
        />
      </Paper>
      <Tooltip title="Send">
        <IconButton 
          color={value.length > 0 ? 'primary' : 'default'}
          type="submit"
          >
          <SendIcon />
        </IconButton>
      </Tooltip>
     {/* { <Divider className={classes.divider} />
      <Tooltip title="Attach photo">
        <IconButton
          edge="end"
          onClick={handleAttach}
        >
          <AddPhotoIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title="Attach file">
        <IconButton
          edge="end"
          onClick={handleAttach}
        >
          <AttachFileIcon />
        </IconButton>
      </Tooltip>
      <input
        className={classes.fileInput}
        ref={fileInputRef}
        type="file"
      />} */}
    </ValidatorForm>
  );
});

export default ConversationForm;
