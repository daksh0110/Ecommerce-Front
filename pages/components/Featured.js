/* eslint-disable @next/next/no-img-element */
import React, { useContext } from "react";
import { Center } from "./Center";
import styled from "styled-components";
import Button from "./Button";
import ButtonLink from "./ButtonLink";
import Cart from "./icons/Cart";
import { CartContext } from "./CartContext";
const Bg = styled.div`
  background-color: #222;
  color: white;
  padding: 50px 0;
`;
export const Title = styled.h1`
  margin: 0;
  font-size: 3rem;
  font-weight: normal;
`;
const Disc = styled.p`
  color: #aaa;
  font-size: 0.8rem;
`;
const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1.1fr 0.9fr;
  img {
    max-width: 100%;
  }
`;
const Column = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;
const ButtonWrapper = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 20px;
`;
const Featured = ({ featuredproduct, id }) => {
  const { addProduct } = useContext(CartContext);
  function addFeaturedToCart() {
    addProduct(id);
  }
  return (
    <Bg>
      <Center>
        <Wrapper>
          <Column>
            <div>
              <Title>{featuredproduct.Title}</Title>
              <Disc>{featuredproduct.Description}</Disc>
              <ButtonWrapper>
                <ButtonLink
                  href={"/products/" + id}
                  outline={1}
                  white={1}
                  size="L"
                >
                  Read more
                </ButtonLink>
                <ButtonLink
                  onClick={addFeaturedToCart}
                  href={""}
                  size="L"
                  white
                >
                  <Cart />
                  Add to Cart
                </ButtonLink>
              </ButtonWrapper>
            </div>
          </Column>
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
