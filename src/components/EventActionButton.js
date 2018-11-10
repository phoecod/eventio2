import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import {editEventAssociation} from '../actions/event';
import RequireAuth from './RequireAuth';

const EventActionButton = class EventActionButton extends Component {
    constructor(props) {
        super(props);

        this.state = {
            edit: false,
            joined: false
        }
    }

    onClick = (e) => {        
        var currentUser = this.props.userId;
        if(this.state.edit) {
            this.props.history.push({
                pathname: "/editevent",
                state: { event: this.props.displayEvent }
            });
        } else {
            let userIds = this.props.displayEvent.users.map((user) => {
                return user._id;
            });
            if (this.state.joined) {
                const modifiedUsers = userIds.filter((id) => id !== this.props.userId);
                userIds = modifiedUsers;
                this.setState({joined: false});
            } else {
                userIds.push(this.props.userId);
                this.setState({joined: true});
            }

            this.props.editEventAssociation(this.props.displayEvent._id, userIds, currentUser, this.state.joined);

        }
    }

    componentDidMount = () => {
        const event = this.props.displayEvent;
        if (event.host._id === this.props.userId)  {
            this.setState({ edit: true});
        } else {
            event.users.map((user) => {
                if (user._id === this.props.userId) {
                   return this.setState({joined: true});
                } else {
                   return this.setState({join: false});
                }
            });
        }

    }
    render() {
        const text = this.state.edit ? "EDIT" : this.state.joined ? "LEAVE" : "JOIN";
        return (
            <Fragment>   
                <button className={this.state.edit ? "btn-edit" : this.state.joined ? "btn-leave" : "btn-join"}
                 value={text} 
                 onClick={this.onClick}>
                 {text}
                </button>
            </Fragment>
        )
    }
}

const stateToProps = (state) => {
    const currentUserId = state.user !== null ?   state.user.id : null
    return {
        userId: currentUserId
    }
}

const mapDispatchToProps = (dispatch) => {
    return ({
        editEventAssociation: (eventId, users, currentUser, joinedEvent) => dispatch(editEventAssociation(eventId, users, currentUser, joinedEvent))
    })
}
const connectedRouterButton = connect(stateToProps, mapDispatchToProps)(EventActionButton);
export default RequireAuth(connectedRouterButton);