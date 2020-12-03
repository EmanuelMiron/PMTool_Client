import axios from 'axios';
const API_URL = process.env.REACT_APP_API_URL;

export const login = (email, password) => {
    return axios.post(API_URL + "auth/login/", {
        email,
        password
    })
    .then( response => {
        if(response.data.accessToken){
            localStorage.setItem("user", JSON.stringify(response.data));
        }
        return response.data
    })
    .catch(err => {
        console.error(err);
    })
}

export const register = newUser => {
    return axios.post(API_URL + "auth/register/", newUser)
        .then( response => {
            console.log(response.data.message);
        })
        .catch(err => {
            console.error(err);
        })
}