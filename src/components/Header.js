import React , {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import {startSignOut} from '../actions/auth';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Header = class Header extends Component {
    
    handleSignOut = () => {
        this.props.startSignOut();
    }

    handleBack = () => {
        this.props.history.goBack();
    }

    render () {
        const {user} = this.props;
        return (
            <div className="header-container">
                <h1>E.</h1>
                {this.props.location.pathname === '/eventview' && 
                    <a onClick={this.handleBack} className="back-link">
                        <FontAwesomeIcon className="icon" icon="arrow-left" />Back to Events
                    </a>
                }
                <div className="left-container">
                    <div className="circle">{user !== null ? `${user.firstName[0]}${user.lastName[0]}` : 'NN'}</div>
                    <select className="signoutSelect">
                        <option selected>{user !== null ? user.firstName + " " + user.lastName : "None"}</option>
                        <option onClick={() => this.handleSignOut()}>Sign out</option>
                    </select>
                </div>
            </div>
        )  
    }
    
}
const mapStateToProps = (state) => {
    let user = state.user !== null ? state.user : null
    return ({
        user
    })
}
const mapDispatchToProps = (dispatch) => ({
    startSignOut: () => startSignOut(dispatch)
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));