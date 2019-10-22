import React from 'react'
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import Button from '@material-ui/core/Button';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';

const useStyles = makeStyles(theme => ({
  root: {
		display: "flex",
		justifyContent: "center",
		padding: theme.spacing(5),
	},
	paper: {
		padding: theme.spacing(3, 2),
		maxWidth: 600

	},
	textField: {
    //marginLeft: theme.spacing(1),
    //marginRight: theme.spacing(1),
	},
	actions: {
		display: "flex",
		justifyContent: "flex-end",
		alignItems: "center",
		//padding: theme.spacing(2),
	},
	textFieldBox: {
		marginBottom: theme.spacing(1)
	}
}));

const TaskCreator = () => {
	const [values, setValues] = React.useState({
		title: '',
		imageLink: '',
		briefDescription: '',
		description: '',
		price: '',
		deadline: new Date('2014-08-18T21:11:54'),
    location: '',
    telegram: ""
	});

	const [selectedDate, setSelectedDate] = React.useState(new Date('2019-10-22'));

	const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
	};

	const handleDateChange = date => {
    setSelectedDate(date);
  };

	
  const classes = useStyles();
  return (
		<div className={classes.root}>
			<Paper className={classes.paper}>
				<Typography variant="h1" component="h1">
          Create task
        </Typography>
				<div className={classes.textFieldBox}>
					<Grid container spacing={3}>
						<Grid item xs={12}>
							<TextField
								required
								id="title"
								label="Task title"
								value={values.title}
								onChange={handleChange('title')}
								placeholder="Simple task"
								className={classes.textfield}
								margin="normal"
								fullWidth
							/>
						</Grid>
						<Grid item xs={4}>
							<TextField
								required
								id="price"
								label="Price"
								value={values.price}
								onChange={handleChange('price')}
								placeholder="50"
								className={classes.textField}
								margin="normal"
								type="number"
								fullWidth
							/>
						</Grid>
						<Grid item xs={4}>
							<TextField
								id="image-link"
								label="Image link"
								value={values.imageLink}
								onChange={handleChange('imageLink')}
								placeholder="https://decrybe.com/logo.png"
								className={classes.textField}
								margin="normal"
								fullWidth
							/>
						</Grid>
						<Grid item xs={4}>
							<TextField
								required
								id="brief-description"
								label="Brief description"
								value={values.briefDescription}
								onChange={handleChange('briefDescription')}
								placeholder="~ 30 symbols"
								className={classes.textField}
								margin="normal"
								fullWidth
							/>
						</Grid>
						<Grid item xs={6}>
						<MuiPickersUtilsProvider utils={DateFnsUtils}>
							<KeyboardDatePicker
								required
								fullWidth
								margin="normal"
								id="deadline"
								label="Deadline"
								format="MM/dd/yyyy"
								value={selectedDate}
								onChange={handleDateChange}
								KeyboardButtonProps={{
									'aria-label': 'change date',
								}}
							/>
							</MuiPickersUtilsProvider>
						</Grid>
						<Grid item xs={6}>
							<TextField
								required
								id="tags"
								label="Tags"
								value={values.tags}
								onChange={handleChange('tags')}
								placeholder="Comma separated tags"
								className={classes.textField}
								margin="normal"
								fullWidth
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								required
								id="description"
								label="Description"
								value={values.description}
								onChange={handleChange('description')}
								placeholder="> 100 symbols"
								className={classes.textField}
								margin="normal"
								multiline
								fullWidth
							/>
						</Grid>
						
					</Grid>
				</div>
				<div className={classes.actions}>
					<Button onClick={() => {}} variant="contained" color="primary">
							Create
					</Button>
				</div>
			</Paper>
		</div>
  )
}

export default TaskCreator;