import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import * as dAppInt from '../../../../modules/dAppInt'

const useStyles = makeStyles(theme => ({
  container: {
		maxWidth: 480
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
  dense: {
    marginTop: 19,
  },
  menu: {
    width: 200,
  },
}));

const currencies = [
  {
    value: 'USA',
    label: 'USA',
  },
  {
    value: 'Russia',
    label: 'Russia',
  },
  {
    value: 'Ukraine',
    label: 'Ukraine',
  },
  {
    value: 'Other',
    label: 'Other',
  },
];

const Signup = props => {
  const { className, rootStore } = props;
	const classes = useStyles(1);
  const [open, setOpen] = React.useState(true);

	const [values, setValues] = React.useState({
    name: '',
    bio: '',
    location: '',
    telegram: "",
    avatar: ""
	});

  const handleClose = () => {
    console.log("Close")
    setOpen(false);
	};
	
	const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };
  async function sign(values) {
    console.log(`${values.name} ${values.bio} ${values.location} ${values.telegram}`)
    if (values.name && values.bio && values.location && values.avatar) {
      let data = {
        name: values.name,
        bio: values.bio,
        location: values.location,
        tags: [],
        address: rootStore.user.getUserAddress,
        createTime: Date.now(),
        status: "registered",
        socials: {
          telegram: "",
          twitter: "",
          github: ""
        },
        avatar: values.avatar
      }
      console.log(data)
      let signTx = await dAppInt.signUp(data, rootStore.user.getWavesKeeper)
      console.log(signTx)
      if (signTx) {
        rootStore.user.actionAfterSignup()
      } else {
        console.log('tx err')
      }
      handleClose()
    } else {
      console.log('sign err')
    }
  }
  const handleSubmit = event => {
    console.log('handle')
    event.preventDefault();
    sign(values)
  };

  return (
    
      <Dialog
        open={open}
        keepMounted
        onClose={handleClose}
				aria-labelledby="form-dialog-title"	
      >
        <form onSubmit={handleSubmit}>
        <DialogTitle id="form-dialog-title">{"Welcome. Sign up."}</DialogTitle>
        <DialogContent className={classes.container}>
          <TextField
            required
            id="name"
            label="Name"
            value={values.name}
            onChange={handleChange('name')}
            placeholder="Elon Musk"
            className={classes.textField}
            margin="normal"
					/>
					<TextField
            required
						id="standard-name"
            label="Bio"
            value={values.bio}
            onChange={handleChange('bio')}
						placeholder="Cat. Programmer."
						className={classes.textField}
						margin="normal"
					/>
					
					<TextField
            required
						id="location"
						select
						label="Location"
						className={classes.textField}
						value={values.location}
						onChange={handleChange('location')}
						SelectProps={{
							MenuProps: {
								className: classes.menu,
							},
						}}
						helperText="Please select your location"
						margin="normal"
					>
						{currencies.map(option => (
							<MenuItem key={option.value} value={option.value}>
								{option.label}
							</MenuItem>
						))}
					</TextField>
					<TextField
            required
						id="avatar"
						label="Avatar"
						className={classes.textField}
						value={values.avatar}
						onChange={handleChange('avatar')}
						margin="normal"
					/>
				</DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button color="primary" type="submit">
            Sign Up
          </Button>
        </DialogActions>
        </form>
      </Dialog>
    
  );
}

export default Signup;