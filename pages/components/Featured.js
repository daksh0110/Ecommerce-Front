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
const Title = styled.h1`
  margin: 0;
  font-size: 1%.5rem;
  font-weight: normal;
  @media screen and (min-width: 768px) {
    font-size: 3rem;
  }
`;
const Disc = styled.p`
  color: #aaa;
  font-size: 0.8rem;
`;
const ColumnWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  div:nth-child(1) {
    order: 2;
  }

  img {
    max-width: 100%;
    max-height: 200px;
    display: block;
    margin: 0 auto;
  }
  @media screen and (min-width: 768px) {
    grid-template-columns: 1.1fr 0.9fr;
    div:nth-child(1) {
      order: 0;
    }

    img {
      max-width: 100%;
    }
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
        <ColumnWrapper>
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
              src="https://media-ik.croma.com/prod/https://media.croma.com/image/upload/v1663415375/Croma%20Assets/Computers%20Peripherals/Laptop/Images/245226_0_miryw4.png?tr=w-640"
              alt="Elegant and Attractive Macbook Transparent Images"
            />
          </div>
        </ColumnWrapper>
      </Center>
    </Bg>
  );
};

export default Featured;
