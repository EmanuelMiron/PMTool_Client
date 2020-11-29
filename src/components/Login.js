import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

// Material UI Components
import Container from '@material-ui/core/Container';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
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
		marginTop: theme.spacing(1),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
}));

const Login = () => {
	const classes = useStyles();

	return (
		<Container component="main" maxWidth="xs">
			<div className={classes.paper}>
				<Avatar className={classes.avatar}>
					<LockOutlinedIcon />
				</Avatar>
				<Typography component="h1" variant="h4">
					Login
				</Typography>
				<form className={classes.form}>
					<TextField
						variant="outlined"
						margin="normal"
						required
						fullWidth
						id="email"
						label="Email Address"
						name="email"
						autoComplete="email"
						autoFocus
					/>
					<TextField
						variant="outlined"
						margin="normal"
						required
						fullWidth
						name="password"
						label="Password"
						id="password"
						type="password"
					/>
					<Button type="submit" fullWidth variant="contained" color="secondary" className={classes.submit}>
						Login
					</Button>
                    <Grid container>
                        <Grid item xs>
                            <Link href="/register" variant='body2'>
                            {"Don't have an account? Register"}
                            </Link>
                        </Grid>
                    </Grid>
				</form>
			</div>
		</Container>
	);
};

export default Login;
