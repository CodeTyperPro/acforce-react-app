import React from "react";
import "./NotificationList.css";

function NotificationList() {
  return (
    <>
      <div className="item">
        <div className="left-user">
          <span>CodeTyper</span>
        </div>

        <div className="right-detail-notif">
          <div className="left">
            <div className="problem">
              <span>Problem A - E Power of Points</span>
            </div>
            <div className="time-sub">
              <div className="time">
                <span>07 August 2023 21:45</span>
              </div>

              <div className="sub">
                <a href="#">
                    <span> 
                        Check submission
                    </span>
                </a>
              </div>
            </div>
          </div>

          <div className="accepted">
            <span>Accepted</span>
          </div>
        </div>
      </div>
    </>
  );
}

export default NotificationList;
