import Link from "next/link";
import React from "react";
import { styled } from "styled-components";
import { ButtonStyle } from "@/components/Button";
const StyledLink = styled(Link)`
  ${ButtonStyle}
`;
const ButtonLink = (rest) => {
  return <StyledLink {...rest} />;
};

export default ButtonLink;
