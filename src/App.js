import React, {Component} from 'react';
import Navbar from './components/layout/Navbar';
import User from './components/users/User';
import axios from 'axios';

import './App.css';
import Search from "./components/users/Search";

class App extends Component{

    state = {
        users:[],
        loading: false
    };


    searchUsers = async (text) =>{
        this.setState({loading:true});

        const res = await axios.get(`https:api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);

        this.setState({users:res.data.items,loading:false});

    };

    clearUser = () => {
        this.setState({users:[],loading: false});
    };

    render() {
        const {users, loading} = this.state;
    return (
      <div className="App">
        <Navbar/>
          <div className="container">
              <Search searchUsers={this.searchUsers} clearUser={this.clearUser} showClear={users.length > 0 ? true : false}/>
              <User users={users} loading={loading}/>
          </div>
      </div>
    );
  }
}

export default App;
