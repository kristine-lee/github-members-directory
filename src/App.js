import React, { useState, useEffect, useCallback } from "react";
import { fetchUsers, extractNextPageSince } from "./utils/utils";


function App() {
  const [since, setSince] = useState(0);
  const [users, setUsers] = useState([]);
  const [nextSince, setNextSince] = useState(0);

  useEffect(() => {
    //   //TODO: make the query params cleaner... can i do it without using "?per_page" directly
    //   // when someone clicks the button, we wanna make a new call
    //   // we want the "next" header's "since"
    //   // we're using "since" as a query param
    //   // basically we're checking 2 things when we click button:
    //   // 1. is there a "next" and 2. what is the next's since
    //   // and if 1 is true, we make api call with 2.
    //   // could even add a previous <-- button if we replicate that logic above
    //  // returned link headers do not include "prev"

    fetchUsers(since)
    .then((res) => {
      setUsers(res.members);
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

  /*
    Clicking the "Next" button stores the nextSince value in the since state, triggering a re-fetching of users
   */
  const handleNextClick = useCallback(() => {
    setSince(nextSince);
  }, [nextSince]);

  // this is just for logging
  useEffect(() => {
    console.log("users", users)
    console.log("since", since, "nextsince", nextSince)
  }, [users])

  return (
    <div className="App">
      <p>Fun stuff</p>
      <ul>{users?.map((user, index) => {
        return <li key={index}>{user.login}</li>
      })}</ul>
      <button onClick={() => handleNextClick()}>Next</button>
    </div>
  );
}

export default App;
