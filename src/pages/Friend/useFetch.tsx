import React from 'react';
import { useState, useEffect } from "react";

// "http://localhost:8000/friends
const useFetch = (url: string) => {  
    const [data, setData] = useState(null);
    const abort_count = new AbortController();

    { /* 
    useEffect(() => {
        setTimeout(() => {
          fetch(url, { signal: abort_count.signal })
            .then((res) => {
              if (!res.ok) {
                console.log(res);
                throw Error('Could not fetch the data from the Server')
              }
             
              return res.json();
            })
            .then((data) => {
                setData(data);
            }).catch(err => {
                if (err.name === 'AbortError') {
                    console.log("Fetch aborted!");
                } else {
                    console.log(err.message);
                }
            })
        }, 1000)

        return () => abort_count.abort();
      }, [url]);

  */ }
    return data;
}

export default useFetch;