import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { validateRegister } from '../helpers/validators';
import { register } from '../services/auth.service';

// Material UI Components
import Container from '@material-ui/core/Container';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';

// Material UI Icons
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

const useStyles = makeStyles((theme) => ({
	paper: {
		marginTop: theme.spacing(10),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.secondary.main,
	},
	form: {
		width: '100%',
		marginTop: theme.spacing(3),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
}));

const Register = () => {
	const classes = useStyles();

	const defaultFormState = { value: '', errorState: false, errorHelperText: '' };

	const [firstName, setFirstName] = useState(defaultFormState);
	const [lastName, setLastName] = useState(defaultFormState);
	const [email, setEmail] = useState(defaultFormState);
	const [password, setPassword] = useState(defaultFormState);
	const [confirmPassword, setConfirmPassword] = useState(defaultFormState);

	const handleFirstNameChange = (event) => {
		const newFirstName = event.target.value;
		setFirstName({ ...firstName, value: newFirstName });
	};

	const handleLastNameChange = (event) => {
		const newLastName = event.target.value;
		setLastName({ ...lastName, value: newLastName });
	};

	const handleEmailChange = (event) => {
		const newEmail = event.target.value;
		setEmail({ ...email, value: newEmail });
	};

	const handlePasswordChange = (event) => {
		const newPassword = event.target.value;
		setPassword({ ...password, value: newPassword });
	};

	const handleConfirmPasswordChange = (event) => {
		const newConfirmPassword = event.target.value;
		setConfirmPassword({ ...confirmPassword, value: newConfirmPassword });
	};

	const validateEntry = (event) => {
		const error = validateRegister(event, password.value);

		switch (event.target.id) {
			case 'firstName':
				error.state
					? setFirstName({ ...firstName, errorState: true, errorHelperText: error.message })
					: setFirstName({ ...firstName, errorState: false, errorHelperText: '' });
				break;
			case 'lastName':
				error.state
					? setLastName({ ...lastName, errorState: true, errorHelperText: error.message })
					: setLastName({ ...lastName, errorState: false, errorHelperText: '' });
				break;
			case 'email':
				error.state
					? setEmail({ ...email, errorState: true, errorHelperText: error.message })
					: setEmail({ ...email, errorState: false, errorHelperText: '' });
				break;
			case 'password':
				error.state
					? setPassword({ ...password, errorState: true, errorHelperText: error.message })
					: setPassword({ ...password, errorState: false, errorHelperText: '' });
				break;
			case 'confirmPassword':
				error.state
					? setConfirmPassword({ ...confirmPassword, errorState: true, errorHelperText: error.message })
					: setConfirmPassword({ ...confirmPassword, errorState: false, errorHelperText: '' });
				break;
			default:
				break;
		}
	};

	const handleRegister = (event) => {
		event.preventDefault();

		const newUser = {
			firstName: firstName.value,
			lastName: lastName.value,
			email: email.value,
			password: password.value
		}

		// Send request to api/auth/register
		register(newUser);

		// Reset form values
		setFirstName(defaultFormState);
		setLastName(defaultFormState);
		setEmail(defaultFormState);
		setPassword(defaultFormState);
		setConfirmPassword(defaultFormState);
	};

	return (
		<Container component="main" maxWidth="xs">
			<div className={classes.paper}>
				<Avatar className={classes.avatar}>
					<LockOutlinedIcon />
				</Avatar>
				<Typography component="h1" variant="h4">
					Register
				</Typography>
				<form className={classes.form} onSubmit={handleRegister}>
					<Grid container spacing={2}>
						<Grid item xs={12} sm={6}>
							<TextField
								error={firstName.errorState}
								helperText={firstName.errorHelperText}
								autoComplete="fname"
								variant="outlined"
								required
								fullWidth
								id="firstName"
								label="First Name"
								autoFocus
								value={firstName.value}
								onChange={handleFirstNameChange}
								onBlur={validateEntry}
							/>
						</Grid>
						<Grid item xs={12} sm={6}>
							<TextField
								error={lastName.errorState}
								helperText={lastName.errorHelperText}
								variant="outlined"
								required
								fullWidth
								id="lastName"
								label="Last Name"
								autoComplete="lname"
								value={lastName.value}
								onChange={handleLastNameChange}
								onBlur={validateEntry}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								error={email.errorState}
								helperText={email.errorHelperText}
								variant="outlined"
								required
								fullWidth
								id="email"
								label="Email Address"
								autoComplete="email"
								value={email.value}
								onChange={handleEmailChange}
								onBlur={validateEntry}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								error={password.errorState}
								helperText={password.errorHelperText}
								variant="outlined"
								required
								fullWidth
								label="Password"
								type="password"
								id="password"
								autoComplete="current-password"
								value={password.value}
								onChange={handlePasswordChange}
								onBlur={validateEntry}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								error={confirmPassword.errorState}
								helperText={confirmPassword.errorHelperText}
								variant="outlined"
								required
								fullWidth
								label="Confirm Password"
								type="password"
								id="confirmPassword"
								value={confirmPassword.value}
								onChange={handleConfirmPasswordChange}
								onBlur={validateEntry}
							/>
						</Grid>
					</Grid>
					<Button type="submit" fullWidth variant="contained" color="secondary" className={classes.submit}>
						Register
					</Button>
					<Grid container justify="flex-end">
						<Grid item>
							<Link href="/login" variant="body2">
								Already have an account? Login
							</Link>
						</Grid>
					</Grid>
				</form>
			</div>
		</Container>
	);
};

export default Register;
