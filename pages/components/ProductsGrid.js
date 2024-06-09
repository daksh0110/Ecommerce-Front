import React from "react";
import styled from "styled-components";
import ProductBox from "./ProductBox";
import { RevealList, RevealWrapper } from "next-reveal";

const StyledProductGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 14px;
  @media screen and (min-width: 768px) {
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
`;
const ProductsGrid = ({ product }) => {
  return (
    <StyledProductGrid interval={100} delay={200}>
      {product.length > 0 &&
        product.map((product, index) => (
          <RevealWrapper key={product.id} delay={index * 50}>
            <ProductBox product={product} />
          </RevealWrapper>

          // <div key={index}>{product.Title}</div>
        ))}
    </StyledProductGrid>
  );
};

export default ProductsGrid;
