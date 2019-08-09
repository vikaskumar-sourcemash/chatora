import React from 'react';
import { Route, Switch } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { FetchData } from './components/FetchData';
import { Counter } from './components/Counter';
import { Chat } from './components/Chat';
import Profile from "./components/Profile";
import { useAuth0 } from "./react-auth0-wrapper";
import PrivateRoute from "./components/PrivateRoute";
import { Spinner } from 'reactstrap';

export default function App() {

    const { loading } = useAuth0();

    if (loading) {
        return (
            <div><Spinner style={{ width: '3rem', height: '3rem' }} /></div>
        );
    }

    return (
        <Layout>
            <Switch>
            <Route exact path='/' component={Home} />
            <Route path='/counter' component={Counter} />
            <Route path='/fetch-data' component={FetchData} />
            <Route path='/chat-app' component={Chat} />
            <PrivateRoute path="/profile" component={Profile} />

                </Switch>
        </Layout>
    );

}
