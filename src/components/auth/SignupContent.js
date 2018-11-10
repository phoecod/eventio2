import React, {Fragment} from 'react';

const SignupContent = () => {
    return (
        <Fragment >
            <div className="title-block">
                <h2 className="title">Get started absolutely free</h2>
                <h4 className="subtitle">enter your details below</h4>
            </div>
            <input
                className="input"
                name="firstName"
                type="text"
                placeholder="First Name"
            />
            <input
                className="input"
                name="lastName"
                type="text"
                placeholder="Last Name"
            />
            <input
                className="input"
                name="email"
                autoComplete="none"
                placeholder="Email"
            />
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