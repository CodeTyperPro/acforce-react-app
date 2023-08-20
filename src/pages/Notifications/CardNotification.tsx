import React from "react";
import { useContext } from "react";
import { AppContext } from "../../helper/Context";
import SkeletonElement from "../Skeletons/SkeletonElement";

function CardNotification() {
  const { lastSub } = useContext(AppContext);

  return (
    <>
      {lastSub.problem_name === "" && <SkeletonElement />}

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
