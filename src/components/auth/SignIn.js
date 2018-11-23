import React, {Component} from 'react';
import SigninContent from './SigninContent';
import {connect} from 'react-redux';
import {startSignIn} from '../../actions/auth';
import {removeError} from '../../actions/error';
import {validateSignIn} from '../../services/validateForm';

const SignIn = class SignIn extends Component {
    constructor(props) {
        super(props);
        this.state ={
            signin: true,
            firstNameErr: null,
            lastNameErr: null,
            emailErr: null,
            passwordErr: null,
            authErr: null
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
        if (this.state.signin) {
            const signInValid = validateSignIn(formProps);
            console.log(signInValid)
            if (signInValid === true) {
                this.props.startSignIn(formProps, () => {
                    this.props.history.push('/');
                });
                // signInResponse.then((res) => {
                //     if(res.authErr !== undefined) this.setState({authErr: res.authErr});
                // })
                
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
                        <a className="link">SIGN UP</a>
                    </div>
                    <div className="form-container">
                        <form className="form" onSubmit={this.onSubmit}>
                            <SigninContent 
                                state={this.state}
                                handleEmail={this.handleEmail}
                                signin={signin}>
                            </SigninContent> 
                        </form>
                    </div>
                    
                </div>
            </div>
                
            </div>
        )
    }
}
const mapDispatchToProps = ((dispatch) => ({
        startSignIn: (formProps, callback) => dispatch(startSignIn(formProps, callback)),
        removeError: () => dispatch(removeError())

    })
);
const stateToProps = (state) => {
	return {
        errorMsg: state.errors,
        auth: state.auth
	}
}
export default connect(stateToProps, mapDispatchToProps)(SignIn);