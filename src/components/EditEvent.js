import React, {Component} from 'react';
import DatePicker from './materialui/Datepicker';
import moment from 'moment';
import Timepicker from './materialui/Timepicker';
import {connect} from 'react-redux';
import RequireAuth from './RequireAuth';
import Attendees from './Attendees';
import Header from './Header';
import {startEditEvent, startDeleteEvent} from '../actions/event';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const EditEvent = class EditEvent extends Component {
    constructor(props) {
        super(props);
        const {event} = this.props.location.state;
        this.state = {
            title: event.title ? event.title : null,
            description: event.description ? event.description : null,
            capacity: event.capacity ? event.capacity : null
        }
    }
    handleBack = () => {
        this.props.history.goBack();
    }

    handleEventDelete = (eventId) => {
        this.props.startDeleteEvent(eventId, this.props.auth);
    }

    handleTitle = (e) => {
        let title = e.target.value.trim();
        this.setState(() => ({title}));
    }

    handleDescription = (e) => {
        let description = e.target.value.trim();
        this.setState(() => ({description}));
    }

    handleCapacity = (e) => {
        let capacity = e.target.value.trim();
        if (parseInt(capacity) > 1) {
            this.setState(() => ({capacity}));
        }
    }

    onSubmit = (e) => {
        e.preventDefault();
        const date = e.target.date.value;
        const time = e.target.time.value;
        const TZOffsetHours = moment().toDate().getTimezoneOffset()/60;
        let utcDate = moment(date + ' ' + time, 'YYYY/MM/DD HH:mm').add(TZOffsetHours, 'hours').toDate();
        const editedEvent = {
            id: this.props.location.state.event._id,
            title: e.target.title.value.trim(),
            description: e.target.description.value.trim(),
            capacity: e.target.capacity.value.trim(),
            date: utcDate
        }
        this.props.startEditEvent(editedEvent);
    }
    render() {
        const {event} = this.props.location.state;
        const eventDate = moment(event.date).format("YYYY-MM-DD");
        const eventTime = moment(event.date).format("hh:mm");
        return (
            <div>
                <Header />
                <div className="edit-btn-container">
                    <button className="sbtn" onClick={this.handleBack}>back</button>
                    <a className="del" onClick={() => this.handleEventDelete(event._id)}>
                    <FontAwesomeIcon className="icon" icon="trash-alt"/>
                    DELETE EVENT</a>
                </div>
                <div className="edit-container">
                    <form className="edit-form" onSubmit={this.onSubmit}>
                        <input className="input" name="title" value={this.state.title} onChange={this.handleTitle}></input>
                        <input className="input" name="capacity" value={this.state.capacity} onChange={this.handleCapacity}></input>
                        <input className="input" name="description" value={this.state.description} onChange={this.handleDescription}></input>
                        <Timepicker name="time" eventTime={eventTime} disablePast={true} />
                        <DatePicker name="date" eventDate={eventDate} disablePast={true} />
                        <button className="btn">Save</button>
                    </form>
                    <Attendees attendees={event.attendees}/>
                </div>
                
            </div>
        )
    }
}

const mapDispatchToProps = ((dispatch) => ({
    startDeleteEvent: (event, auth) => dispatch(startDeleteEvent(event,)),
    startEditEvent: (editedEvent) => dispatch(startEditEvent(editedEvent))
}));

const mapStateToProps = ((state) => ({
    auth: state.auth
}));

export default RequireAuth(connect(mapStateToProps, mapDispatchToProps)(EditEvent));