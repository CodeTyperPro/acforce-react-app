import React from 'react'
import CloseIcon from '@mui/icons-material/Close';
import './Friend.css';

type HandleDelete = (id: number) => void;
type PrettyProps = {
  id: number,
  name: string,
  handleDelete: HandleDelete
}

const Friend = (props: PrettyProps) => {
  return (
    <div className="friend">
        <div className="friend-name">
            <span>{ props.name }</span>
        </div>
        <div className="close-icon" onClick={() => props.handleDelete(props.id)}>
            <CloseIcon fontSize="small"/>
        </div>
    </div>
  )
}

export default Friend;