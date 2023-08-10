import React from "react";
import { Link } from "react-router-dom";
import profile_picture from "../../assets/hacker.jpg";
import SettingsIcon from '@mui/icons-material/Settings';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import ThumbsUpDownIcon from '@mui/icons-material/ThumbsUpDown';
import CircularProgress from "@mui/joy/CircularProgress";
import NewReleasesIcon from '@mui/icons-material/NewReleases';
import CreateSvgIcon from "../CreateSvgIcon";

function SideBar() {
  return (
    <>
      <div className="sidebar">
        <div className="upper">
          <img
            src={profile_picture}
            alt="Profile Picture"
            width={75}
            height={75}
          />
            <input className="input-user" type="text" value={"CodeTyper"}/>
        </div>

        <hr className="hrbefore" />
        <div className="links">
          <Link to="/"></Link>
          <Link to="/notifications">
            <NotificationsNoneIcon style={{color: 'success'}}/>
            Notifications
          </Link>
          <Link to="/preferences">
            <SettingsIcon />
            Preferences
          </Link>
        </div>

        <div className="processing">
          <CircularProgress determinate value={60} color="danger">
            <NewReleasesIcon color="error" fontSize="small"/>
          </CircularProgress>
          <h6>Response coming ... </h6>
        </div>

        <div className="feedback">
          <hr className="hrafter" />
          <ThumbsUpDownIcon/>
          Give a feedback
        </div>
      </div>
    </>
  );
}

export default SideBar;
