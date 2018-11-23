import React, {Fragment} from 'react';
import Header from './Header';
import RequireAuth from './RequireAuth';
import Attendees from './Attendees';
import EventActionButton from './EventActionButton';
import moment from 'moment';
import Footer from './Footer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const EventDetails = (props) => {

    const {event} = props.location.state;

    const hostName = event.owner.length > 0 ?  event.owner.firsName.length + " " + event.onwer.lastName : "None";
    return (
        <Fragment>
            <Header />
            <div className="head-container">
                <div className="rowFlex">
                    <div className="details-container">
                        <div className="date">{moment(event.date,"DD-MM-YYYY hh:mm A").format("MMM D, YYYY - hh:mm A")}</div>   
                        <h1 className="title">{event.title}</h1>
                        <p className="description">{event.description}</p>
                        <div className="host">{hostName}</div>
                        <div className="action-container">
                            <span>
                            <FontAwesomeIcon className="user-icon" icon="user" />{event.attendees.length} of {event.capacity}
                            </span>
                            <EventActionButton displayEvent={event}/>
                        </div>
                    </div>
                    <Attendees attendees={event.attendees}/>
                </div>
                <Footer />
            </div>
        </Fragment>
    )
}

export default RequireAuth(EventDetails);