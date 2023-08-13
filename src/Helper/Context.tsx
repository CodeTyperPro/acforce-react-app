import { createContext } from "react";

import React from 'react'
import { useLocalStorage } from "../pages/useLocalStorage";
import axios from "axios";

import { useState } from "react";
import { useEffect } from "react";

type LastSubmission = {
  handle: string;
  problem_name: string;
  date: string;
  link: string;
  verdict: string;
};

type AppContextType = {
  all_submissions: LastSubmission[];
  setAllSubmissions: React.Dispatch<React.SetStateAction<LastSubmission[]>>;
  lastSub: LastSubmission;
  setLastSub: React.Dispatch<React.SetStateAction<LastSubmission>>;
};

export const AppContext = createContext<AppContextType | undefined>(undefined);
