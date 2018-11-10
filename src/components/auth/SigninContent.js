import React, {Fragment} from 'react';

const SigninContent = () => {
    return (
        <Fragment >
            <div  className="title-block">
                <h2 className="title">Sign in to Eventio</h2>
                <h4 className="subtitle">details below</h4>
            </div>
                <input
                    className="input"
                    name="email"
                    type="text"
                    placeholder="Email"
                />
                <input
                    className="input"
                    name="password"
                    type="password"
                    placeholder="Password"
                />
            
            <button className="btn">Sign In</button>
        </Fragment>
    )
}

export default SigninContent;