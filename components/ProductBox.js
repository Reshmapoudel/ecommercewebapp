import Image from "next/image";
import React, { useContext } from "react";
import { styled } from "styled-components";
import Button from "./Button";
import CartIcon from "./icons/CartIcon";
import Link from "next/link";
import { CartContext } from "./CarContext";
const ProductWrapper = styled.div``;
const WhiteBox = styled(Link)`
  background-color: #fff;
  padding: 20px;
  height: 150px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  img {
    max-width: 100%;
    max-height: 100%;
  }
  @media screen and (min-width: 768px) {
    height: 120px;
  }
`;
const Title = styled(Link)`
  color: inherit;
  text-decoration: none;
  font-weight: normal;
  font-size: 1rem;
  margin: 0;
`;
const ProductInfoBox = styled.div`
  margin-top: 5px;
`;
const PriceRow = styled.div`
  display: block;
  align-items: center;
  justify-content: space-between;
  margin-top: 2px;
  @media screen and (min-width: 768px) {
    display: flex;
  }
`;
const Price = styled.div`
  font-size: 1rem;
  padding-top: 6px;
  font-weight: 600;
  text-align: right;
  @media screen and (min-width: 768px) {
    padding: 0;
    font-size: 1.5rem;
    text-align: left;
    font-weight: 600;
  }
`;
const ProductBox = ({ _id, title, description, price, images }) => {
  const { addProduct } = useContext(CartContext);
  const url = "/product/" + _id;
  return (
    <ProductWrapper>
      <WhiteBox href={url}>
        <div>
          {" "}
          <img src={images?.[0]} alt={title} />
        </div>
      </WhiteBox>
      <ProductInfoBox>
        <Title href={url}>{title}</Title>
        <PriceRow>
          <Price>${price}</Price>
          <Button block primary outline onClick={() => addProduct(_id)}>
            {/* <CartIcon /> */}
            Add to Cart
          </Button>
        </PriceRow>
      </ProductInfoBox>
    </ProductWrapper>
  );
};

export default ProductBox;
