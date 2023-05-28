import React, { useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import { fetchUsers, extractNextPageSince } from "./utils/utils";
import Card from "./components/Card";
import Button from "./components/Button";
import Heading from "./components/Heading";

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const CardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-gap: 1rem;
  justify-items: center;
  padding: 1.5rem;

  @media (max-width: 1277px) {
    grid-template-columns: repeat(2, 1fr);
    justify-content: center;
  }

  @media (max-width: 600px) {
    grid-template-columns: repeat(1, 1fr); /* 1 column for mobile devices */
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 1.5rem;
`;

function App() {
  const [since, setSince] = useState(0);
  const [users, setUsers] = useState([]);
  const [nextSince, setNextSince] = useState(0);

  useEffect(() => {
    try {
      fetchUsers(since)
        .then((res) => {
          setUsers(res.members);
          return res.linkHeader;
        })
        .then((header) => {
          console.log("did it get here", header);
          const upcomingSince = extractNextPageSince(header);
          setNextSince(upcomingSince);
        });
    } catch (error) {
      console.error(error);
    }
  }, [since]);

  /*
    Clicking the "Next" button stores the nextSince value in the since state, triggering a re-fetching of users
   */
  const handleNextClick = useCallback(() => {
    setSince(nextSince);
  }, [nextSince]);

  // this is just for logging
  useEffect(() => {
    console.log("users", users);
    console.log("since", since, "nextsince", nextSince);
  }, [users]);

  return (
    <AppContainer>
      <Heading text={"Github Members Directory"} />
      <CardContainer>
        {users?.map((user, index) => {
          return <Card key={index} username={user.login} />;
        })}
      </CardContainer>
      <ButtonContainer>
        <Button onClick={handleNextClick} text={"Next"} />
      </ButtonContainer>
    </AppContainer>
  );
}

export default App;
