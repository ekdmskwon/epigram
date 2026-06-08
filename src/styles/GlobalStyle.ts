import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
  }

  html,
  body {
    max-width: 100vw;
    overflow-x: hidden;
  }

  body {
    font-family: ${({ theme }) => theme.fonts.main};
    background-color: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.black950};
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  button, input, textarea, select {
    font-family: ${({ theme }) => theme.fonts.main};
    border: none;
    background: none;
    outline: none;
  }

  button {
    cursor: pointer;
  }

  input:focus, textarea:focus {
    outline: none;
  }
`;
