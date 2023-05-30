import React from "react";
import styled from "styled-components";

const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 50vh;
`;

const ErrorHeading = styled.h2`
  font-size: 24px;
`;

const ErrorLink = styled.a`
  margin-bottom: 20px;
  text-decoration: none;

  &:hover {
    color: black;
    text-decoration: underline;
    background-color: rgba(236, 187, 212, 0.56);
  }
`;

const Error = () => {
  return (
    <ErrorContainer>
      <ErrorHeading>Something went wrong!😱</ErrorHeading>
      <ErrorLink href="/">Return to home page</ErrorLink>
    </ErrorContainer>
  );
};

export default Error;
