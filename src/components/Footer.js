import React from 'react';
import RequireAuth from './RequireAuth';

const Footer = (props) => {
    const handleAddEvent = () => {
        props.history.push('/addevent');
    }
    return (
        <div className="footer-container">
            <button className="add-circle" onClick={() => handleAddEvent()}>+</button>
        </div>
    )
}

export default RequireAuth(Footer);