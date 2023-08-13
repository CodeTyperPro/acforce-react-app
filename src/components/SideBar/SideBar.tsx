import React from "react";
import { Link } from "react-router-dom";
import profile_picture from "../../assets/hacker.jpg";
import SettingsIcon from '@mui/icons-material/Settings';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import ThumbsUpDownIcon from '@mui/icons-material/ThumbsUpDown';
import CircularProgress from "@mui/joy/CircularProgress";
import NewReleasesIcon from '@mui/icons-material/NewReleases';
import CreateSvgIcon from "../CreateSvgIcon";
import { useLocalStorage } from "../../pages/useLocalStorage";
import { AppContext } from "../../Helper/Context";
import { useContext } from "react";
import { useEffect, useState } from "react";
import { VariantProp } from "@mui/joy";


function SideBar() {
  const [user, setUser] = useLocalStorage('user', '');
  const handleChangeUser = (e: any) => {
    let x: string = e.target.value;
    console.log(x);
    setUser(x);
  };

  const [variant, setVariant] = React.useState<VariantProp>('solid');
  
  // === Async === //
  const [isPending, setIsPending] = useState(false); // Change to true to see the changes in the main screen
  useEffect(() => {
    async function fetchData() {
        // try catch

        try { 
          const response = await axios.get(url);
          const root = response.data.result["0"];

          let result: string = root.verdict;

          if (result === "TESTING") {
            setIsPending(true);
          } else {
            setIsPending(false);
          }
        } catch(err) {
          console.log(err);
        }
    }

    fetchData();
  }, [isPending])


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
            <input className="input-user" type="text" placeholder="User" value={ user } required onChange={ handleChangeUser } />
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
        
        <div className="processing" style={{ opacity: (true || isPending ? 100 : 0) }}>
            <CircularProgress variant={variant} color="warning">
              <NewReleasesIcon color="error" fontSize="small"/>
            </CircularProgress>
            <h6>Response coming ...</h6>
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
