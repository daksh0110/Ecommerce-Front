import Link from "next/link";
import React from "react";
import { ButtonStyle } from "./Button";
import styled from "styled-components";
const StyledLink = styled(Link)`
  ${ButtonStyle}
`;
const ButtonLink = (props) => {
  return <StyledLink {...props} />;
};

export default ButtonLink;
