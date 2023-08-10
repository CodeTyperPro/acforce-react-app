import React from 'react';
import AddIcon from '@mui/icons-material/Add';
import './Friend.css';

function NewFriend() {
  return (
    <div className="new-friend">
        <div className="new-friend-name">
            <input type="text" placeholder="New friend"></input>
        </div>
        <div className="add-icon">
            <AddIcon fontSize="small"/>
        </div>
    </div>
  )
}

export default NewFriend