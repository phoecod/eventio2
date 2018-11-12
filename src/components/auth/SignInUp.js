import React, {Component} from 'react';
import SigninContent from './SigninContent';
import SignupContent from './SignupContent';
import {connect} from 'react-redux';
import {startSignUp, startSignIn} from '../../actions/auth';
import {removeError} from '../../actions/error';
import {validateSignIn, validateSignUp} from '../../services/validateForm';

const SignInUp = class SignInUp extends Component {
    constructor(props) {
        super(props);
        this.state ={
            signin: true,
            firstNameErr: null,
            lastNameErr: null,
            emailErr: null,
            passwordErr: null
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
            const firstName = e.target.firstName.value.trim();
            const lastName = e.target.lastName.value.trim();
            formProps['firstName'] = firstName.trim();
            formProps['lastName'] = lastName.trim();
            const signUpValidation = validateSignUp(formProps);
            if (signUpValidation === true) {
                this.props.startSignUp(formProps, () => {
                    this.props.history.push('/');
                });
            } else {
                if (signUpValidation.password !== undefined) this.setState({passwordErr: signUpValidation.password});
                if (signUpValidation.email !== undefined) this.setState({emailErr: signUpValidation.email});
                if (signUpValidation.firstName !== undefined) this.setState({firstNameErr: signUpValidation.firstName});
                if (signUpValidation.lastName !== undefined) this.setState({lastNameErr: signUpValidation.lastName});
                this.setErrorTimeOut();
            }
            
        } else {
            const signInValid = validateSignIn(formProps);
            if (signInValid === true) {
                this.props.startSignIn(formProps, () => {
                    this.props.history.push('/');
                });
            } else {
                if (signInValid.password !== undefined) this.setState({passwordErr: signInValid.password});
                if (signInValid.email !== undefined) this.setState({emailErr: signInValid.email});
                this.setErrorTimeOut();
            }
        }
    }

    setErrorTimeOut = () => {
        setTimeout(() => { this.setState({
            firstNameErr: null,
            lastNameErr: null,
            emailErr: null,
            passwordErr: null}
        )}, 5000);
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
                            {
                            signin  ?  <SigninContent 
                                            state={this.state}
                                            handleEmail={this.handleEmail}
                                            signin={signin}></SigninContent> 
                                        : 
                                        <SignupContent
                                            state={this.state} 
                                            handleEmail={this.handleEmail}
                                            signin={signin}></SignupContent> 
                            }
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