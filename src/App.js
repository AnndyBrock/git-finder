import React, {Fragment, useState} from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Navbar from './components/layout/Navbar';
import User from './components/users/User';
import axios from 'axios';
import About from './components/pages/About';
import './App.css';
import Search from "./components/users/Search";
import Alert from "./components/layout/Alert";
import UserDetails from "./components/users/UserDetails";

const App = () =>{

    const [users, setUsers] = useState([]);
    const [user, setUser] = useState({});
    const [repos, setRepos] = useState([]);
    const [loading, setLoading] = useState(false);
    const [alert, setError] = useState(null);


    //Search users on GitHub
    const searchUsers = async (text) =>{
        setLoading(true);
        const res = await axios.get(`https:api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
        setUsers(res.data.items);
        setLoading(false);
    };
    //Get information by user
    const getUser = async (login) =>{
        setLoading(true);
        const res = await axios.get(`https:api.github.com/users/${login}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
        setLoading(false);
        setUser(res.data);
    };
    //get user repos
    const getRepos = async (login) =>{
        setLoading(true);
        const res = await axios.get(`https:api.github.com/users/${login}/repos?per_page=5&sort=created:asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
        setLoading(false);
        setRepos(res.data);
    };

    const clearUser = () => {
        setUsers([]);
        setLoading(false);
    };

    const setAlert = (msg, type) => {
        setError({ msg, type });
        setTimeout(()=>setError(null),5000)
    };
    
    return (
        <Router>
            <div className="App">
                <Navbar/>
                <div className="container">
                    <Alert alert={ alert }/>
                    <Switch>
                        <Route exact path='/' render={props => (
                            <Fragment>
                                <Search
                                    searchUsers={searchUsers}
                                    clearUser={clearUser}
                                    showClear={users.length > 0 ? true : false}
                                    setAlert={setAlert}
                                />
                                <User users={users} loading={loading}/>
                            </Fragment>
                        )}/>
                        <Route exact path='/about' component={About}/>
                        <Route exact path='/user/:login' render={props=>(
                            <UserDetails
                                {...props}
                                getUser={getUser}
                                getRepos={getRepos}
                                repos={repos}
                                user={user}
                                loading={loading}/>
                        )}
                        />
                    </Switch>
                </div>
            </div>
        </Router>
    );
}

export default App;
