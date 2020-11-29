const isAuthenticated = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    return (user && user.accessToken) ? true : false;
}

export default isAuthenticated;