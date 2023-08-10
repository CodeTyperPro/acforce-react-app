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

function Preferences() {
  const label = { inputProps: { "aria-label": "Checkbox demo" } };

  const [value, setValue] = React.useState<number>(60);
  const handleChange = (event: Event, newVlaue: number | number[]) => {
    setValue(newVlaue as number);
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
          <NewFriend />
          <Friend />
          <Friend />
          <Friend />
          <Friend />
          <Friend />
          <Friend />
        </div>
      </div>

      <div className="tracking">
        <div>
          <span>Tracking</span>
        </div>
        <div className="items-sub">
          <div className="my-sub">
            <Checkbox {...label} defaultChecked />
            <span>
              My submissions
            </span>
            
          </div>
          <div className="friends-sub">
            <Checkbox {...label} defaultChecked />
            <span>
              Friends submissions
            </span>
          </div>
        </div>
      </div>

      <div className="sound-effect">
        <div className="sound">
          <span>Sound effect</span>
        </div>

        <div className="attach">
          <div className="attached-ringtone">
            <span>Hall of Fame - The Script</span>
          </div>
          <div className="input-file">
            <span>Attach ringtone</span>
            <input type="file" accept=".mp3, .wav, .m4a, .ogg" />
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
              placeholder="30"
              inputMode="numeric"
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
                  value={value}
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
