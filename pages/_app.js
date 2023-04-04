import '../styles/globals.css';
import Script from 'next/script';
import { SessionProvider } from 'next-auth/react';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';

const muiTheme = createTheme({
  palette: {
    primary: {
      main: '#5074e2',
      contrastText: '#fcfdfd',
    },
    secondary: {
      main: '#ff0055',
    },
    info: {
      main: '#647ece',
    },
    success: {
      main: '#43bd49',
      contrastText: '#fcfdfd',
    },
    error: {
      main: '#f20d59',
      contrastText: '#fcfdfd',
    },
    gray: {
      main: '#8fa0a3',
      contrastText: '#fcfdfd',
    },
  },
});

function MyApp({ Component, pageProps, session }) {
  return (
    <>
      <Script src="https://cdn.jsdelivr.net/gh/ncase/nutshell/nutshell.js" />
      <SessionProvider session={session}>
        <ThemeProvider theme={muiTheme}>
          <Component {...pageProps} />
        </ThemeProvider>
      </SessionProvider>
    </>
  );
}

export default MyApp;
