import React from "react";
import { useContext } from "react";
import { AppContext } from "../../helper/Context";
import SkeletonElement from "../Skeletons/SkeletonElement";
import { useEffect, useState } from "react";

function CardNotification() {
  const { shouldUpdate } = useContext(AppContext);

  const x = {
    handle: "",
    problem_name: "",
    date: "",
    link: "#",
    verdict: "",
  };

  const [lastSub, setLastSub] = useState(JSON.parse(localStorage.getItem('last_submission')) || x);

  useEffect(() => {
    let copy_last = JSON.parse(localStorage.getItem('last_submission')) || x;
    setLastSub(copy_last);
  }, [shouldUpdate])

  return (
    <>
      {(lastSub.problem_name === "" || lastSub === undefined || lastSub === null) && <SkeletonElement />}

      <div className="left">
        <div className="problem">
          <span>{lastSub.problem_name}</span>
        </div>
        <div className="time-sub">
          <div>
            <span>{lastSub.date}</span>
          </div>

          <div>
            {lastSub.link !== "" && lastSub.link !== "#" ? (
              <a href={lastSub.link}>Check submission</a>
            ) : (
              <SkeletonElement />
            )}
          </div>
        </div>
      </div>
      {lastSub.verdict !== "" ? (
        <div className={lastSub.verdict === "wa" ? "wa" : "accepted"}>
          <span>{lastSub.verdict === "wa" ? "wrong answer" : "accepted"}</span>
        </div>
      ) : (
        <SkeletonElement />
      )}
    </>
  );
}

export default CardNotification;
