import React from "react";
import { Link } from "react-router-dom";
import profile_picture from "../../assets/hacker.jpg";
import SettingsIcon from "@mui/icons-material/Settings";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import ThumbsUpDownIcon from "@mui/icons-material/ThumbsUpDown";
import CircularProgress from "@mui/joy/CircularProgress";
import NewReleasesIcon from "@mui/icons-material/NewReleases";
import { useLocalStorage } from "../../pages/useLocalStorage";
import { useEffect, useState } from "react";
import { VariantProp } from "@mui/joy";
import axios from "axios";

function SideBar() {
  const [user, setUser] = useLocalStorage("user", "user");
  const handleChangeUser = (e: any) => {
    let x: string = e.target.value;
    setUser(x);
  };

  const [variant, setVariant] = React.useState<VariantProp>("solid");

  let handle: string = user;
  let url: string =
    "https://codeforces.com/api/user.status?handle=" +
    handle +
    "&from=1&count=2";

  // === Async === //
  const [isPending, setIsPending] = useState(false); // Change to true to see the changes in the main screen
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(url);
        const root = response.data.result["0"];
        let result: string = root.verdict;

        if (response.status === 200) {
          setIsPending(true);
        } else {
          setIsPending(false);
        }
      } catch (err) {
        console.log(err);
      }
    }

    fetchData();
  }, [isPending]);

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
          <input
            className="input-user"
            type="text"
            value={user}
            placeholder="User"
            required
            onChange={handleChangeUser}
          />
        </div>

        <hr className="hrbefore" />
        <div className="links">
          <Link to="/"></Link>
          <Link to="/notifications">
            <NotificationsNoneIcon style={{ color: "success" }} />
            Notifications
          </Link>
          <Link to="/preferences">
            <SettingsIcon />
            Preferences
          </Link>
        </div>

        <div className="processing" style={{ opacity: isPending ? 100 : 0 }}>
          <CircularProgress variant={variant} color="warning">
            <NewReleasesIcon color="error" fontSize="small" />
          </CircularProgress>
          <h6>Response coming ...</h6>
        </div>

        <div className="feedback">
          <hr className="hrafter" />
          <ThumbsUpDownIcon />
          <a href="mailto:alfredomartins624@hotmail.com">Give a feedback</a>
        </div>
      </div>
    </>
  );
}

export default SideBar;
