import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/styles';
import {
  Button,
  Checkbox,
  Typography,
  Link
} from '@material-ui/core';

import useRouter from '../../../../utils/useRouter';
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator';
import { CustomSnackbar } from '../../../../components'
import { observer, inject } from 'mobx-react';
import * as dAppInt from '../../../../modules/dAppInt'

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: theme.spacing(3)
  },
  fields: {
    margin: theme.spacing(-1),
    display: 'flex',
    flexWrap: 'wrap',
    '& > *': {
      flexGrow: 1,
      margin: theme.spacing(1)
    }
  },
  policy: {
    display: 'flex',
    alignItems: 'center'
  },
  policyCheckbox: {
    marginLeft: '-14px'
  },
  submitButton: {
    marginTop: theme.spacing(2),
    width: '100%'
  }
}));

const RegisterForm = inject('rootStore')(observer(({ rootStore }) => {
  const classes = useStyles();
  const { history } = useRouter();

  const [values, setValues] = React.useState({
    name: "",
    bio: "",
    avatar: "",
    checked: false
  });
  const [isValid, setValid] = React.useState(false);

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };

  const handleCheckboxChange = name => event => {
    setValues({ ...values, [name]: event.target.checked });
  };

  let formRef = React.createRef();

  const handleSubmit = async (event) => {
    event.preventDefault();
    let api = await rootStore.user.getWavesKeeper.initialPromise
    if (api) {
      const state = await rootStore.user.getWavesKeeper.publicState();
      let data = {
        name: values.name,
        bio: values.bio,
        location: "",
        tags: [],
        address: state.account.address,
        publicKey: state.account.publicKey,
        createTime: Date.now(),
        status: "registered",
        socials: {
          telegram: "",
          twitter: "",
          github: ""
        },
        avatar: values.avatar
      }
      //console.log(data)

      let signTx = await dAppInt.signUp(data, rootStore.user.getWavesKeeper)
      if (signTx.status) {
        createSnackbar('success', 'You have successfully registered!')
        rootStore.user.actionAfterSignup()
        history.push('/')
      } else {
        createSnackbar('error', signTx.error.data ? signTx.error.data : signTx.error.message)
      }
    } else {
      console.log('DEBUG: Waves Keeper is ndefined')
    }
  };

  let validatorListener = async () => {
    const valid = await formRef.current.isFormValid();
    setValid(valid)
  }

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

  return (
    <ValidatorForm onSubmit={handleSubmit} onError={errors => console.log(errors)}
      className={classes.root}
      ref={formRef}
    >
      <div className={classes.fields}>
        <TextValidator
          label="Name"
          name="name"
          variant="outlined"
          helperText="Your nickname"
          onChange={handleChange('name')}
          value={values.name}
          validators={['required', 'minStringLength:3', 'maxStringLength:15', 'trim']}
          errorMessages={['This field is required', 'Minimum 3 characters', 'Maximum 15 characters', 'Please enter words']}
          validatorListener={validatorListener}
        />
        <TextValidator
          label="Bio"
          name="bio"
          helperText="Any information about you (70 characters)"
          variant="outlined"
          onChange={handleChange('bio')}
          value={values.bio}
          validators={['required', 'minStringLength:5', 'maxStringLength:70', 'trim']}
          errorMessages={['This field is required', 'Minimum 5 characters', 'Maximum 70 characters', 'Please enter words']}
          validatorListener={validatorListener}
        />
        <TextValidator
          label="Avatar"
          name="avatar"
          variant="outlined"
          helperText="Please enter only https link"
          onChange={handleChange('avatar')}
          value={values.avatar}
          validators={['matchRegexp:^https://']}
          errorMessages={['Use only https link']}
          validatorListener={validatorListener}
        />
        <div>
          <div className={classes.policy}>
            <Checkbox
              checked={values.checked}
              className={classes.policyCheckbox}
              value="checked"
              color="primary"
              name="policy"
              onChange={handleCheckboxChange('checked')}
            />
            <Typography
              color="textSecondary"
              variant="body1"
            >
              I have read the{' '}
              <Link
                color="secondary"
                component={RouterLink}
                to="/register/terms"
                underline="always"
                variant="h6"
                target="_blank"
              >
                Terms and Conditions
              </Link>
            </Typography>
          </div>
        </div>
      </div>
      <Button
        className={classes.submitButton}
        color="secondary"
        disabled={!isValid || !values.checked}
        size="large"
        type="submit"
        variant="contained"
      >
        Create account
      </Button>
      <CustomSnackbar
          onClose={handleSnackbarClose}
          open={openSnackbar}
          message={snackbarMessage}
          type={snackbarType}
      />
      </ValidatorForm>
  );
}));

export default RegisterForm;
