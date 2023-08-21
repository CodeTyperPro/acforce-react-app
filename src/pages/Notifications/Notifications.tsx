import React from "react";
import axios from "axios";
import { Howl, Howler } from "howler";
import CardNotification from "./CardNotification";
import NotificationList from "../NotificationList/NotificationList";
import { useLocalStorage } from "../useLocalStorage";
import { useEffect, useState } from "react";
import { AppContext } from "../../helper/Context";
import Box from "@mui/material/Box";
import Slide from "@mui/material/Slide";
import Snackbar, { SnackbarOrigin } from "@mui/material/Snackbar";
import "../Skeletons/Skeleton.css";
import "./Notifications.css";
import { Mutex, MutexInterface, Semaphore, SemaphoreInterface, withTimeout } from 'async-mutex';
import mp3_success from "./sounds/success_sound.mp3";
import webm_success from "./sounds/success_sound.webm";
import mp3_failure from "./sounds/failure_sound.mp3";
import webm_failure from "./sounds/failure_sound.webm";

// const root_path = "./sounds/";
const tracks = [
  {
    id: 1,
    title: "Success",
    src: [
      mp3_success,
      webm_success /*root_path + "success_sound.mp3" , root_path + "success_sound.webm"*/,
    ],
  },
  {
    id: 2,
    title: "Failure",
    src: [
      mp3_failure,
      webm_failure /*root_path + "failure_sound.mp3", root_path + "failure_sound.webm"*/,
    ],
  },
];

const music_url =
  "https://jesusful.com/wp-content/uploads/music/2021/09/The_Script_-_Hall_of_Fames_(Naijay.com).mp3";

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

function Notifications() {
  Howler.autoUnlock = false;
  const [selectedHowl, setSelectedHowl] = useState(null);
  const [playing, setPlaying] = useState(false);
  const [howl, setHowl] = useState(null);
  const [volume, setVolume] = useLocalStorage("volume", 80);

  const mutex = new Mutex();

  Howler.volume(volume / 100.0);
  function notifyMe(data) {
    let message: string =
      data.handle + " got " + data.verdict + " on " + data.problem_name + ".";

    const options = {
      body: message,
      icon: "../../favicon.ico",
      silent: true,
    };

    let play: boolean = false;

    if (!("Notification" in window)) {
      alert("This browser does not support desktop notification");
    } else if (Notification.permission === "granted") {
      play = true;
    } else if (Notification.permission !== "denied") {
      Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
          play = true;
        }
      });
    }

    if (play) {
      const new_notification = new Notification(
        "AC Force Notification",
        options
      );
    }
  }

  const [success_sound_effect, setSuccessSoundEffect] = useState(
    new Howl({
      src: tracks[0].src,
      autoplay: false,
      volume: volume / 100.0,
      onend: function () {
        console.log("Finished playing!");
      },
      onplayerror: function () {
        success_sound_effect.once("unlock", function () {
          success_sound_effect.play();
        });
      },
    })
  );

  const [failure_sound_effect, setFailureSoundEffect] = useState(
    new Howl({
      src: tracks[1].src,
      onend: function () {
        console.log("Finished playing!");
      },
      onplayerror: function () {
        failure_sound_effect.once("unlock", function () {
          failure_sound_effect.play();
        });
      },
    })
  );

  // === Snack Bar notifiaction === //
  const [state, setState] = React.useState<State>({
    open: false,
    vertical: "top",
    horizontal: "center",
  });
  const { vertical, horizontal, open } = state;

  const handleClick = (newState: SnackbarOrigin) => () => {
    setState({ ...newState, open: true });
  };

  const handleClose = () => {
    setState({ ...state, open: false });
  };

  function TransitionRight(props) {
    return <Slide {...props} direction="left" />;
  }

  let myMap = JSON.parse(localStorage.getItem('recent_notification')) || {};

  // Convert the JSON string back to a Map
  const [all_submissions, setAllSubmissions] = useLocalStorage(
    "all_submissions",
    []
  );

  const [read_friend_submissions, setFriendSubmissions] = useLocalStorage(
    "friends_submission",
    "1"
  );

  const [read_my_submissions, setMySubmissions] = useLocalStorage(
    "my_submission",
    "1"
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
  const [user, setUser] = useLocalStorage("user", "user");

  const add_user = {
    handle: user,
    url:
      "https://codeforces.com/api/user.status?handle=" +
      user +
      "&from=1&count=2",
  };

  let urls: string[] = Array.from(friends);
  urls.push({id: 0, name: user});

  urls = urls
    ?.filter((x) => x.name !== "user")
    .map((x) => {
      let handle: string = x.name;
      let url: string =
        "https://codeforces.com/api/user.status?handle=" +
        handle +
        "&from=1&count=2";
      return url;
    });

    const x = {
      handle: "",
      problem_name: "",
      date: "",
      link: "#",
      verdict: "",
    };

  let lastSub = JSON.parse(localStorage.getItem("last_submission")) || x;

  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [isPending, setIsPending] = useState(false);

  // === Map === //
  try {
      if (myMap[user]) {
        lastSub = myMap[user] || x;
        setShouldUpdate(true);
      }
  } catch (error) {
    console.log(error);
  }

  const [shouldUpdate, setShouldUpdate] = useState(false);

  // setShouldUpdate(false);
  // === Async === //
  useEffect(() => {
    async function load_submissions() {
      
      try {  
        const all_requests = urls.map((x) => {
          return axios.get(x);
        });

      const AllData = await axios.all(all_requests);
      await mutex.runExclusive(async () => {
        for (const response of AllData) {
          if (!response.data.result[0].author.members) continue;

          console.log("This is the user: ", user);
      
          const handle = response.data.result[0].author.members[0].handle;
      
          const root = response.data.result[0];
          const data = {
            handle: handle,
            problem_name: root.problem.name,
            date: new Date(root.creationTimeSeconds * 1000).toLocaleString(),
            link: `https://codeforces.com/contest/${root.contestId}/submission/${root.id}`,
            verdict: root.verdict,
          };
      
          let res = "";
          switch (data.verdict) {
            case "TIME_LIMIT_EXCEEDED":
              res = "tle";
              break;
            case "OK":
              res = "accepted";
              break;
            case "WRONG_ANSWER":
              res = "wa";
              break;
            case "TESTING":
              res = "testing";
              break;
            default:
              res = "wa";
              break;
          }
      
          const value_map = myMap[handle.toLowerCase()];
      
          if (
            value_map?.problem_name === data.problem_name &&
            value_map?.date === data.date
          )
            continue;
      
          data.verdict = res;
      
          let copy_array = JSON.parse(localStorage.getItem('all_submissions')) || [];
          copy_array.push(data);
          localStorage.setItem('all_submissions', JSON.stringify(copy_array));
      
          let new_map_json = { ...myMap };
          new_map_json[data.handle.toLowerCase()] = data;
          myMap = new_map_json;
          console.log("After: ", new_map_json);
      
          console.log("Handle: ", data.handle);
      
          if (data.handle.toLowerCase() === user?.toLowerCase()) {
            // setLastSub(data);
            localStorage.setItem('last_submission', JSON.stringify(data));
            console.log("Got It!");
          }
      
          notifyMe(data);
      
          if (data.verdict === "accepted") {
            success_sound_effect.play();
          } else {
            failure_sound_effect.play();
          }
      
          if (!shouldUpdate) {
            setShouldUpdate(true);
            localStorage.setItem('recent_notification', JSON.stringify(myMap));
            // localStorage.setItem('all_submissions', JSON.stringify(copy_array));
          }
        }
        
      });
      
      } catch(err) {
        console.log(err);
      }

    }
  
    setTimeout(() => {
      try {  
        load_submissions();
      } catch(err) {
        console.log(err);
      }
    }, 5000);
  }, [shouldUpdate]);
  
  return (
    <AppContext.Provider
      value={{
        all_submissions,
        lastSub,
        isPending,
        read_friend_submissions,
        read_my_submissions,
        user,
        shouldUpdate
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
                <span>{lastSub.problem_name}</span>
              </div>
              <div className="time-sub">
                <div>
                  <span>{lastSub.handle}</span>
                </div>
              </div>
            </div>
            <div className={lastSub.verdict === "wa" ? "wa" : "accepted"}>
              <span>
                {lastSub.verdict === "wa" ? "wrong answer" : "accepted"}
              </span>
            </div>
          </div>
        </Snackbar>
      </Box>

      <div className="notifications">
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
