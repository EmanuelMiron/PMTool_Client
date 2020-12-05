const isEmail = email => {
    const regEx = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (email.match(regEx)) return true;
    else return false;
}

const isEmpty = string => {
    if (string.trim() === '') return true;
    else return false;
}

export const validateRegister = (event, password) => { 
    const id = event.target.id;
    const value = event.target.value;

    let error = {};

    const checkIfValueIsEmpty = () => {
        if (isEmpty(value)) {
            error.message = 'Must not be empty'
            error.state = true
        }
    }

    switch (id) {
        case "firstName":

            // Check for maximum lenght
            checkIfValueIsEmpty();
            break;

        case "lastName":
            // Future validation
            break;
        case "email":
            if (!isEmail(value)) {
                error.message = "Must be a valid email address"
                error.state = true
            }
            checkIfValueIsEmpty();
            break;
        case "password":
            checkIfValueIsEmpty();
            break;
        case "confirmPassword":
            if(password !== value) {
                error.message = 'Passwords must match'
                error.state = true
            }
            checkIfValueIsEmpty();
            break;
        default:
            break;
    }

    return error;
}

export const validateLogin = event => {
    const id = event.target.id;
    const value = event.target.value;

    let error = {};

    const checkIfValueIsEmpty = () => {
        if (isEmpty(value)) {
            error.message = 'Must not be empty'
            error.state = true
        }
    }

    if(id === 'email'){
        checkIfValueIsEmpty();
    } else if(id === 'password'){
        checkIfValueIsEmpty();
    }

    return error;
}