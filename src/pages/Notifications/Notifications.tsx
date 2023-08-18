import React, { useContext } from "react";
import "./Notifications.css";
import CardNotification from "./CardNotification";
import NotificationList from "../NotificationList/NotificationList";
import { useLocalStorage } from "../useLocalStorage";
import { useEffect, useState } from "react";
import axios from "axios";
import { AppContext } from "../../Helper/Context";
import "../Skeletons/Skeleton.css";
import SkeletonElement from "../Skeletons/SkeletonElement";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Slide from '@mui/material/Slide';
import Snackbar, { SnackbarOrigin } from "@mui/material/Snackbar";
import {Howl, Howler } from "howler";
import mp3 from '../../sounds/success_sound.mp3';

const my_source_success_1 = "sources/success_sound.mp3";
const my_source_success_2 = "sources/success_sound.webm";
const music_url = "https://jesusful.com/wp-content/uploads/music/2021/09/The_Script_-_Hall_of_Fames_(Naijay.com).mp3";

type LastSubmission = {
  handle: string;
  problem_name: string;
  date: string;
  link: string;
  verdict: string;
};

interface State extends SnackbarOrigin {
  open: boolean;
}

function showNotification(data) {
  Notification.requestPermission().then((result) => {
    if (result === "granted") {
      navigator.serviceWorker.ready.then((registration) => {
        registration.showNotification("Vibration Sample", {
          body: "Buzz! Buzz!",
          icon: "../images/touch/chrome-touch-icon-192x192.png",
          vibrate: [200, 100, 200, 100, 200, 100, 200],
          tag: "vibration-sample",
        });
      });
    }
  });
}

function notifyMe(data) {
  let message: string = data.handle + " submitted " + data.problem_name;
  if (!("Notification" in window)) {
    // Check if the browser supports notifications
    alert("This browser does not support desktop notification");
  } else if (Notification.permission === "granted") {
    // Check whether notification permissions have already been granted;
    // if so, create a notification
    const notification = new Notification(message);
    // …
  } else if (Notification.permission !== "denied") {
    // We need to ask the user for permission
    Notification.requestPermission().then((permission) => {
      // If the user accepts, let's create a notification
      if (permission === "granted") {
        const notification = new Notification(message);
        // …
      }
    });
  }

  // At last, if the user has denied notifications, and you
  // want to be respectful there is no need to bother them anymore.
} 

function Notifications() {
    Howler.autoUnlock = false;
/* 
    var sound = new Howl({
      src: [my_source],
      volume: 0.8,
      onend: function () {
        console.log("Finished playing!");
      },
      html5: true,
      onplayerror: function () {
        sound.once('unlock', function() {
          sound.play();
        });
      }
    });
*/
    const [sound_effect, setSoundEffect] = useState(new Howl({
      src: [mp3, my_source_success_1, my_source_success_2],
      volume: 0.8,
      onend: function () {
        console.log("Finished playing!");
      },
      onplayerror: function () {
        sound_effect.once('unlock', function() {
          sound_effect.play();
        });
      }
    }));
    
   // === Snack Bar notifiaction === //
   const [state, setState] = React.useState<State>({
    open: false,
    vertical: "top",
    horizontal: "center",
  });
  const { vertical, horizontal, open } = state;

  const handleClick = (newState: SnackbarOrigin) => () => {
    console.log("Great! Got it.")
    setState({ ...newState, open: true });
  };

  const handleClose = () => {
    setState({ ...state, open: false });
  };

  function TransitionRight(props) {
    return <Slide {...props} direction="left" />;
  }

  // let myMap = new Map<string, LastSubmission>();
  let myMap = new Map<string, LastSubmission>();
  myMap.set("user", {
    handle: "username",
    problem_name: "Problem ?",
    date: "2023-08-11",
    link: "https://example.com/problem2",
    verdict: "Wrong Answer",
  });

  // Convert the JSON string back to a Map
  const [all_submissions, setAllSubmissions] = useLocalStorage(
    "all_submissions",
    []
  );

  // === Fecthing friends === //
  let data_friends = [
    {
      id: 0,
      name: "user",
    },
  ];

  data_friends = [];

  // === Using state === //
  const [friends, setFriends] = useLocalStorage("friends", data_friends);
  const [user, setUser] = useLocalStorage("user", "");

  let urls: string[] = friends
    ?.filter((x) => x.name !== "user")
    .map((x) => {
      let handle: string = x.name;
      let url: string =
        "https://codeforces.com/api/user.status?handle=" +
        handle +
        "&from=1&count=2";

      return url;
    });

  // console.log(urls);

  const [lastSub, setLastSub] = useState<LastSubmission>({
    handle: "",
    problem_name: "",
    date: "",
    link: "#",
    verdict: "",
  });

  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [isPending, setIsPending] = useState(false);

  let handle: string = "tourist";
  let url: string =
    "https://codeforces.com/api/user.status?handle=" +
    handle +
    "&from=1&count=2";

  urls.push(url);

  // === Map === //
  try {
    const storedJsonString = localStorage.getItem("recent_notification");
    if (storedJsonString) {
      const parsedArray: [string, LastSubmission][] =
        JSON.parse(storedJsonString);
      myMap = new Map<string, LastSubmission>(parsedArray);
    }
  } catch (error) {
    console.log(error);
  }

  // === Async === //
  useEffect(() => {
    async function load_submissions() {
      try {
        const all_requests = urls.map((x) => {
          const req = axios.get(x);
          return req;
        });

        const AllData = await axios.all(all_requests);
        AllData.forEach((...AllData) => {
          console.log("INSIDE SPREAD: ");
          let handler: string =
            AllData[0].data.result[0].author.members[0].handle;
          console.log("Handler: ", handler);

          const root = AllData[0].data.result[0];

          const data: LastSubmission = {
            handle: handler,
            problem_name: root.problem.name,
            date: new Date(root.creationTimeSeconds * 1000).toLocaleString(),
            link: `https://codeforces.com/contest/${root.contestId}/submission/${root.id}`,
            verdict: root.verdict,
          };

          let res: string = "";

          switch (data.verdict) {
            case "TIME_LIMIT_EXCEEDED":
              res = "TLE";
              break;
            case "OK":
              res = "Accepted";
              break;
            case "WRONG_ANSWER":
              res = "WA";
              break;
            case "TESTING":
              res = "Testing";
              break;
            default:
              res = "WA";
              console.log(data.verdict);
              break;
          }

          data.verdict = res;

          if (res === "Testing") {
            setIsPending(true);
          } else {
            console.log(data);
            if (
              !myMap.has(handler) ||
              myMap.get(handler)?.problem_name !== data.problem_name
            ) {
              handleClick({ vertical: "bottom", horizontal: "right" })

              let old: LastSubmission[] = all_submissions;
              old.push(data);
              setAllSubmissions(old);

              myMap.set(handler, data);
              const mapJson = JSON.stringify([...myMap]);
              localStorage.setItem("recent_notification", mapJson);

              setLastSub(data);

              console.log("Data changed!");
              // Show notification snack-bar
              Notification.requestPermission();
              Notification.requestPermission().then((result) => {
                console.log(result);
              });
              
              showNotification(data);
              notifyMe(data);
              sound_effect.play();
            }
          }
        });
      } catch (err) {
        console.log(err);
      }
    }

    setTimeout(() => {
      load_submissions();
    });
  }, [lastSub]);

  return (
    <AppContext.Provider
      value={{
        all_submissions,
        setAllSubmissions,
        lastSub,
        setLastSub,
        isPending,
        setIsPending,
      }}
    >
      <Box sx={{ width: 500 }}>
        <Snackbar
          anchorOrigin={{ vertical, horizontal }}
          open={open}
          onClose={handleClose}
          message="I love snacks"
          key={vertical + horizontal}
          TransitionComponent={TransitionRight} 
        >
          <div className="snack-notify">
            <div className="left">
              <div className="problem">
                <span onChange={ handleClick({ vertical: "bottom", horizontal: "right" }) }>{lastSub.problem_name}</span>
              </div>
              <div className="time-sub">
                <div>
                  <span>{lastSub.handle}</span>
                </div>
              </div>
            </div>
            <div className={ lastSub.verdict === "WA" ? "wa" : "accepted" }>
              <span>
                {lastSub.verdict === "WA" ? "wrong answer" : "accepted"}
              </span>
            </div>
          </div>
        </Snackbar>
      </Box>

      <div
        className="notifications"
        onClick={handleClick({ vertical: "bottom", horizontal: "right" })}
      >
        <div className="title">
          <span>Recent notifications</span>
        </div>

        <div className="card-notif">
          <CardNotification />
        </div>

        <div>
          <NotificationList />
        </div>
      </div>
    </AppContext.Provider>
  );
}

export default Notifications;