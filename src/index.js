import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ThemeProvider } from "@mui/material/styles";
import { ApolloProvider } from "@apollo/react-hooks";
import theme from './theme';
import client from './graphql/client';
import { CssBaseline } from '@mui/material';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ApolloProvider client={client}>
  <ThemeProvider theme={theme}>
  <CssBaseline >
    <App />
  </CssBaseline>
  </ThemeProvider>
  </ApolloProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
