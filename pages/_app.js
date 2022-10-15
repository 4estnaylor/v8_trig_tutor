import '../styles/globals.css';
import { SessionProvider } from 'next-auth/react';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';

const muiTheme = createTheme({
  palette: {
    primary: {
      main: '#00aacc',
      contrastText: '#fcfdfd',
    },
    secondary: {
      main: '#ff0055',
    },
    info: {
      main: '#647ece',
    },
  },
});

function MyApp({ Component, pageProps, session }) {
  return (
    <SessionProvider session={session}>
      <ThemeProvider theme={muiTheme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </SessionProvider>
  );
}

export default MyApp;
