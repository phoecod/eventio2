import React, {Fragment} from 'react';
import FormTitleBlock from './FormTitleBlock';

const SignupContent = ({state, signin, authErr}) => {
    return (
        <Fragment >
            <FormTitleBlock signin={signin}/>
            <div className="error">{authErr}</div>
            <div className="error">{state.firstNameErr}</div>
            <input
                className="input"
                name="firstName"
                type="text"
                placeholder="First Name"
            />
            <div className="error">{state.lastNameErr}</div>
            <input
                className="input"
                name="lastName"
                type="text"
                placeholder="Last Name"
            />
            <div className="error">{state.emailErr}</div>
            <input
                className="input"
                name="email"
                autoComplete="none"
                placeholder="Email"
            />
            <div className="error">{state.passwordErr}</div>
            <input
                className="input"
                name="password"
                autoComplete="none"
                type="password"
                placeholder="Password"
            />
            <button className="btn">Sign Up</button>
        </Fragment>
    )
}

export default SignupContent;