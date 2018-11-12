import React, {Component} from 'react';
import SigninContent from './SigninContent';
import SignupContent from './SignupContent';
import {connect} from 'react-redux';
import {startSignUp, startSignIn} from '../../actions/auth';
import {removeError} from '../../actions/error';

const SignInUp = class SignInUp extends Component {
    constructor(props) {
        super(props);
        this.state ={
            signin: true,
            firstName: null,
            lastName: null,
            email: null
        }
    }
    componentDidMount () {
        document.getElementById('root').style = 'background: white;';
    }
    componentWillUnmount () {
        document.getElementById('root').style = '';
    }
    onSubmit = (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        const formProps = {
            email,
            password
        }
        if (!this.state.signin) {
            const firstName = e.target.firstName.value;
            const lastName = e.target.lastName.value;
            formProps['firstName'] = firstName;
            formProps['lastName'] = lastName;
            this.props.startSignUp(formProps, () => {
                this.props.history.push('/');
            });
        } else {
            this.props.startSignIn(formProps, () => {
                this.props.history.push('/');
            });
        }
    }
    handleSignInOrUp = () => {
        this.props.removeError();
        this.setState((prevState) => {
            return {
                signin: !prevState.signin
            }
        });
    }
    render () {
        const {signin} = this.state; 
        return (
            <div className="signin-page-container">
            <div className="center-container">
                <img alt="star wars poster" className="image" type="image/png" src="/images/star-wars-poster.jpg"/>
                <div className="side-panel">
                    <div className="link-container">
                        <span className="pre-link">{signin ? "Don't have account? " : "Have an account? "}</span>
                        <a className="link" onClick={this.handleSignInOrUp}>{ signin ? "SIGN UP" : "SIGN IN"}</a>
                    </div>
                    <div className="form-container">
                        <form className="form" onSubmit={this.onSubmit}>
                        {this.props.errorMsg}
                            {signin  ?  <SigninContent signin={signin}></SigninContent> : <SignupContent signin={signin}></SignupContent> }
                        </form>
                    </div>
                    
                </div>
            </div>
                
            </div>
        )
    }
}
const mapDispatchToProps = ((dispatch) => ({
        startSignUp: (formProps, callback) => dispatch(startSignUp(formProps, callback)),
        startSignIn: (formProps, callback) => dispatch(startSignIn(formProps, callback)),
        removeError: () => dispatch(removeError())

    })
);
const stateToProps = (state) => {
	return {
        errorMsg: state.errorMsg,
        auth: state.auth
	}
}
export default connect(stateToProps, mapDispatchToProps)(SignInUp);