import React from "react";
import PropTypes from "prop-types";
import { ChakraProvider } from "@chakra-ui/react";
import customTheme from "../styles/theme";
import { Global, css } from "@emotion/react";

import { store } from "../store/store";
import { Provider } from "react-redux";

const GlobalStyle = ({ children }) => {
  return (
    <>
      <Global
        styles={css`
          ::selection {
            background-color: #90cdf4;
            color: #fefefe;
          }
          ::-moz-selection {
            background: #ffb7b7;
            color: #fefefe;
          }
          html {
            min-width: 356px;
            scroll-behavior: smooth;
          }
          #__next {
            display: flex;
            flex-direction: column;
            min-height: 100vh;
          }
        `}
      />
      {children}
    </>
  );
};
GlobalStyle.propTypes = {
  children: PropTypes.element,
};
GlobalStyle.defaultProps = {
  children: null,
};

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <ChakraProvider resetCSS theme={customTheme}>
        <GlobalStyle>
          <Component {...pageProps} />
        </GlobalStyle>
      </ChakraProvider>
    </Provider>
  );
}
MyApp.propTypes = {
  Component: PropTypes.element,
  pageProps: PropTypes.shape({}),
};
MyApp.defaultProps = {
  Component: null,
  pageProps: {},
};

export default MyApp;
