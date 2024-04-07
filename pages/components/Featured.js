/* eslint-disable @next/next/no-img-element */
import React from "react";
import { Center } from "./Center";
import styled from "styled-components";
const Bg = styled.div`
  background-color: #222;
  color: white;
  padding: 50px 0;
`;
const Title = styled.h1`
  margin: 0;

  font-weight: normal;
`;
const Disc = styled.p`
  color: #aaa;
  font-size: 0.8rem;
`;
const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  img {
    max-width: 100%;
  }
`;
const Featured = () => {
  return (
    <Bg>
      <Center>
        <Wrapper>
          <div>
            <Title>Pro anywhere</Title>
            <Disc>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Amet
              cursus sit amet dictum sit amet justo.
            </Disc>
          </div>
          <div className="">
            <img
              className=""
              src="https://freepngimg.com/thumb/macbook/28662-2-macbook-transparent-background.png"
              alt="Elegant and Attractive Macbook Transparent Images"
            />
          </div>
        </Wrapper>
      </Center>
    </Bg>
  );
};

export default Featured;
