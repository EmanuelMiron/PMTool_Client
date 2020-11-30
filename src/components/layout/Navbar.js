import React, { useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import isAuthenticated from '../../helpers/isAuthenticated';

// Material UI Components
import AppBar from '@material-ui/core/AppBar';
import ToolBar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';



const useStyles = makeStyles((theme) => ({
	title: {
		flexGrow: 1,
	},
	button: {
        marginRight: '0.5rem',
        textTransform: 'none',
	},
}));

const Navbar = () => {
    const classes = useStyles();
    
    const [currentUser, setCurrentUser] = useState("");

    useEffect(() => {

        const user = JSON.parse(localStorage.getItem('user'));
        
        if(user){
            setCurrentUser(user);
        }
        
    }, [])

    const logout = () => {
        localStorage.removeItem('user');
        setCurrentUser("");
    }
    
	return (
		<AppBar position="absolute">
			<ToolBar>
				<Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
					PM Tool
				</Typography>
				{isAuthenticated() ? (
					<>
						<Button className={classes.button} color="primary" variant="contained">
							{currentUser.username}
						</Button>
						<Button style={{ color: 'white' }} onClick={logout}>Logout</Button>
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
