import React from 'react';
import  {Router, Route, Switch} from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import SignInUp from '../components/auth/SignInUp';
import EventLanding from '../components/EventLanding';
import CreateEvent from '../components/CreateEvent';
import EventDetails from '../components/EventDetails';
import EditEvent from '../components/EditEvent';

export let appHistory = createHistory();

const appRouter = () => (
    <Router history={appHistory}>
        <Switch>
            <Route path="/signin" component={SignInUp} exact={true} />
            <Route path="/" component={EventLanding} exact={true}/>
            <Route path="/eventview" component={EventDetails} />
            <Route path="/addevent" component={CreateEvent} />
            <Route path="/editevent" component={EditEvent} />
        </Switch>
    </Router>
)

export default appRouter;