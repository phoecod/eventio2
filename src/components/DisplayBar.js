import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const DisplayBar = ({allEvent, futureEvent, fetchPastEvent, fetchAllEvent, panelView, fetchFutureEvent, row, panel}) => {

    return (
        <div className="bar-container">
            <div className="param-container">
                <a className={allEvent ? "selected-filter" : ""} onClick={() => fetchAllEvent()} >All Events</a>
                <a className={futureEvent ? "selected-filter" : ""} onClick={() => fetchFutureEvent()} >Future Events</a>
                <a className={futureEvent ? "" : allEvent ? "" : "selected-filter" }onClick={() => fetchPastEvent()}>Past Events</a>
            </div>
            <div>
                <a className={panelView ? "selected-icon" : "icon" } 
                    onClick={() => panel()} >
                    <FontAwesomeIcon icon="th-large"/></a>
                <a className={panelView ? "icon" : "selected-icon"} 
                    onClick={() => row()}>
                    <FontAwesomeIcon icon="th-list"/></a>
            </div>
        </div>
    )
}

export default DisplayBar;