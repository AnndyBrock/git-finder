import React, {Fragment} from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Navbar from './components/layout/Navbar';
import User from './components/users/User';
import About from './components/pages/About';
import './App.css';
import Search from "./components/users/Search";
import Alert from "./components/layout/Alert";
import UserDetails from "./components/users/UserDetails";
import GitGubState from './context/github/GitHubState';
import AlertState from './context/alert/AlertState';

const App = () => {

    return (
        <GitGubState>
            <AlertState>
                <Router>
                    <div className="App">
                        <Navbar/>
                        <div className="container">
                            <Alert alert={alert}/>
                            <Switch>
                                <Route exact path='/' render={props => (
                                    <Fragment>
                                        <Search/>
                                        <User/>
                                    </Fragment>
                                )}/>
                                <Route exact path='/about' component={About}/>
                                <Route exact path='/user/:login' component={UserDetails}/>
                            </Switch>
                        </div>
                    </div>
                </Router>
            </AlertState>
        </GitGubState>
    );
};

export default App;
