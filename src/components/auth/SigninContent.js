import React, {Fragment} from 'react';
import FormTitleBlock from './FormTitleBlock';

const SigninContent = (props) => {
    return (
        <Fragment >
            <FormTitleBlock signin={props.signin}/>
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