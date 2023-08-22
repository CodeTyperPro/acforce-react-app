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

  const handleEnterUser = (e: any) => {

    if (e.key === 'Enter') {
      console.log("I was entered.");

      let myMap = JSON.parse(localStorage.getItem('recent_notification')) || {};
      delete myMap[user.toLowerCase()];
      localStorage.setItem('recent_notification', JSON.stringify(myMap)); 
      
      // === Remove user === //
      let copy_array = JSON.parse(localStorage.getItem('all_submissions')) || [];
      let index: number = copy_array.findIndex((x) => {
        return x !== null && x.handle === user;
      })

      if (index >= 0 && index < copy_array.length) {
        delete copy_array[index];
        copy_array = copy_array.filter(x => x !== null);
      }

      localStorage.setItem('all_submissions', JSON.stringify(copy_array));
    }
  }

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

        // console.log("Let's check: ", root);

        if (response.status !== 200) {
          setIsPending(true);
        } else {
          setIsPending(false);
        }
      } catch (err) {
        console.log(err);
        setIsPending(true);
      }
    }

    setInterval(() => {
      fetchData();
    }, 60000);
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
            onKeyPress={handleEnterUser}
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

        <div className="processing">
          {
            isPending ?
            (
              <CircularProgress variant={variant} color="warning">
                <NewReleasesIcon color="error" fontSize="small" />
              </CircularProgress>
            ) :
            (
              <CircularProgress variant="outlined" determinate value = {100} color="success">
              </CircularProgress>
            )
          }
              <h6> { isPending ? ("Connecting ...") : ("Connected")} </h6>
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
