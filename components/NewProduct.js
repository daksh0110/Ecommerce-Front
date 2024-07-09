import React, { useEffect } from "react";
import styled from "styled-components";
import { Center } from "./Center";
import ProductsGrid from "./ProductsGrid";
const Title = styled.h2`
  font-size: 2rem;
  margin: 30px 0 20px;
  font-weight: normal;
`;
const NewProduct = ({ product, wishedProducts }) => {
  return (
    <Center>
      <Title>New Arrivals</Title>

      <ProductsGrid product={product} wishedProducts={wishedProducts[0]} />
    </Center>
  );
};

export default NewProduct;
