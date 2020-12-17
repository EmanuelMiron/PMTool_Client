import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import isAuthenticated from '../../helpers/isAuthenticated';
import { drawerWidth } from './Dashboard';
import clsx from 'clsx';

// Material UI Components
import AppBar from '@material-ui/core/AppBar';
import ToolBar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';

// Material UI Icons
import MenuIcon from '@material-ui/icons/Menu'; 

const useStyles = makeStyles((theme) => ({
	title: {
		flexGrow: 1,
	},
	button: {
		marginRight: '0.5rem',
		textTransform: 'none',
	},
	menuButton: {
		marginRight: 36,
	},
	hide: {
		display: 'none',
	},
	appBar: {
		zIndex: theme.zIndex.drawer + 1,
		transition: theme.transitions.create(['width', 'margin'], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
	},
	appBarShift: {
		marginLeft: drawerWidth,
		width: `calc(100% - ${drawerWidth}px)`,
		transition: theme.transitions.create(['width', 'margin'], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen,
		}),
	},
}));

const Navbar = (props) => {
	const { open, openDrawer } = props;
	const classes = useStyles();

	const [currentUser, setCurrentUser] = useState('');

	useEffect(() => {
		const user = JSON.parse(localStorage.getItem('user'));

		if (user) {
			setCurrentUser(user);
		}
	}, []);

	const logout = () => {
		localStorage.removeItem('user');
		setCurrentUser('');
	};

	return (
		<AppBar
			position="fixed"
			className={clsx(classes.appBar, {
				[classes.appBarShift]: open,
			})}
		>
			<ToolBar>
				<IconButton
					color="inherit"
					aria-label="open drawer"
					onClick={openDrawer}
					edge="start"
					className={clsx(classes.menuButton, {
						[classes.hide]: open,
					})}
				>
					<MenuIcon />
				</IconButton>
				<Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
					PM Tool
				</Typography>
				{isAuthenticated() ? (
					<>
						<Button className={classes.button} color="primary" variant="contained">
							{currentUser.firstName}
						</Button>
						<Button className={classes.button} style={{ color: 'white' }} onClick={logout}>
							Logout
						</Button>
					</>
				) : (
					<>
						<Button className={classes.button} variant="contained" href="/login">
							Login
						</Button>
						<Button variant="contained" color="secondary" href="/register">
							Register
						</Button>
					</>
				)}
			</ToolBar>
		</AppBar>
	);
};

export default Navbar;
