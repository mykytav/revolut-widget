import { createGlobalStyle } from 'styled-components';

const baseTheme = {
  balanceText: '#99999f',
  error: '#f5424e',
  exchangeBtnHover: '#238afe',
  mobileWidth: '576px',
  tabletWidth: '1024px',
  white: '#f2f2f2',
};

export const darkTheme = {
  bg: '#000000',
  blue: '#3686f7',
  currencyRowBg: '#161618',
  text: '#f4f4f4',
  ...baseTheme,
};

export const lightTheme = {
  bg: '#f3f4f6',
  blue: '#2668e3',
  currencyRowBg: '#ffffff',
  text: '#181a1b',
  ...baseTheme,
};

export enum Theme {
  LIGHT = 'LIGHT',
  DARK = 'DARK',
}

export const GlobalStyles = createGlobalStyle<{ theme: typeof lightTheme }>`
  html, body {
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
    font-size: 12px;

    @media (max-width: ${({ theme }) => theme.tabletWidth}) {
      font-size: 10px;
    }
    
  }

  *, *::after, *::before {
    box-sizing: border-box;
  }

  body {
    font-family: sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background-color: ${({ theme }) => theme.bg};
    color: ${({ theme }) => theme.text}
  }
`;
