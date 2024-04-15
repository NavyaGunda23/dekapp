import React from 'react';
import logo from './logo.svg';
import './App.css';
import './variables.css'
import RouterComponent from "./router"
import { useTheme, ThemeProvider, createTheme } from '@mui/material/styles';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { Box, IconButton } from '@mui/material';
const ColorModeContext = React.createContext({ toggleColorMode: () => {} });


function App() {

  const theme = useTheme();
  const colorMode = React.useContext(ColorModeContext);
  return (
    <div className="App">
      <Box sx={{
        position:"fixed",
        zIndex:9,
        right:0,
        top:"90px",
        borderRadius:"10px 0px 0px 10px",
        background:
        theme.palette.mode == "dark"
          ? "var(--primary-color-light )"
          : "var(--primary-color-dark)",
        }}>
      <IconButton  onClick={colorMode.toggleColorMode} color="inherit">
        {theme.palette.mode === 'dark' ? <Brightness7Icon sx={{color:"white"}}/> : <Brightness4Icon sx={{color:"white"}} />}
      </IconButton>
      </Box>
      
    { <RouterComponent />}
    </div>
  );
}


export default function ToggleColorMode() {
  const [mode, setMode] = React.useState<'light' | 'dark'>('light');
  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }),
    [],
  );

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode],
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}