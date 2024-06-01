import React, { useState } from "react";
import { styled } from "styled-components";
const Image = styled.img`
  max-width: 100%;
  max-height: 100%;
`;
const ImageButtons = styled.div`
  display: flex;
  gap: 10px;
  flex-grow: 0;
  margin-top: 10px;
`;
const BigImage = styled.img`
  max-width: 100%;
  max-height: 100px;
`;
const ImageButton = styled.div`
  border: 2px solid transparent;

  border-radius: 5px;
  height: 50px;
  padding: 5px;
  cursor: pointer;
  ${(props) =>
    props.active
      ? `  border-color: #ccc;
    `
      : `opacity: .5`}
`;
const BigImageWrapper = styled.div`
  text-align: center;
`;
const ProductImages = ({ images }) => {
  const [activeImage, setActiveImage] = useState(images?.[0]);
  return (
    <>
      <BigImageWrapper>
        <BigImage src={activeImage} />
      </BigImageWrapper>
      <ImageButtons>
        {images.map((image) => (
          <ImageButton
            key={image}
            active={image === activeImage}
            onClick={() => setActiveImage(image)}
          >
            <Image src={image} />
          </ImageButton>
        ))}
      </ImageButtons>
    </>
  );
};

export default ProductImages;
