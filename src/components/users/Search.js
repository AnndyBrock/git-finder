import React, {useState} from 'react';
import PropTypes from 'prop-types';


const Search = ({showClear,clearUser,searchUsers, setAlert}) => {

    const [text, setText] = useState('');

    const onChange = (e) => {
        setText(e.target.value);
    };

    const onSubmit = (e) => {
        e.preventDefault();
        if(text===''){
             setAlert('Your serch field is empty', 'light');
        }else{
            searchUsers(text);
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
                {showClear && (
                <button
                    className="btn btn-light btn-block"
                    onClick={clearUser}>Clear
                </button>)}
            </div>
        );
};

Search.propTypes = {
    searchUsers: PropTypes.func.isRequired,
    clearUser: PropTypes.func.isRequired,
    showClear: PropTypes.bool.isRequired,
    setAlert:PropTypes.func.isRequired
};

export default Search;
