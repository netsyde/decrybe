import React, { useState } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { observer } from 'mobx-react';
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Grid,
  FormControlLabel,
  Checkbox,
  Typography,
  Button,
  Divider,
  colors,
  Switch
} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {},
  item: {
    display: 'flex',
    flexDirection: 'column'
  },
  saveButton: {
    color: "#ffffff",
    backgroundColor: colors.green[600],
    '&:hover': {
      backgroundColor: colors.green[900]
    }
  }
}));

const Other = observer((props) => {
  const { className, rootStore, ...rest } = props;

  const classes = useStyles(props);

  const [state, setState] = useState({
    isDark: false
  });
  const handleChange = name => event => {
    //setState({ ...state, [name]: event.target.checked });
    rootStore.user.setTheme(event.target.checked)
  };

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <CardHeader title="Other" />
      <Divider />
      <CardContent>
        <form>
          <Grid
            container
            spacing={6}
            wrap="wrap"
          >
            <Grid
              item
              md={6}
              xs={12}
            >
              <Typography variant="h6">Dark mode</Typography>
              <Typography variant="body2">
                Enables dark site theme
              </Typography>
              <Switch
                checked={rootStore.user.getTheme}
                color="secondary"
                edge="start"
                name="canHire"
                onChange={handleChange('isDark')}
              />
            </Grid>
          </Grid>
        </form>
      </CardContent>
      <Divider />
      <CardActions>
        <Button
          className={classes.saveButton}
          variant="contained"
        >
          Save changes
        </Button>
      </CardActions>
    </Card>
  );
});

export default Other;
