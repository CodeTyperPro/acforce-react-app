import React from "react";
import { useContext } from "react";
import { AppContext } from "../../Helper/Context";
import SkeletonElement from "../Skeletons/SkeletonElement";

function CardNotification() {
  const { lastSub, setLastSub } = useContext(AppContext);
  
  return (
    <>
        <SkeletonElement />
      <div className="left">
        <div className="problem">
          <span>{ lastSub.problem_name }</span>
        </div>
        <div className="time-sub">
          <div>
            <span>{ lastSub.date}</span>
          </div>

          <div>
            {
              (lastSub.link !== "" && lastSub.link !== "#") ? 
              (
                <a href={ lastSub.link }>Check submission</a>
              )
              :
              ( 
                <SkeletonElement />
              )
            }
          </div>
        </div>
      </div>
        {
          lastSub.verdict !== "" ? 
          (
          <div className={lastSub.verdict === "WA" ? "wa" : "accepted"}>
            <span>{lastSub.verdict === "WA" ? "wrong answer" : "accepted"}</span>
          </div>
        ) : 
        (
          <SkeletonElement />
        )
        }
     
    </>
  );
}

export default CardNotification;
