import React from 'react'
import { makeStyles } from '@material-ui/core/styles';

// Material UI Components
import AppBar from '@material-ui/core/AppBar';
import ToolBar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
    title: {
        flexGrow: 1,
    },
    button : {
        marginRight: '0.5rem'
    }
}))

const Navbar = () => {
    const classes = useStyles();
    return (
        <AppBar position="absolute">
            <ToolBar>
                <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
                    PM Tool
                </Typography>
                <Button className={classes.button} variant="contained" href="/login">Login</Button> 
                <Button variant="contained" color="secondary" href="/register">Register</Button> 
            </ToolBar>
        </AppBar>
    )
}

export default Navbar;