import * as React from "react";
import "./Preferences.css";
import { Checkbox } from "@mui/material";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import VolumeDown from "@mui/icons-material/VolumeDown";
import VolumeUp from "@mui/icons-material/VolumeUp";
import Stack from "@mui/material/Stack";
import NewFriend from "../Friend/NewFriend";
import Friend from "../Friend/Friend";
import { useLocalStorage } from "../useLocalStorage";

export interface Friends {
  name: string;
}

function Preferences() {
  const label = { inputProps: { "aria-label": "Checkbox demo" } };

  const [volume, setVolume] = useLocalStorage("volume", 80);
  const handleChange = (event: Event, newValue: number | number[]) => {
    setVolume(newValue as number);
  };

  const [duration, setDuration] = useLocalStorage("duration", 30);
  const handleChangeDuration = (e: any) => {
    let x: number = +e.target.value;

    if (x === 0) {
      e.preventDefault();
      e.target.value = duration;
    } else {
      setDuration(+e.target.value);
    }
  };

  const [my_submission, setMySubmission] = useLocalStorage(
    "my_submission",
    "1"
  );
  const handleClickMySubmission = (e: any) => {
    let x = e.target.checked;
    setMySubmission(x ? "1" : "0");
  };

  const [friends_submission, setFriendsSubmission] = useLocalStorage(
    "friends_submission",
    "1"
  );
  const handleClickFriendsSubmission = (e: any) => {
    let x = e.target.checked;
    setFriendsSubmission(x ? "1" : "0");
  };

  const [sound_effect, setSoundEffect] = useLocalStorage(
    "sound_effect",
    "Hall of Fame - The Script"
  );
  const handleSoundEffect = (e: any) => {
    let x = e.target.value || "Hall of Fame - The Script";
    setSoundEffect(x);
  };

  // === Using state === //
  const [friends, setFriends] = useLocalStorage("friends", []);

  // === Delete === //
  const handleDelete = (id: number) => {
    if (friends === undefined || friends === null) {
      return;
    }

    const new_friends = friends.filter((x) => x.id !== id);
    setFriends(new_friends);
  };

  // === Insert === //
  const handleAdd = (name: string) => {
    if (name === "" || name === null)
      return;

    if (friends === undefined || friends === null) {
      return;
    }
    
    // Command to clear the storage:
    if (name === "clear") {
      localStorage.clear();
      window.location.reload();
      return;
    }

    const new_friends = friends || [];

    const maxId = new_friends.reduce(
      (max, friend) => Math.max(max, friend.id),
      0
    );
    const new_id = maxId + 1;

    const new_obj = {
      id: new_id,
      name: name,
    };

    const add = [new_obj, ...friends]; // Create a new array with the added friend
    setFriends(add);
  };

  return (
    <div className="preferences">
      <div className="title">
        <span>Preferences</span>
      </div>

      <div className="friends">
        <div className="friend-id-text">
          <span>Friends' Ids</span>
        </div>
        <div className="friends-list">
          {<NewFriend key={0} handleAdd={handleAdd} />}

          {friends &&
            friends
              .filter((x) => x.id !== 0)
              .map((x) => (
                <Friend key={x.id} id={x.id} name={x.name} handleDelete={handleDelete} />
              ))}
        </div>
      </div>

      <div className="tracking">
        <div>
          <span>Tracking</span>
        </div>
        <div className="items-sub">
          <div className="my-sub">
            <Checkbox
              value="my_submissions"
              {...label}
              checked={my_submission === "1"}
              onChange={handleClickMySubmission}
            />
            <span>My submissions</span>
          </div>
          <div className="friends-sub">
            <Checkbox
              value="friends_submission"
              {...label}
              checked={friends_submission === "1"}
              onClick={handleClickFriendsSubmission}
            />
            <span>Friends submissions</span>
          </div>
        </div>
      </div>

      <div className="sound-effect">
        <div className="sound">
          <span>Sound effect</span>
        </div>

        <div className="attach">
          <div className="attached-ringtone">
            <span>
              {sound_effect?.substring(0, 30) + " ..." ||
                "Hall of Fame - The Script"}
            </span>
          </div>
          <div className="input-file">
            <span>Attach ringtone</span>
            <input
              readOnly
              type="file"
              accept=".mp3, .wav, .m4a, .ogg"
              onChange={handleSoundEffect}
            />
          </div>
        </div>
      </div>

      <div className="spacer"></div>
      <div className="duration-volume">
        <div className="duration">
          <div>
            <span>Duration</span>
          </div>
          <div className="duration-bottom">
            <input
              type="number"
              min={0}
              max={90}
              placeholder={duration?.toString() || "30"}
              inputMode="numeric"
              onChange={handleChangeDuration}
              readOnly
            ></input>
          </div>
        </div>

        <div className="volume">
          <span>Volume</span>
          <div className="icon-progress">
            <Box sx={{ width: 200 }}>
              <Stack
                spacing={2}
                direction="row"
                sx={{ mb: 1 }}
                alignItems="center"
              >
                <VolumeDown />
                <Slider
                  aria-label="Volume"
                  value={volume}
                  onChange={handleChange}
                />
                <VolumeUp />
              </Stack>
            </Box>

            <div className="progress"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Preferences;
