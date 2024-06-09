"use client";
import React from "react";
import styled, { css } from "styled-components";
export const PrimartColor = "#5542f6";
export const ButtonStyle = css`
  border: 0;
  padding: 5px 8px;
  border-radius: 5px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  text-decoration: none;
  font-weight: 500;
  font-family: "Poppins", sans-serif;
  font-size: 16px;
  svg {
    height: 20px;
    margin-right: 5px;
  }
  ${(props) =>
    props.block &&
    css`
      display: block;
      width: 100%;
      padding: 6px;
    `}

  ${(props) =>
    props.primary &&
    !props.outline &&
    css`
      background-color: ${PrimartColor};
      color: white;
      border: 1px solid ${PrimartColor};
    `}
  ${(props) =>
    props.primary &&
    props.outline &&
    css`
      background-color: transparent;
      color: ${PrimartColor};
      border: 1px solid ${PrimartColor};
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
    props.black &&
    !props.outline &&
    css`
      background-color: #000;
      color: white;
    `}
  ${(props) =>
    props.black &&
    props.outline &&
    css`
      background-color: transparent;
      color: #000;
      border: 1px solid #000;
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
