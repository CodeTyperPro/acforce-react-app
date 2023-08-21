import React, { useContext } from "react";
import "./NotificationList.css";
import "../Skeletons/Skeleton.css";
import SkeletonElement from "../Skeletons/SkeletonElement";
import { AppContext } from "../../helper/Context";
import { useLocalStorage } from "../useLocalStorage";
import { useEffect, useState } from "react";

function NotificationList() {
  //const { all_submissions } = useContext(AppContext);
  const { read_friend_submissions } = useContext(AppContext);
  const { read_my_submissions } = useContext(AppContext);
  const { user } = useContext(AppContext);
  const { shouldUpdate } = useContext(AppContext);

  const [all_submissions, setAllSubmissions] = useState(JSON.parse(localStorage.getItem('all_submissions')) || []);

  useEffect(() => {
    let copy_array = JSON.parse(localStorage.getItem('all_submissions')) || [];
    setAllSubmissions([...copy_array].reverse());
  }, [shouldUpdate])

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
            .map((data, index) => (
              
              <div className="item" key={index}>
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
