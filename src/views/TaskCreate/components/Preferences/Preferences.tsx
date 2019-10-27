import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import {
  Card,
  CardHeader,
  CardContent,
  Typography,
  FormControlLabel,
  Checkbox
} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {},
  options: {
    marginTop: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column'
  }
}));

const Preferences = props => {
  const { className, ...rest } = props;

  const classes = useStyles(1);

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <CardHeader title="Preferences" />
      <CardContent>
        <Typography
          gutterBottom
          variant="h6"
        >
          Privacy
        </Typography>
        <Typography variant="body2">
          You will recieve emails in your business email address
        </Typography>
        <div className={classes.options}>
          <FormControlLabel
            control={
              <Checkbox
                color="primary"
                defaultChecked //
              />
            }
            label="Allow teamates invite others"
          />
          <FormControlLabel
            control={
              <Checkbox
                color="primary"
                defaultChecked //
              />
            }
            label="Private Project"
          />
        </div>
      </CardContent>
    </Card>
  );
};

Preferences.propTypes = {
  className: PropTypes.string
};

export default Preferences;
