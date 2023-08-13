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

function NotificationList(props: any) {
  // console.log("Props: ", props);
  const [data, setData] = useState(props);
  const { all_submissions, setAllSubmissions } = useContext(AppContext);

  return (
    <>
      <div className="list">
        {all_submissions &&
          all_submissions.map((data) => (
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
                    (data.verdict === "WA" ? "wa" : "accepted") ||
                    "Waiting ..."
                  }
                >
                  <span>{data.verdict === "WA" ? "wa" : "accepted"}</span>
                </div>
              </div>
            </div>
          ))}
      </div>
    </>
  );
}

export default NotificationList;
