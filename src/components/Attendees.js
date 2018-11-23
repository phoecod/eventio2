import React from 'react';

const Attendees = (props) => {
    return (
        <div className="attendee-panel">
            <h3 className="title">Attendees</h3>
            <div className="attendee-container">
            {
                props.attendees.map((attendee) => {
                    return <div className="user-circle" 
                    key={attendee._id}>
                        {`${attendee.firstName}  ${attendee.lastName}` }
                    </div>
                })
            }
            </div>
            
        </div>
    )
}

export default Attendees;