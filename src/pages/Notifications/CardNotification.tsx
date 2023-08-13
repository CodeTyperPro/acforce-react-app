import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { type } from "@testing-library/user-event/dist/type";
import { useLocalStorage } from "../useLocalStorage";
import { parse } from "path";
import { useContext } from "react";
import { AppContext } from "../../Helper/Context";
import SkeletonElement from "../Skeletons/SkeletonElement";

type LastSubmission = {
  handle: string;
  problem_name: string;
  date: string;
  link: string;
  verdict: string;
};

function CardNotification() {
  const { lastSub, setLastSub } = useContext(AppContext);
  // console.log("Prop card: ", lastSub);
  return (
    <>
      <div className="left">
        <div className="problem">
          <span>{ lastSub.problem_name || <SkeletonElement /> }</span>
        </div>
        <div className="time-sub">
          <div>
            <span>{ lastSub.date || <SkeletonElement />}</span>
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
