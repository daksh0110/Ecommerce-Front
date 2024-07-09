import React from "react";
import styled from "styled-components";
const StyledDiv = styled.div`
  max-width: 800px;
  margin: 0px auto;
  padding: 0 20px;
`;
export const Center = ({ children }) => {
  return <StyledDiv>{children}</StyledDiv>;
};
