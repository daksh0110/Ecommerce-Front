/* eslint-disable @next/next/no-img-element */
import React, { useContext } from "react";
import { Center } from "./Center";
import styled from "styled-components";
import Button from "./Button";
import ButtonLink from "./ButtonLink";
import Cart from "./icons/Cart";
import { CartContext } from "./CartContext";
import FlyingButton from "./FlyingButton";
import { RevealWrapper } from "next-reveal";
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

  img.main {
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
              <RevealWrapper origin="left" delay={0}>
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

                  <FlyingButton white id={id} src={featuredproduct.Images[0]}>
                    <Cart />
                    Add to Cart
                  </FlyingButton>
                </ButtonWrapper>
              </RevealWrapper>
            </div>
          </Column>
          <Column>
            <RevealWrapper delay={0}>
              <img
                className="main"
                src="https://media-ik.croma.com/prod/https://media.croma.com/image/upload/v1663415375/Croma%20Assets/Computers%20Peripherals/Laptop/Images/245226_0_miryw4.png?tr=w-640"
                alt="Elegant and Attractive Macbook Transparent Images"
              />
            </RevealWrapper>
          </Column>
        </ColumnWrapper>
      </Center>
    </Bg>
  );
};

export default Featured;
