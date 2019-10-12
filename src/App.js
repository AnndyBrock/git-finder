import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Navbar from './components/layout/Navbar';
import About from './components/pages/About';
import NotFound from './components/pages/NotFound';
import Home from './components/pages/Home';
import './App.css';
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
                                <Route exact path='/' component={Home}/>
                                <Route exact path='/about' component={About}/>
                                <Route exact path='/user/:login' component={UserDetails}/>
                                <Route component={NotFound}/>
                            </Switch>
                        </div>
                    </div>
                </Router>
            </AlertState>
        </GitGubState>
    );
};

export default App;
