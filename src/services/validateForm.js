import  validator from'email-validator';

export const validateSignIn = (formData) => {
    const errors = {};
    if (validator.validate(formData.email)) errors['email'] = "Invalid email format!"
    else if (formData.email.length === 0 ) errors['email'] = "Email is required!"
    if (formData.password.length < 4) errors['password'] = "Password needs to be longer than 3 chars";
    return (Object.keys(errors).length === 0 && errors.constructor === Object) ? true :  errors;
}

export const validateSignUp = (formData) => {
    const errors = {};
    console.log(formData.email);
    if (!validator.validate(formData.email)) {errors['email'] = "Invalid email format!"
    } else if (formData.email.length === 0 ) errors['email'] = "Email is required!"
    if (formData.password.length < 4) errors['password'] = "Password needs to be longer than 3 chars";
    if (formData.firstName.length === 0) errors['firstName'] = "Sorry! you gotta have a name?";
    if (formData.lastName.length === 0) errors['lastName'] = "also a last name would help too";
    return (Object.keys(errors).length === 0 && errors.constructor === Object) ? true :  errors;
}