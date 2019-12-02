import React, { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import validate from 'validate.js';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import {
  Button,
  Checkbox,
  FormHelperText,
  TextField,
  Typography,
  Link
} from '@material-ui/core';

import useRouter from '../../../../utils/useRouter';

const schema = {
  firstName: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      maximum: 32
    }
  },
  lastName: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      maximum: 32
    }
  },
  email: {
    presence: { allowEmpty: false, message: 'is required' },
    email: true,
    length: {
      maximum: 64
    }
  },
  password: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      maximum: 128
    }
  },
  policy: {
    presence: { allowEmpty: false, message: 'is required' },
    checked: true
  }
};

const useStyles = makeStyles(theme => ({
  root: {},
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
const RegisterForm = props => {
  const { className, ...rest } = props;

  const classes = useStyles();
  const { history } = useRouter();

  const [formState, setFormState] = useState({
    isValid: false,
    values: {},
    touched: {},
    errors: {}
  });

  return (
    <form
      {...rest}
      className={clsx(classes.root, className)}
      //onSubmit={handleSubmit}
    >
      <div className={classes.fields}>
        <TextField
          //error={hasError('firstName')}
          /*
          helperText={
            hasError('firstName') ? formState.errors.firstName[0] : null
          }
          */
          label="Name"
          name="name"
          //onChange={handleChange}
          //value={formState.values.firstName || ''}
          variant="outlined"
        />
        <TextField
          //error={hasError('lastName')}
          /*
          helperText={
            hasError('lastName') ? formState.errors.lastName[0] : null
          }
          */
          label="Bio"
          name="bio"
          //onChange={handleChange}
          //value={formState.values.lastName || ''}
          variant="outlined"
        />
        <TextField
          //error={hasError('email')}
          fullWidth
         // helperText={hasError('email') ? formState.errors.email[0] : null}
          label="Email address"
          name="email"
          //onChange={handleChange}
          //value={formState.values.email || ''}
          variant="outlined"
        />
        <TextField
          //error={hasError('password')}
          fullWidth
          /*
          helperText={
            hasError('password') ? formState.errors.password[0] : null
          }
          */
          label="Password"
          name="password"
          //onChange={handleChange}
          type="password"
          //value={formState.values.password || ''}
          variant="outlined"
        />
        <div>
          <div className={classes.policy}>
            <Checkbox
              checked={false}
              className={classes.policyCheckbox}
              color="primary"
              name="policy"
              //onChange={handleChange}
            />
            <Typography
              color="textSecondary"
              variant="body1"
            >
              I have read the{' '}
              <Link
                color="secondary"
                component={RouterLink}
                to="#"
                underline="always"
                variant="h6"
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
        //disabled={!formState.isValid}
        size="large"
        type="submit"
        variant="contained"
      >
        Create account
      </Button>
    </form>
  );
};

RegisterForm.propTypes = {
  className: PropTypes.string
};

export default RegisterForm;
