import React, {useEffect, Fragment} from 'react';
import Spinner from "../layout/Spinner";
import {Link} from "react-router-dom";
import Repos from "../repos/Repos"
import PropTypes from "prop-types";

const UserDetails = ({getUser, getRepos, user, loading, repos, match}) => {

    useEffect(()=>{
        getUser(match.params.login);
        getRepos(match.params.login);
        //eslint-disable-next-line
    },[]);

    const {name, avatar_url, location, bio, blog,company, login, html_url, followers, following, public_repos, public_gist, hireable  } = user;

    if(loading){
        return <Spinner/>
    }else{
        return (
            <Fragment>
                <Link to='/' className='btn btn-light'>Back</Link>

                <div className="card grid-2">
                    <div className="all-center">
                        <img src={avatar_url} className='round-img ' alt=""  style={{width:'150px'}}/>
                        <h1>{name}</h1>
                        <p>Hireable: {hireable ? <i className='fas fa-check text-success'/> : <i className='fas fa-times-circle text-danger'/>}</p>
                        <p>Location: {location}</p>
                    </div>
                    <div>

                        {
                            bio && <Fragment>
                                <h3>BIO</h3>
                                <p>{bio}</p>
                            </Fragment>
                        }
                        <a href={html_url} className='btn btn-danger my-1'>GitHub profile</a>
                        <ul>
                            <li>
                                {login && <Fragment>
                                    <strong>Username: </strong>{login}
                                </Fragment>}
                            </li>
                            <li>
                                {company && <Fragment>
                                    <strong>Company: </strong>{company}
                                </Fragment>}
                            </li>
                            <li>
                                {blog && <Fragment>
                                    <strong>Website: </strong>{blog}
                                </Fragment>}
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="card text-center">
                    <div className="badge badge-primary">Followers: {followers}</div>
                    <div className="badge badge-success">Following: {following}</div>
                    <div className="badge badge-light">Public Repos: {public_repos}</div>
                    <div className="badge badge-dark ">Public Gists: {public_gist}</div>
                </div>
                <Repos repos={repos}/>
            </Fragment>
        )
    }
};

UserDetails.propTypes = {
    loading: PropTypes.bool.isRequired,
    user:PropTypes.object.isRequired,
    getUser:PropTypes.func.isRequired,
    getRepos:PropTypes.func.isRequired,
    repos:PropTypes.array.isRequired,

};

export default UserDetails;
