import React, {Component} from 'react';
import {fetchEvents, fetchEventsWithDate} from '../actions/event';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {connect} from 'react-redux';
import moment from 'moment';

const DisplayBar = class DisplayBar extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            allEvent: true,
            futureEvent: false
        }
    }

    handleFetchAll = () => {
        const allEventSentinel = this.state.allEvent;
        if (!allEventSentinel) {
            this.setState({
                allEvent: true,
                futureEvent: false
            });
            this.props.fetchEvents();
        }
    }

    fetchFutureEvent = () => {
        const sentinel = this.state.futureEvent;
        if (!sentinel) {
            this.props.fetchEventsWithDate(moment.utc(),true);
            this.setState({futureEvent: true, allEvent: false});
        }
    }
    fetchPastEvent = () => {
        if (this.state.futureEvent || this.state.allEvent){
            this.setState({futureEvent: false, allEvent: false});
            this.props.fetchEventsWithDate(moment.utc(),false);
        }
    }
    render () {
        return (
            <div className="bar-container">
                <div className="param-container">
                    <a className={this.state.allEvent ? "selected-filter" : ""} onClick={() => this.handleFetchAll()} >All Events</a>
                    <a className={this.state.futureEvent ? "selected-filter" : ""} onClick={() => this.fetchFutureEvent()} >Future Events</a>
                    <a className={this.state.futureEvent ? "" : this.state.allEvent ? "" : "selected-filter" }onClick={() => this.fetchPastEvent()}>Past Events</a>
                </div>
                <div>
                    <a className={this.props.panelView ? "selected-icon" : "icon" } onClick={() => this.props.panel()} ><FontAwesomeIcon icon="th-large"/></a>
                    <a className={this.props.panelView ? "icon" : "selected-icon"} onClick={() => this.props.row()}><FontAwesomeIcon icon="th-list"/></a>
                </div>
            </div>
        )
    }
}
const mapDispatchToProps = (dispatch) => {
    return ({
        fetchEvents: () => dispatch(fetchEvents()),
        fetchEventsWithDate: (date, sentinel) => dispatch(fetchEventsWithDate(date,sentinel))
    });
};
export default connect(undefined, mapDispatchToProps)(DisplayBar);