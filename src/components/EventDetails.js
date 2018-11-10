import React, {Fragment} from 'react';
import Header from './Header';
import RequireAuth from './RequireAuth';
import Attendees from './Attendees';
import EventActionButton from './EventActionButton';
import moment from 'moment';
import Footer from './Footer';

const EventDetails = (props) => {

    const {event} = props.location.state;

    const hostName = event.host.length > 0 ?  event.host.first_name.length + " " + event.host.last_name : "None";
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
                                {event.users.length} of {event.capacity}
                            </span>
                            <EventActionButton displayEvent={event}/>
                        </div>
                    </div>
                    <Attendees attendees={event.users}/>
                </div>
                <Footer />
            </div>
        </Fragment>
    )
}

export default RequireAuth(EventDetails);