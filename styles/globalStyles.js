import { createGlobalStyle } from "styled-components";
const GlobalStyles = createGlobalStyle`
@import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap');
  body {
    background-color:#eee;
    margin:0;
    padding: 0;
    font-family: "Roboto", sans-serif;
  }
  hr{
    display: block;
    border: 0;
    border-top: 1px solid #ccc;
   
    
  }
`;
export default GlobalStyles;
