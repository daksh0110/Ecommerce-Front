import React from "react";
import styled from "styled-components";
import ProductBox from "./ProductBox";
const StyledProductGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 14px;
`;
const ProductsGrid = ({ product }) => {
  return (
    <StyledProductGrid>
      {product.length > 0 &&
        product.map((product, index) => (
          <ProductBox key={index} product={product} />
          // <div key={index}>{product.Title}</div>
        ))}
    </StyledProductGrid>
  );
};

export default ProductsGrid;
