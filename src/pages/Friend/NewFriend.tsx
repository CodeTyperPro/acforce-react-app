import React from "react";
import AddIcon from "@mui/icons-material/Add";
import "./Friend.css";
import { useState } from "react";

type HandleAdd = (name: string) => void;
type PrettyProps = {
  handleAdd: HandleAdd;
};

function NewFriend(props: PrettyProps) {
  const [friend_name, setFriendName] = useState("");

  const handleSubmit = (e: any) => {
    e.preventDefault();
    props.handleAdd(friend_name);
    setFriendName('');
  }

  return (
    <div className="new-friend">
      <div className="new-friend-name">
        <form onSubmit={ handleSubmit }>
          <input
            type="text"
            placeholder="New friend"
            value={friend_name}
            onChange={(e) => setFriendName(e.target.value)}
          />
        </form>
      </div>
      <div className="add-icon" onClick={() => props.handleAdd(friend_name)}>
        <AddIcon fontSize="small" />
      </div>
    </div>
  );
}

export default NewFriend;
