import React, {Component} from 'react';
import RequireAuth from './RequireAuth';
import {fetchEvents} from '../actions/event';
import {connect} from 'react-redux';
import EventItem from './EventItem';
import Header from './Header';
import Footer from './Footer';
import DisplayBar from './DisplayBar';

export const EventLanding = class EventLanding extends Component {
    constructor (props) {
        super(props);
        this.state = {
            panelView: true
        }
    }

    componentDidMount = () => {
        this.props.fetchEvents();
    }

    handlePanelDisplay = () => {
        this.setState({panelView: true}); 
    }

    handleRowDisplay = () => {
        this.setState({panelView: false}); 
    }

    handleSignOut = () => {
        this.props.startSignOut();
    }

    render() {
        const {panelView} = this.state
        return (
            <div className="app-margin">
                <div className="colFlex">
                    <Header signOut={this.handleSignOut}/>
                    <DisplayBar
                        panelView={panelView}
                        panel={this.handlePanelDisplay}
                        row={this.handleRowDisplay}
                    />
                    <div className="content-container">
                        <div className={panelView ?"events-panel-container" : "events-row-container" }>
                        {
                            this.props.events.map((event) => {
                                return <EventItem 
                                panelView={panelView} 
                                key={event._id} 
                                history={this.props.history} 
                                event={event}/>
                            })
                        }
                        </div>
                        <Footer />
                    </div> 
                </div>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => ({
    fetchEvents: (userId) => dispatch(fetchEvents(userId))
});

const mapStateToProps = (state) => ({
    events: state.events
})

const connected = connect(mapStateToProps, mapDispatchToProps)(EventLanding);

export default RequireAuth(connected);