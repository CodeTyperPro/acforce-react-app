import React, { useContext } from "react";
import { useState } from "react";
import { useEffect } from "react";
import "./NotificationList.css";
import "../Skeletons/Skeleton.css";
import SkeletonElement from "../Skeletons/SkeletonElement";
import { AppContext } from "../../Helper/Context";

type LastSubmission = {
  handle: string;
  problem_name: string;
  date: string;
  link: string;
  verdict: string;
};

function load_submissions() {
  try {
    const storedJsonString = localStorage.getItem("all_submissions");
    if (storedJsonString) {
      const parsedArray: LastSubmission[] = JSON.parse(storedJsonString);
      setAllSubmissions(parsedArray);
    }
  } catch (error) {
    console.log(error);
  }
}

function NotificationList() {
  const { all_submissions, setAllSubmissions } = useContext(AppContext);
  const { read_friend_submissions, setFriendSubmissions } =
    useContext(AppContext);
  const { read_my_submissions, setMySubmissions } = useContext(AppContext);
  const { user, setUser } = useContext(AppContext);

  // load_submissions();

  return (
    <>
      <div className="list">
        {all_submissions &&
          all_submissions // Read according to the settings.
            .filter(
              (data) =>
                (data.handle === user && read_my_submissions === "1") ||
                (data.handle !== user && read_friend_submissions === "1")
            )
            .map((data) => (
              <div className="item">
                <div className="left-user">
                  <span>{data.handle}</span>
                </div>

                <div className="right-detail-notif">
                  <div className="left">
                    <div className="problem">
                      <span>{data.problem_name || <SkeletonElement />}</span>
                    </div>
                    <div className="time-sub">
                      <div className="time">
                        <span>{data.date || <SkeletonElement />}</span>
                      </div>

                      <div className="sub">
                        <a href={data.link}> Check submission </a>
                      </div>
                    </div>
                  </div>

                  <div
                    className={
                      (data.verdict === "wa" ? "wa" : "accepted") ||
                      "Waiting ..."
                    }
                  >
                    <span>{data.verdict === "wa" ? "wa" : "accepted"}</span>
                  </div>
                </div>
              </div>
            ))}
      </div>
    </>
  );
}

export default NotificationList;
