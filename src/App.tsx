import React, { useEffect, useState } from 'react';
import { ThemeProvider } from 'styled-components';

import { darkTheme, GlobalStyles, lightTheme, Theme } from './App.styles';
import { Widget, ThemeToggle } from './components';

const THEME = 'theme';

const App: React.FC = () => {
  const [theme, setTheme] = useState<Theme>((localStorage.getItem(THEME) as Theme) || Theme.LIGHT);

  const toggleTheme = () =>
    setTheme((prevTheme) => (prevTheme === Theme.LIGHT ? Theme.DARK : Theme.LIGHT));

  useEffect(() => {
    localStorage.setItem(THEME, theme);
  }, [theme]);

  return (
    <ThemeProvider theme={theme === Theme.LIGHT ? lightTheme : darkTheme}>
      <GlobalStyles />
      <ThemeToggle checked={theme === Theme.DARK} onChange={toggleTheme} />
      <Widget />
    </ThemeProvider>
  );
};

export default App;
