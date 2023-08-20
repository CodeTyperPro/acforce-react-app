import React from "react";

const root_path = "sounds/"
const tracks = [
  {
    id: 1,
    title: "Success",
    src: [root_path + "success_sound.mp3", root_path + "success_sound.webm"],
  },
  {
    id: 2,
    title: "Failure",
    src: [root_path + "failure_sound.mp3", root_path + "failure_sound.webm"],
  }
];

function Tracks() {
  return <div>Tracks</div>;
}

export default Tracks;
