import React from 'react';

const Attendees = (props) => {
    return (
        <div className="attendee-panel">
            <h3 className="title">Attendees</h3>
            <div className="attendee-container">
            {
                props.attendees.map((attendee, ind) => {
                    return <div className="user-circle" 
                    key={attendee._id}>
                        {`${attendee.first_name}  ${attendee.last_name}` }
                    </div>
                })
            }
            </div>
            
        </div>
    )
}

export default Attendees;