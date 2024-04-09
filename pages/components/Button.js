import React from "react";
import styled, { css } from "styled-components";

export const ButtonStyle = css`
  border: 0;

  border-radius: 5px;
  cursor: pointer;
  display: inline-flex;
  text-decoration: none;
  svg {
    height: 20px;
    margin-right: 5px;
  }
  ${(props) =>
    props.primary &&
    css`
      background-color: #5145cd;
      color: white;
      border: 1px solid #5145cd;
    `}
  ${(props) =>
    props.white &&
    !props.outline &&
    css`
      background-color: white;
      color: #000;
    `}
  ${(props) =>
    props.white &&
    props.outline &&
    css`
      background-color: transparent;
      color: white;
      border: 1px solid #fff;
    `}
${(props) =>
    props.size === "L" &&
    css`
      font-size: 1.2rem;
      padding: 10px 20px;
      svg {
        height: 20px;
      }
    `}
`;
const StyledButton = styled.button`
  ${ButtonStyle}
`;
const Button = ({ children, ...rest }) => {
  return <StyledButton {...rest}>{children}</StyledButton>;
};

export default Button;
