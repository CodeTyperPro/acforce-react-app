import React from 'react'
import CloseIcon from '@mui/icons-material/Close';
import './Friend.css';

function Friend() {
  return (
    <div className="friend">
        <div className="friend-name">
            <span>CodeGuy</span>
        </div>
        <div className="close-icon">
            <CloseIcon fontSize="small"/>
        </div>
    </div>
  )
}

export default Friend;