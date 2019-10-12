import React, {useState, useContext} from 'react';
import GitHibContext from '../../context/github/gitHubContext';
import AlertContext from '../../context/alert/alertContext';


const Search = () => {

    const gitHubContext = useContext(GitHibContext);
    const alertContext = useContext(AlertContext);

    const [text, setText] = useState('');

    const onChange = (e) => {
        setText(e.target.value);
    };

    const onSubmit = (e) => {
        e.preventDefault();
        if(text===''){
            alertContext.setAlert('Your serch field is empty', 'light');
        }else{
            gitHubContext.searchUsers(text);
            setText('')
        }

    };
        return (
            <div>
                <form onSubmit={onSubmit} className="form">
                    <input
                        type="text"
                        name="text"
                        placeholder="Search users..."
                        value={text}
                        onChange={onChange}
                    />
                    <input
                        type="submit"
                        value="Search"
                        className="btn btn-dark btn-block"
                    />
                </form>
                {gitHubContext.users.length>0 && (
                <button
                    className="btn btn-light btn-block"
                    onClick={gitHubContext.clearUser}>Clear
                </button>)}
            </div>
        );
};

export default Search;
