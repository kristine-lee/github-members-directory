import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const StyledButton = styled.button`
  display: flex;
  justify-content: center;
  margin: 1rem;
  text-transform: uppercase;
  height: 3rem;
  max-width: 9rem;
`;

const Button = ({ onClick, text }) => {
  return <StyledButton onClick={onClick}>{text}</StyledButton>;
};

export default Button;

Button.propTypes = {
  onClick: PropTypes.func,
  text: PropTypes.string.isRequired,
};
