import React, {Fragment, Component} from 'react';
import {connect} from 'react-redux';
import RequireAuth from './RequireAuth';
import {startAddEvent} from '../actions/event';
import DatePicker from './materialui/Datepicker';
import moment from 'moment';
import Timepicker from './materialui/Timepicker';
import Header from './Header';

const CreateEvent = class CreateEvent extends Component {
    constructor (props) {
        super(props);
        this.state = {
            startDate: moment()
        };
    }

    handleChange = (date) => {
        this.setState({
          startDate: date
        });
    }
    onSubmit = (e) => {
        e.preventDefault();
        const title = e.target.title.value;
        const description = e.target.description.value;
        const date = e.target.date.value;
        const time = e.target.time.value;
        const capacity = e.target.capacity.value;
        const event = {title, description, date, time, capacity, user: this.props.user};
        this.props.startAddEvent(event);
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
                        <input className="input" placeholder="Title" name="title"/>
                        <input className="input" placeholder="Description" name="description"/>
                        <Timepicker disablePast={true} />  
                        <DatePicker disablePast={true} />  
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