import React, { useState } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import {
  Avatar,
  Button,
  Dialog,
  TextField,
  Typography,
  colors,
  RadioGroup,
  Radio,
  FormControlLabel,
  FormControl,
  FormLabel
} from '@material-ui/core';
import * as dAppInt from '../../../../../../modules/dAppInt'
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator';
import { Redirect } from 'react-router-dom';
import getInitials from '../../../../../../utils/getInitials'
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

  },
  formControl: {
    flexDirection: "row",
    display: 'flex',
    justifyContent: 'center',
    paddingBottom: theme.spacing(3),
  },
  radioGroup: {
    flexDirection: "row",
    display: 'flex',
    justifyContent: 'center'
  }
}));

const Application = props => {
  const { dispute, open, handleApplicationClose, onClose, rootStore, className, ...rest } = props;

  const [value, setValue] = useState('');
  const [valueRadio, setValueRadio] = useState('');
  const [isValid, setValid] = React.useState(false);
  const classes = useStyles(props);
  let formRef = React.createRef();
  const handleChange = event => {
    event.persist();

    setValue(event.target.value);
  };
  
  const onApply = async event => {
    let data = {
      message: value,
      createdAt: Date.now()
    }
    let tx = await dAppInt.voteTaskDispute(dispute.task, valueRadio, data, rootStore.user.getWavesKeeper)
    if (tx) {
      await rootStore.user.updateStorage()
      handleApplicationClose()
      setValue('')
      setValueRadio('')
    }
  };

  let validatorListener = async () => {
    const valid = await formRef.current.isFormValid();
    setValid(valid)
  }

  const handleChangeRadio = event => {
    setValueRadio(event.target.value);
  };

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
        ref={formRef}
      >
        <div className={classes.header}>
          <Typography
            align="center"
            className={classes.title}
            gutterBottom
            variant="h3"
          >
            Who is right in the dispute?
          </Typography>
          <Typography
            align="center"
            className={classes.subTitle}
            variant="subtitle2"
          >
            Choose a side and leave a short comment what you think about the situation.
          </Typography>
        </div>
        <div className={classes.content}>
        <FormControl component="fieldset" className={classes.formControl}>
            <RadioGroup aria-label="gender" name="gender1" value={valueRadio} className={classes.radioGroup} onChange={handleChangeRadio}>
              <FormControlLabel value="freelancer" control={<Radio />} label="Freelancer" labelPlacement="bottom"/>
              <FormControlLabel value="customer" control={<Radio />} label="Customer" labelPlacement="bottom" />
            </RadioGroup>
            </FormControl>
          <TextValidator
            autoFocus
            className={classes.textField}
            // eslint-disable-next-line react/jsx-sort-props
            FormHelperTextProps={{ classes: { root: classes.helperText } }}
            fullWidth
            helperText={`${200 - value.length} characters left`}
            label="Short сomment"
            multiline
            onChange={handleChange}
            placeholder="Short сomment"
            validators={['required', 'minStringLength:20', 'maxStringLength:200', 'trim']}
              errorMessages={['This field is required', 'Minimum 20 characters', 'Maximum 200 characters', 'Please enter words']}
            rows={5}
            value={value}
            variant="outlined"
            validatorListener={validatorListener}
          />
          <div className={classes.author}>
            <Avatar
              alt="Author"
              className={classes.avatar}
              src={rootStore.user.getUserAvatar || ""}
              imgProps={{ onError: handleBrokenImage }}
            >
              {rootStore.user.getUserName ? getInitials(rootStore.user.getUserName) : ""}
            </Avatar>
            <div>
              <Typography variant="h3">{rootStore.user.getUserName}</Typography>
              <Typography variant="subtitle2">{rootStore.user.getUserBio}</Typography>
            </div>
          </div>
        </div>
        <div className={classes.actions}>
          <Button
            className={classes.applyButton}
            variant="contained"
            type="submit"
            disabled={(!isValid || valueRadio.length == 0)}
          >
            Send
          </Button>
        </div>
      </ValidatorForm>
    </Dialog>
  );
};

export default Application;
