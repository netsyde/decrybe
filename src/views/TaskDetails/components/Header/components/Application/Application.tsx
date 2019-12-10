import React, { useState } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import {
  Avatar,
  Button,
  Dialog,
  TextField,
  Typography,
  colors
} from '@material-ui/core';
import * as dAppInt from '../../../../../../modules/dAppInt'
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator';
import { Redirect } from 'react-router-dom';
const useStyles = makeStyles(theme => ({
  root: {
    width: 960
  },
  header: {
    padding: theme.spacing(3),
    maxWidth: 720,
    margin: '0 auto'
  },
  content: {
    padding: theme.spacing(0, 2),
    maxWidth: 720,
    margin: '0 auto'
  },
  helperText: {
    textAlign: 'right',
    marginRight: 0
  },
  author: {
    margin: theme.spacing(4, 0),
    display: 'flex'
  },
  avatar: {
    marginRight: theme.spacing(2)
  },
  actions: {
    backgroundColor: colors.grey[100],
    padding: theme.spacing(2),
    display: 'flex',
    justifyContent: 'center'
  },
  applyButton: {
    color: "#FFFFFF",
    backgroundColor: colors.green[600],
    '&:hover': {
      backgroundColor: colors.green[900]
    }
  },
  title: {

  },
  subTitle: {

  },
  textField: {

  }
}));

const Application = props => {
  const { author, open, onClose, rootStore, project, className, ...rest } = props;

  const [value, setValue] = useState('');

  const classes = useStyles(props);

  const handleChange = event => {
    event.persist();

    setValue(event.target.value);
  };
  const [messageSended, setMessageSended] = useState(false);
  
  const onApply = async event => {
    let message = await dAppInt.sendMessage(project.uuid, project.author.address, value, project.author.publicKey, Date.now(), rootStore.user.getWavesKeeper)
    if (message) {
      await rootStore.user.updateStorage()
      setValue('')
      setMessageSended(true)
    }
  };

  if (messageSended) {
    //console.log('taskCreated')
    return <Redirect to={`/chat`} />
  }


  const handleBrokenImage = e => (e.target.src = "/img/gag.png");
  return (
    <Dialog
      maxWidth="lg"
      onClose={onClose}
      open={open}
    >
      <ValidatorForm onSubmit={onApply} onError={errors => console.log(errors)}
        {...rest}
        className={clsx(classes.root, className)}
      >
        <div className={classes.header}>
          <Typography
            align="center"
            className={classes.title}
            gutterBottom
            variant="h3"
          >
            The project owner requires an introduction
          </Typography>
          <Typography
            align="center"
            className={classes.subTitle}
            variant="subtitle2"
          >
            Write down a short note with your application regarding why you
            think you'd be a good fit for this task.
          </Typography>
        </div>
        <div className={classes.content}>
          <TextValidator
            autoFocus
            className={classes.textField}
            // eslint-disable-next-line react/jsx-sort-props
            FormHelperTextProps={{ classes: { root: classes.helperText } }}
            fullWidth
            helperText={`${200 - value.length} characters left`}
            label="Short Note"
            multiline
            onChange={handleChange}
            placeholder="Tell the customer about yourself"
            validators={['required', 'minStringLength:20', 'maxStringLength:200', 'trim']}
              errorMessages={['This field is required', 'Minimum 20 characters', 'Maximum 200 characters', 'Please enter words']}
            rows={5}
            value={value}
            variant="outlined"
          />
          <div className={classes.author}>
            <Avatar
              alt="Author"
              className={classes.avatar}
              src={author.avatar || ""}
              imgProps={{ onError: handleBrokenImage }}
            >
              {author.name ? author.name : ""}
            </Avatar>
            <div>
              <Typography variant="h3">{author ? author.name : "Undefined"}</Typography>
              <Typography variant="subtitle2">{author ? author.bio : "Undefined"}</Typography>
            </div>
          </div>
        </div>
        <div className={classes.actions}>
          <Button
            className={classes.applyButton}
            variant="contained"
            type="submit"
          >
            Apply for a role
          </Button>
        </div>
      </ValidatorForm>
    </Dialog>
  );
};

export default Application;
