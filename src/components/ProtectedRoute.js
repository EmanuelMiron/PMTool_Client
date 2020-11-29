import React from 'react';
import { Redirect, Route } from 'react-router-dom';

const isAuthenticated = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    return (user && user.accessToken) ? true : false;
}

const ProtectedRoute = ({ component: Component, ...rest }) => (
	<Route
		{...rest}
		render={(props) => (isAuthenticated() ? <Component {...props} /> : <Redirect to="/login" />)}
	/>
);

export default ProtectedRoute;
