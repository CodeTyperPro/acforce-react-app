import React from "react";
import "./Notifications.css";
import CardNotification from "./CardNotification";
import NotificationList from "../NotificationList/NotificationList";
import { useLocalStorage } from "../useLocalStorage";
import { useEffect, useState } from "react";
import axios from "axios";
import { AppContext } from "../../Helper/Context";
import "../Skeletons/Skeleton.css";
import Box from "@mui/material/Box";
import Slide from "@mui/material/Slide";
import Snackbar, { SnackbarOrigin } from "@mui/material/Snackbar";
import { Howl, Howler } from "howler";
import mp3_success from "../../sounds/success_sound.mp3";
import mp3_failure from "../../sounds/failure_sound.mp3";

const my_source_success_1 = "sounds/success_sound.mp3";
const my_source_success_2 = "sounds/success_sound.webm";
const my_source_failure_1 = "sounds/failure_sound.mp3";
const my_source_failure_2 = "sounds/failure_sound.webm";
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
    const new_notification = new Notification("AC Force Notification", options);
  }
}

function Notifications() {
  Howler.autoUnlock = false;

  const [volume, setVolume] = useLocalStorage("volume", 80);

  const [success_sound_effect, setSuccessSoundEffect] = useState(
    new Howl({
      src: [mp3_success, my_source_success_1, my_source_success_2],
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
      src: [mp3_failure, my_source_failure_1, my_source_failure_2],
      volume: volume / 100.0,
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

  const [lastSub, setLastSub] = useLocalStorage("last_submission", {
    handle: "",
    problem_name: "",
    date: "",
    link: "#",
    verdict: ""
  });

  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [isPending, setIsPending] = useState(false);

  let handle: string = user;
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

      if (myMap.get(user)) {
        let last_copy: LastSubmission = myMap.get(user);
        setLastSub(JSON.parse(last_copy));        
      }

    }
  } catch (error) {
    console.log(error);
  }

  // ===
  function addSubmissionAndNotify(data) {
    const updatedSubmissions = [data, ...all_submissions];
    setAllSubmissions(updatedSubmissions);
    handleClick({ vertical: "bottom", horizontal: "right" });
    const save = JSON.stringify([...updatedSubmissions]);
    localStorage.setItem("all_submissions", save);
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

          data.verdict = res;
          if (res === "testing") {
            setIsPending(true);
          } else {
            // console.log(data);
            if (
              !myMap.has(handler) ||
              (myMap.get(handler)?.problem_name !== data.problem_name &&
                myMap.get(handler)?.verdict === data.verdict)
            ) {
              addSubmissionAndNotify(data);

              myMap.set(handler, data);
              const mapJson = JSON.stringify([...myMap]);
              localStorage.setItem("recent_notification", mapJson);

              console.log("User: ", user);
              console.log("Handle: ", data.handle);

              if (data.handle.toLowerCase() === user?.toLowerCase()) {
                // setLastSub(data);
                setLastSub(data);
                console.log("Got It!");
              }

              notifyMe(data);

              if (data.verdict === "accepted") {
                success_sound_effect.play();
              } else {
                failure_sound_effect.play();
              }
            }
          }

        });
      } catch (err) {
        console.log(err);
      }
    }

    setTimeout(() => {
      load_submissions();
    }, 2000);
  }, [all_submissions]);

  return (
    <AppContext.Provider
      value={{
        all_submissions,
        setAllSubmissions,
        lastSub,
        isPending,
        setIsPending,
        read_friend_submissions,
        read_my_submissions,
        setFriendSubmissions,
        setMySubmissions,
        user,
        setUser,
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
