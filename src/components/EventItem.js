import React, {Fragment} from 'react';
import EventActionButton from './EventActionButton';
import RequireAuth from './RequireAuth';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const EventItem = (props) => {

    const event = props.event;
    const handleDetailView = () => {
        props.history.push({
            pathname: "/eventview",
            state: { event: props.event }
        });
    }
    const date = moment(event.date,"YYYY-MM-DD hh:mm A").format("MMM D, YYYY - hh:mm A");
    const hostName = event.host !== undefined ?  event.host.first_name + " " + event.host.last_name : "None";
    return (
        <div key={props.key} className={props.panelView ? "event-panel" : "event-row"}>
            <div className="clickable" onClick={() => handleDetailView()}>
                <span className="date">{`${date}`}</span>
                <h2 className="title">{event.title}</h2>
                <span className="host">{hostName}</span>
                <p className="description">{event.description}</p>
            </div>
            <div className="action-container">
                <div className="users"><FontAwesomeIcon icon="user" />{`${event.users.length} of ${event.capacity}`}</div>
                <EventActionButton displayEvent={event}/>
            </div>
        </div>
        
    )
}

export default RequireAuth(EventItem);