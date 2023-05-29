import React, { useState, useEffect } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { getUserDetails } from "../utils/utils";

const StyledCard = styled.div`
  border: 1px solid rgba(239, 239, 240, 0.5);
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  width: 16rem;
  height: 18rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-bottom: 0.25rem;

  // @media (max-width: 1205px) { //idk maybe take it out maybe not
  //   width: 50%;
  // } //TODO: clean up styles before submission
`;

const CardUpperHalf = styled.div`
  display: flex;
  align-items: flex-start;
  padding: 1rem;
  background-color: black;
  color: white;
  height: 7rem;
`;

const Avatar = styled.img`
  width: 5rem;
  height: 5rem;
  object-fit: cover;
  border-radius: 50%;
  margin-right: 1rem;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
`;

const StyledName = styled.h3`
  margin-bottom: -0.5rem;
`;

const StyledLocation = styled.p`
  color: gray;
  font-size: 80%;
`;

const NameLocationContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const CardLowerHalf = styled.div`
  display: flex;
  padding: 2rem;
  flex-direction: column;
  align-items: center;
`;

const ProfileDetail = styled.p`
  margin-bottom: -0.5rem;
`;

const ProfileLink = styled.a`
  padding: 0 1rem;
  text-decoration: none;
  font-weight: bold;
  transition: color 0.3s;
  color: rgba(86, 86, 75, 0.71);

  &:hover {
    color: black;
    text-decoration: underline;
    background-color: rgba(238, 240, 178, 0.44);
  }
`;

const Card = ({ username }) => {
  const [loading, setLoading] = useState(true);
  const [userDetails, setUserDetails] = useState({});

  useEffect(() => {
    try {
      getUserDetails(username).then((response) => {
        setLoading(false);
        setUserDetails(response);
      });
    } catch (error) {
      console.error(error);
    }
  }, [username]);

  return (
    <StyledCard data-cy="card">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <CardUpperHalf>
            <Avatar
              src={userDetails.avatar_url}
              alt={`Avatar for ${username}`}
              data-cy="avatar"
            />
            <NameLocationContainer>
              {userDetails.name ? (
                <StyledName>{userDetails.name}</StyledName>
              ) : (
                <StyledName>{username}</StyledName>
              )}
              {userDetails.location ? (
                <StyledLocation>{userDetails.location}</StyledLocation>
              ) : (
                <StyledLocation>No location given</StyledLocation>
              )}
            </NameLocationContainer>
          </CardUpperHalf>
          <CardLowerHalf>
            {
              <ProfileDetail>
                {userDetails.public_repos} public repos
              </ProfileDetail>
            }
            {userDetails.email ? (
              <ProfileDetail>{userDetails.email}</ProfileDetail>
            ) : (
              <ProfileDetail>Email not available</ProfileDetail>
            )}
            <ProfileDetail>
              <ProfileLink href={userDetails.html_url} data-cy="github-link">
                {username}
              </ProfileLink>
            </ProfileDetail>
          </CardLowerHalf>
        </>
      )}
    </StyledCard>
  );
};

export default Card;

Card.propTypes = {
  username: PropTypes.string.isRequired,
};
