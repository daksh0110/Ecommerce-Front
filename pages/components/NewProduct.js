import React from "react";
import styled from "styled-components";
import { Center } from "./Center";
import ProductBox from "./ProductBox";
const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 14px;
  padding-top: 30px;
`;
const NewProduct = ({ newproduct }) => {
  return (
    <Center>
      <ProductGrid>
        {newproduct.length > 0 &&
          newproduct.map((product, index) => (
            <ProductBox key={index} product={product} />
            // <div key={index}>{product.Title}</div>
          ))}
      </ProductGrid>
    </Center>
  );
};

export default NewProduct;
