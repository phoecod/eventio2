import  validator from'email-validator';
import moment from 'moment';

export const validateSignIn = (formData) => {
    const errors = {};
    if (!validator.validate(formData.email)) errors['email'] = "Invalid email format!"
    else if (formData.email.length === 0 ) errors['email'] = "Email is required!"
    if (formData.password.length === 0) errors['password'] = "You need a password, please";
    return (Object.keys(errors).length === 0 && errors.constructor === Object) ? true :  errors;
}

export const validateSignUp = (formData) => {
    const errors = {};
    if (!validator.validate(formData.email)) {errors['email'] = "Invalid email format!"
    } else if (formData.email.length === 0 ) errors['email'] = "Email is required!"
    if (formData.password.length === 0) errors['password'] = "You need a password, please";
    if (formData.firstName.length === 0) errors['firstName'] = "Sorry! you gotta have a name?";
    if (formData.lastName.length === 0) errors['lastName'] = "also a last name would help too";
    return (Object.keys(errors).length === 0 && errors.constructor === Object) ? true :  errors;
}

export const validateEvent = (formData) => {
    const errors = {};
    if (formData.title.length === 0) errors['title'] = "You need a title";
    if (formData.description.length === 0) errors['description'] =  "A description helps too";
    if (parseInt(formData.capacity) < 2) errors['capacity'] =  "we need at least 2 people, its a party man"
    const date = moment(formData.startsAt, 'YYYY/MM/DD HH:mm');
    const current = moment(Date());
    if (moment(date).isBefore(current)) errors['date'] = "Date of the event can't be in the past"
    return (Object.keys(errors).length === 0 && errors.constructor === Object) ? true :  errors;
}

const isFloat = (n) => {
    return n === +n && n !== (n|0);
}