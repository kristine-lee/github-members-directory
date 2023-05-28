import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const CardContainer = styled.div`
  border: 1px solid rgba(239, 239, 240, 0.5);
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  width: 11rem;
  height: 17rem;
  padding: 2rem;
  text-align: center;
`;

const Avatar = styled.img`
  width: 100%;
  height: 70%;
  object-fit: cover;
  margin-bottom: 1rem;
`;

const ProfileLink = styled.a`
  font-weight: bold;
  color: black;
  font-size: 1.2rem;
  text-decoration: none;

  &:hover {
    color: blue;
    text-decoration: underline;
  }
`;

/***
 * username with link to profile (X)
 * avatar (X)
 * name
 * location
 * email address
 * number of public repositories
 */

const Card = ({ profileUrl, imageUrl, login }) => {
  return (
    <CardContainer>
      <Avatar src={imageUrl} alt="Avatar for " />
      <ProfileLink href={profileUrl}>{login}</ProfileLink>
    </CardContainer>
  );
};

export default Card;

Card.propTypes = {
  profileUrl: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired,
  login: PropTypes.string.isRequired,
};
