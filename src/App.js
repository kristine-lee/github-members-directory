import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";

const API_KEY = process.env.REACT_APP_API_KEY;
const URL = 'https://api.github.com/users?per_page=10';

//TODO: move these functions and the ^ constants to utils
const fetchUsers = async (since) => {
  const response = await fetch(`${URL}&since=${since}`, {
    headers: {
      Authorization: `Bearer ${API_KEY}`
    }
  });
  const data = await response.json();
  return { data, linkHeader: response.headers.get("Link")};
}

//TODO: think about optimizing this function. JS string manipulation is more performant than regex (but this is also basically using regex so idk)
const extractNextPageSince = (linkHeader) => {
  if (!linkHeader) return 0;

  const nextPageUrl = linkHeader
    .split(',')
    .find((link) => link.includes('rel="next"'));
  if (!nextPageUrl) return 0;

  const nextPageSince = nextPageUrl
    .split(';')[0]
    .match(/since=(\d+)/)[1];

  return parseInt(nextPageSince, 10);
};

function App() {
  const [since, setSince] = useState(0);
  const [users, setUsers] = useState([]);
  const [nextSince, setNextSince] = useState(0); //TODO: is storing nextSince really the best way to go about it?
  //TODO: NOT completely necessary but could we refactor this using React Query later? if that makes more sense? React Query is a lil weird with keeping data in state though...

  useEffect(() => {
    //   //TODO: make the query params cleaner... can i do it without using "?per_page" directly
    //   // when someone clicks the button, we wanna make a new call
    //   // we want the "next" header's "since"
    //   // we're using "since" as a query param
    //   // basically we're checking 2 things when we click button:
    //   // 1. is there a "next" and 2. what is the next's since
    //   // and if 1 is true, we make api call with 2.
    //   // could even add a previous <-- button if we replicate that logic above

    fetchUsers(since)
    .then((res) => {
      setUsers(res.data);
      return res.linkHeader;
    }).then((header) => {
      console.log("did it get here", header)
      const upcomingSince = extractNextPageSince(header);
      setNextSince(upcomingSince);
    })
    .catch((error) => {
      console.error(error);
    });

  }, [since]);

  const handleNextClick = () => {
    const toBe = nextSince;
    setSince(toBe);
  }

  // this is just for logging
  useEffect(() => {
    console.log("users", users)
    console.log("since", since, "nextsince", nextSince)
  }, [users])

  return (
    <div className="App">
      <p>Fun stuff</p>
      {}
      <ul>{users?.map((user, index) => {
        return <li key={index}>{user.login}</li>
      })}</ul>
      <button onClick={() => handleNextClick()}>Next</button>
    </div>
  );
}

export default App;
