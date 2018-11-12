import React from 'react';

const FormTitleBlock = (props) => {
    return (
        <div className="title-block">
                <h2 className="title">{props.signin? "Sign in to Eventio" : "Get started absolutely free"}</h2>
                <h4 className="subtitle">{props.signin? "details below" : "enter your details below"}</h4>
        </div>
    )
}

export default FormTitleBlock;