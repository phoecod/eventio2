import React, {Fragment} from 'react';
import FormTitleBlock from './FormTitleBlock';

const SigninContent = (props) => {
    console.log(props)
    return (
        <Fragment >
            <FormTitleBlock signin={props.signin}/>
                <div className="error">{props.state.emailErr}</div>
                <input
                    className="input"
                    name="email"
                    type="text"
                    placeholder="Email"
                />
                <div className="error">{props.state.passwordErr}</div>
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