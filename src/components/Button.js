import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const StyledButton = styled.button`
  margin: 1rem;
  text-transform: uppercase;
  padding: 1rem;
  height: 3rem;
  cursor: pointer;
  font-size: 16px;
  font-weight: 700;
  background-color: black;
  color: white;

  :hover {
    opacity: 0.75;
  }
`;

const Button = ({ onClick, text }) => {
  return <StyledButton onClick={onClick}>{text}</StyledButton>;
};

export default Button;

Button.propTypes = {
  onClick: PropTypes.func,
  text: PropTypes.string.isRequired,
};
