import React, {Component} from 'react';
import RequireAuth from './RequireAuth';
import {fetchEvents, fetchEventsWithDate} from '../actions/event';
import {connect} from 'react-redux';
import EventItem from './EventItem';
import Header from './Header';
import Footer from './Footer';
import DisplayBar from './DisplayBar';
import Loader from './Loader';
import moment from 'moment';

export const EventLanding = class EventLanding extends Component {
    constructor (props) {
        super(props);
        this.state = {
            panelView: true,
            isLoading: true,
            allEvent: true,
            futureEvent: false
        }
    }

    fetchAllEvent = () => {
        this.setState({isLoading: true});
        const allEventSentinel = this.state.allEvent;
        if (!allEventSentinel) {
            this.setState({
                allEvent: true,
                futureEvent: false
            });
            this.props.fetchEvents().then(() => {
                this.setState({isLoading: false});
            });
        }
    }

    fetchFutureEvent = () => {
        this.setState({isLoading: true});
        const sentinel = this.state.futureEvent;
        if (!sentinel) {
            this.setState({futureEvent: true, allEvent: false});
            this.props.fetchEventsWithDate(moment.utc(),true).then(() => {
                this.setState({isLoading: false});
            });
        }
    }

    fetchPastEvent = () => {
        this.setState({isLoading: true});
        if (this.state.futureEvent || this.state.allEvent){
            this.setState({futureEvent: false, allEvent: false});
            this.props.fetchEventsWithDate(moment.utc(),false);
            this.setState({isLoading: false});
        }
    }

    componentDidMount () {
        try {
            this.props.fetchEvents().then(() => {
                this.setState({isLoading: false});
            });
        } catch (e) {
            console.log(e)
        }
        
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
        const {isLoading} = this.state;
        const {panelView} = this.state;
        return (
            <div className="colFlex">
                <Header signOut={this.handleSignOut}/>
                <DisplayBar
                    allEvent={this.state.allEvent}
                    futureEvent={this.state.futureEvent}
                    fetchPastEvent={this.fetchPastEvent}
                    fetchAllEvent={this.fetchAllEvent}
                    fetchFutureEvent={this.fetchFutureEvent}
                    panelView={panelView}
                    panel={this.handlePanelDisplay}
                    row={this.handleRowDisplay}
                />
                <div className="content-container">
                    <div className={panelView ?"events-panel-container" : "events-row-container" }>
                    {
                     isLoading ? <Loader /> :     
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
        )
    }
}

const mapDispatchToProps = (dispatch) => ({
    fetchEvents: () => dispatch(fetchEvents()),
    fetchEventsWithDate: (date, sentinel) => dispatch(fetchEventsWithDate(date,sentinel))
});

const mapStateToProps = (state) => ({
    events: state.events
})

const connected = connect(mapStateToProps, mapDispatchToProps)(EventLanding);

export default RequireAuth(connected);