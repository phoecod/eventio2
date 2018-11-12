import React, {Fragment, Component} from 'react';
import {connect} from 'react-redux';
import RequireAuth from './RequireAuth';
import {startAddEvent} from '../actions/event';
import DatePicker from './materialui/Datepicker';
import moment from 'moment';
import Timepicker from './materialui/Timepicker';
import Header from './Header';
import {validateEvent} from '../services/validateForm';

const CreateEvent = class CreateEvent extends Component {
    constructor (props) {
        super(props);
        this.state = {
            titleErr: null,
            descriptionErr: null,
            capacityErr: null,
            dateErr: null
        };
    }

    onSubmit = (e) => {
        e.preventDefault();
        const title = e.target.title.value.trim();
        const description = e.target.description.value.trim();
        const date = e.target.date.value.trim();
        const time = e.target.time.value.trim();
        const capacity = e.target.capacity.value.trim();
        const event = {title, description, date, time, capacity, user: this.props.user};
        const eventValid = validateEvent(event);
        if (eventValid === true) {
            this.props.startAddEvent(event);
        } else {
            if (eventValid.title !== undefined) this.setState({titleErr: eventValid.title});
            if (eventValid.description !== undefined) this.setState({descriptionErr: eventValid.description});
            if (eventValid.capacity !== undefined) this.setState({capacityErr: eventValid.capacity});
            if (eventValid.date !== undefined) this.setState({dateErr: eventValid.date});
        }
        
    }

    handleBack = () => {
        this.props.history.goBack();
    }

    render () {
        return (
            <div className="page-container">
                <Header />
                <div className="rowFlex">
                    <form className="create-form-container" onSubmit={this.onSubmit}>
                            <h3 className="title">Create new event</h3>
                            <h5 className="subtitle">Enter details below</h5>
                        {this.state.titleErr && <div className="error">{this.state.titleErr}</div>}
                        <input className="input" placeholder="Title" name="title"/>
                        {this.state.descriptionErr && <div className="error">{this.state.descriptionErr}</div>}
                        <input className="input" placeholder="Description" name="description"/>
                        {this.state.dateErr && <div className="error">{this.state.dateErr}</div>}
                        <Timepicker disablePast={true} />  
                        <DatePicker disablePast={true} />
                        {this.state.capacityErr && <div className="error">{this.state.capacityErr}</div>}  
                        <input className="input" placeholder="Capacity" name="capacity"/>
                        <div class="btn-container">
                            <button className="cr-btn">CREATE NEW EVENT</button>
                            <button className="cl-btn" onClick={this.handleBack}>CLOSE</button>
                        </div> 
                    </form>
                </div>
            </div>
        )
    }
    
}

const mapDispatchToProps = (dispatch) => ({
    startAddEvent: (event) => dispatch(startAddEvent(event))
});
const mapStateToProps = (state) => ({
    user: state.user
});
export default RequireAuth(connect(mapStateToProps, mapDispatchToProps)(CreateEvent));