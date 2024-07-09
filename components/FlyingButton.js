const PrimaryColor = "#5542f6";
import { ButtonStyle } from "./Button";
import styled from "styled-components";
import FlyingButtonOriginal from "react-flying-item";
import { CartContext } from "./CartContext";
import { useContext, useEffect, useRef, useState } from "react";

const FlyingButtonWrapper = styled.div`
  button {
    ${ButtonStyle};
    font-weight: 500;
    ${(props) =>
      props.main
        ? `
    background-color: ${PrimaryColor};
    color: white;
    
    `
        : `
    background-color: transparent;
    color: ${PrimaryColor};
    border: 1px solid ${PrimaryColor};
    `}
    ${(props) =>
      props.white &&
      `
    background-color:white;
    border: 1px solid white;
    font-size: 1.2rem;
      padding: 10px 20px;
    `}
  }
  @keyframes fly {
    100% {
      top: 0;
      left: 100%;
      opacity: 0;
      display: none;
      max-width: 50px;
      max-height: 50px;
    }
  }
  img {
    display: none;
    max-width: 100px;
    max-height: 100px;
    opacity: 1;
    position: fixed;
    z-index: 5;
    animation: fly 1s;
    border-radius: 10px;
  }
`;
export default function FlyingButton(props) {
  const { addProduct } = useContext(CartContext);
  const imgRef = useRef();
  function sendImageToCart(ev) {
    console.log(ev);
    imgRef.current.style.display = "inline-block";
    imgRef.current.style.left = ev.clientX - 50 + "px";
    imgRef.current.style.top = ev.clientY - 50 + "px";
    setTimeout(() => {
      imgRef.current.style.display = "none";
    }, 1000);
  }

  useEffect(() => {
    const interval = setInterval(() => {
      const reveal = imgRef.current?.closest("div[data-sr-id");
      if (reveal?.style.opacity === "1") {
        reveal.style.transform = "none";
      }
    }, 100);

    return () => clearInterval(interval);
  }, []);
  return (
    <>
      <FlyingButtonWrapper
        white={props.white}
        main={props.main}
        onClick={() => addProduct(props.id)}
      >
        <img src={props.src} ref={imgRef} />
        <button onClick={(ev) => sendImageToCart(ev)} {...props} />
      </FlyingButtonWrapper>
    </>
  );
}
