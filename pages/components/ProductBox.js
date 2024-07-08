import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import Button, { ButtonStyle } from "./Button";
import Cart from "./icons/Cart";
import Link from "next/link";
import { CartContext } from "./CartContext";
import Image from "next/image";
import FlyingButton from "./FlyingButton";
import HeartOutlineIcon from "./icons/HeartOutLineIcon";
import HeartSolidIcon from "./icons/HeartSolidIcon";
import axios from "axios";
const ProductWrapper = styled.div`
  button {
    width: 100%;
    text-align: center;
    justify-content: center;
  }
`;
const PrimartColor = "#5542f6";
const WhiteBox = styled(Link)`
  background-color: white;
  padding: 20px;
  height: 120px;
  position: relative;
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
const WishlistButton = styled.button`
  border: 0;
  width: 40px !important;
  height: 40px;
  padding: 10px;
  position: absolute;
  top: 0;
  right: 0;
  background: transparent;
  ${(props) =>
    props.wished
      ? `
  color:red;
  `
      : `
  color:black
  `}
  svg {
    cursor: pointer;
    width: 16px;
  }
`;

const ProductBox = ({
  product,
  wished = false,
  onRemoveFromList = () => {},
}) => {
  const url = "/product/" + product.id;
  const { addProduct } = useContext(CartContext);
  const [isWished, setIsWished] = useState(wished);
  useEffect(() => {
    console.log("wished chnaged");
    console.log(isWished);
  }, [isWished]);
  function addToWhishlist(ev) {
    ev.preventDefault();
    ev.stopPropagation();
    const value = !isWished;
    if (value === false && onRemoveFromList) {
      onRemoveFromList(product.id);
    }
    setIsWished((prev) => !prev);
    axios
      .post("/api/wishlist", { productId: product.id, value: value })
      .then((response) => {
        setIsWished(response.data);
      });
  }

  return (
    <ProductWrapper>
      <WhiteBox href={url}>
        <div>
          <WishlistButton wished={isWished} onClick={addToWhishlist}>
            {isWished ? <HeartSolidIcon /> : <HeartOutlineIcon />}
          </WishlistButton>
          <img src={product?.Images[0]} />
        </div>
      </WhiteBox>
      <ProductInfoBox>
        {" "}
        <Title href={url}>{product.Title}</Title>
        <PriceRow>
          <Price>Rs {product.Price}</Price>
        </PriceRow>
        <FlyingButton id={product.id} src={product?.Images[0]}>
          Add To Cart
        </FlyingButton>
      </ProductInfoBox>
    </ProductWrapper>
  );
};

export default ProductBox;
