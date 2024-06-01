import React from "react";
import ProductBox from "./ProductBox";
import { styled } from "styled-components";
const StyledProductsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 50px;
  padding: 20px;
  @media screen and (min-width: 768px) {
    padding-top: 20px;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    gap: 30px;
  }
`;
const ProductsGrid = ({ products }) => {
  return (
    <StyledProductsGrid>
      {products?.map((product) => (
        <ProductBox {...product} key={product._id} />
      ))}
    </StyledProductsGrid>
  );
};

export default ProductsGrid;
