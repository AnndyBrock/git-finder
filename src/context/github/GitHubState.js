import React, {useReducer} from 'react';
import axios from 'axios';
import GitGubContext from './gitHubContext';
import GitHubReducer from './gitHubReducer';
import {
    SEARCH_USERS,
    SET_LOADING,
    GET_REPOS,
    GET_USER, CLEAR_USERS
} from '../types'

let githubClientId;
let githubClientSecret;

if (process.env.NODE_ENV !== 'production') {
    githubClientId = process.env.REACT_APP_GITHUB_CLIENT_ID;
    githubClientSecret = process.env.REACT_APP_GITHUB_CLIENT_SECRET;
} else {
    githubClientId = process.env.GITHUB_CLIENT_ID;
    githubClientSecret = process.env.GITHUB_CLIENT_SECRET;
}

const GitGubState = props =>{
    const initialState = {
        users:[],
        user:{},
        repos:[],
        loading: false
    };

    const [state, dispatch] = useReducer(GitHubReducer, initialState);

    //Search users on GitHub
    const searchUsers = async text => {
        setLoading(true);
        const res = await axios.get(`https://api.github.com/search/users?q=${text}&client_id=${githubClientId}&client_secret=${githubClientSecret}`);

        dispatch({
            type:SEARCH_USERS,
            payload:res.data.items
        })

    };

    //Get information by user
    const getUser = async login => {
        setLoading();
        const res = await axios.get(`https://api.github.com/users/${login}?client_id=${githubClientId}&client_secret=${githubClientSecret}`);
        dispatch({
            type:GET_USER,
            payload: res.data
        })
    };
    //Get repos
    const getRepos = async login => {
        setLoading();
        const res = await axios.get(`https://api.github.com/users/${login}/repos?per_page=5&sort=created:asc&client_id=${githubClientId}&client_secret=${githubClientSecret}`);

        dispatch({
            type:GET_REPOS,
            payload: res.data
        });
    };

    //Clear users
    const clearUser = () => dispatch({type:CLEAR_USERS});

    //Set loading
    const setLoading = () =>{
      dispatch({type: SET_LOADING})
    };


    return <GitGubContext.Provider value={{
        users:state.users,
        user:state.user,
        repos:state.repos,
        loading:state.loading,
        searchUsers,
        clearUser,
        getUser,
        getRepos
    }}
    >
        {props.children }
    </GitGubContext.Provider>


};

export default GitGubState;