import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { validateLogin } from '../helpers/validators';
import { login } from '../services/auth.service';
import { Redirect } from 'react-router-dom';
import isAuthenticated from '../helpers/isAuthenticated';
import Navbar from './layout/Navbar';

// Material UI Components
import Container from '@material-ui/core/Container';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import Alert from '@material-ui/lab/Alert';

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
		marginTop: theme.spacing(1),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
	alert: {
		width: '100%',
	},
}));

const Login = () => {
	const classes = useStyles();

	const defaultFormState = { value: '', errorState: false, errorHelperText: '' };

	const [email, setEmail] = useState(defaultFormState);
	const [password, setPassword] = useState(defaultFormState);
	const [loginSuccessfully, setLoginSuccessfully] = useState(false);
	const [message, setMessage] = useState('');

	const handleEmailChange = (event) => {
		const newEmail = event.target.value;
		setEmail({ ...email, value: newEmail });
	};

	const handlePasswordChange = (event) => {
		const newPassword = event.target.value;
		setPassword({ ...password, value: newPassword });
	};

	const validateEntry = (event) => {
		const error = validateLogin(event);

		switch (event.target.id) {
			case 'email':
				error.state
					? setEmail({ ...email, errorState: true, helperText: error.message })
					: setEmail({ ...email, errorState: false, helperText: '' });
				break;
			case 'password':
				error.state
					? setPassword({ ...password, errorState: true, helperText: error.message })
					: setPassword({ ...password, errorState: false, helperText: '' });
				break;

			default:
				break;
		}
	};

	const handleLogin = async (event) => {
		event.preventDefault();

		// Send request to api/auth/login
		const data = await login(email.value, password.value);

		if (data.status === 200) {
			setLoginSuccessfully(true);
			setEmail(defaultFormState);
			setPassword(defaultFormState);
		} else {
			setLoginSuccessfully(false);
			setMessage(data.message);
		}
	};

	return (
		<>
			<Navbar />
			{isAuthenticated() ? (
				<Redirect to="/" />
			) : (
				<Container component="main" maxWidth="xs">
					<div className={classes.paper}>
						<Avatar className={classes.avatar}>
							<LockOutlinedIcon />
						</Avatar>
						<Typography component="h1" variant="h4">
							Login
						</Typography>
						{!loginSuccessfully && message && (
							<Alert className={classes.alert} severity="error">
								<strong>{message}</strong>
							</Alert>
						)}
						<form className={classes.form} onSubmit={handleLogin}>
							<TextField
								error={email.errorState}
								helperText={email.helperText}
								variant="outlined"
								margin="normal"
								required
								fullWidth
								id="email"
								label="Email Address"
								autoComplete="email"
								autoFocus
								value={email.value}
								onChange={handleEmailChange}
								onBlur={validateEntry}
							/>
							<TextField
								error={password.errorState}
								helperText={password.helperText}
								variant="outlined"
								margin="normal"
								required
								fullWidth
								label="Password"
								id="password"
								type="password"
								value={password.value}
								onChange={handlePasswordChange}
								onBlur={validateEntry}
							/>
							<Button
								type="submit"
								fullWidth
								variant="contained"
								color="secondary"
								className={classes.submit}
							>
								Login
							</Button>
							<Grid container>
								<Grid item xs>
									<Link href="/register" variant="body2">
										{"Don't have an account? Register"}
									</Link>
								</Grid>
							</Grid>
						</form>
					</div>
				</Container>
			)}
		</>
	);
};

export default Login;
