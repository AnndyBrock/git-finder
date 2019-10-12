import React, {useContext} from 'react';
import UserItem from '../users/UserItem'
import Spinner from "../layout/Spinner";
import GitHubContext from '../../context/github/gitHubContext';

const User = () => {

    const gitHubContext = useContext(GitHubContext);

    const {loading, users} = gitHubContext;

    if(loading){
        return <Spinner/>
    }else{
        return (
            <div style={userStyle}>
                {users.map(user=>(
                    <UserItem key={user.id} user={user}/>
                ))}
            </div>
        )
    }
};

const userStyle = {
    display:'grid',
    gridTemplateColumns: 'repeat(3,1fr)',
    gridGap:'1rem'
};

export default User;
