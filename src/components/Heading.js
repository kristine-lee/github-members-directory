import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const StyledHeading = styled.h1`
  text-align: center;
  text-decoration: none;
`;

const Heading = ({ text }) => {
  return <StyledHeading>{text}</StyledHeading>;
};

export default Heading;

Heading.propTypes = {
  text: PropTypes.string.isRequired,
};
