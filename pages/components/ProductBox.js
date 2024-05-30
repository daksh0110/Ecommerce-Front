import React, { useContext } from "react";
import styled from "styled-components";
import Button from "./Button";
import Cart from "./icons/Cart";
import Link from "next/link";
import { CartContext } from "./CartContext";
const ProductWrapper = styled.div``;

const WhiteBox = styled(Link)`
  background-color: white;
  padding: 20px;
  height: 120px;

  text-align: center;
  display: flex;
  align-items: center;
  align-content: center;
  justify-content: center;
  border-radius: 10px;
  img {
    max-width: 100%;
    max-height: 150px;
  }
`;
const Title = styled(Link)`
  font-weight: normal;
  font-size: 0.9rem;
  margin: 0;
  color: inherit;
  text-decoration: none;
`;
const ProductInfoBox = styled.div`
  margin-top: 5px;
`;
const PriceRow = styled.div`
  display: block;
  align-items: center;
  justify-content: space-between;
  margin: 2px;
  @media screen and (min-width: 768px) {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 2px;
  }
`;
const Price = styled.div`
  font-size: 1rem;
  font-weight: 400;
  text-align: right;
  @media screen and (min-width: 768px) {
    font-size: 1.3rem;
    font-weight: bold;
  }
`;
const ProductBox = ({ product }) => {
  const url = "/product/" + product.id;
  const { addProduct } = useContext(CartContext);
  return (
    <ProductWrapper>
      <WhiteBox href={url}>
        <img src={product.Images[0]} />
      </WhiteBox>
      <ProductInfoBox>
        {" "}
        <Title href={url}>{product.Title}</Title>
        <PriceRow>
          <Price>Rs {product.Price}</Price>
        </PriceRow>
        <Button primary block outline onClick={() => addProduct(product.id)}>
          Add to cart
        </Button>
      </ProductInfoBox>
    </ProductWrapper>
  );
};

export default ProductBox;