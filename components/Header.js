import Link from "next/link";
import React, { useContext, useState } from "react";
import styled from "styled-components";
import Center from "./Center";
import { CartContext } from "./CarContext";
import BarsIcon from "./icons/BarsIcon";
const StyledHeader = styled.header`
  background-color: #222;
  padding: 0;
`;
const Logo = styled(Link)`
  color: #fff;
  text-decoration: none;
  position: relative;
  z-index: 3;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px 0;
`;
const NavLink = styled(Link)`
  display: block;
  color: #aaa;
  text-decoration: none;
  padding: 10px 0;
  @media screen and (min-width: 768px) {
    padding: 0;
  }
`;
const StyledNav = styled.nav`
  /* ${(props) =>
    props.mobileNavActive ? `display: block` : ` display: none`} */
  ${(props) =>
    props.mobileNavActive
      ? `  display: block ;
`
      : `  display:none;
`}
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  gap: 15px;
  padding: 50px 20px 20px;
  background-color: #222;
  @media screen and (min-width: 768px) {
    display: flex;
    position: static;
    padding: 0;
  }
`;
const NavButton = styled.button`
  background-color: transparent;
  width: 40px;
  height: 40px;
  border: 0;
  color: white;
  cursor: pointer;
  position: relative;
  z-index: 3;
  @media screen and (min-width: 768px) {
    display: none;
  }
`;
const Header = () => {
  const { cartProducts } = useContext(CartContext);
  const [mobileNavActive, setMobileNavActive] = useState(false);
  console.log(mobileNavActive, "oooo");
  return (
    <StyledHeader>
      <Center>
        <Wrapper>
          <Logo href={"/"}>Ecommerce</Logo>
          <StyledNav mobileNavActive={mobileNavActive}>
            <NavLink href={"/"}>Home</NavLink>
            <NavLink href={"/products"}>All Products</NavLink>
            {/* <NavLink href={"categories"}>Categories</NavLink>
            <NavLink href={"/account"}>Account</NavLink> */}
            <NavLink href={"/cart"}>Cart ({cartProducts.length})</NavLink>
          </StyledNav>
          <NavButton onClick={() => setMobileNavActive((prev) => !prev)}>
            <BarsIcon />
          </NavButton>
        </Wrapper>
      </Center>
    </StyledHeader>
  );
};

export default Header;
