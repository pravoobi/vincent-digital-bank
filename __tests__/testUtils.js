import React from "react";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { ChakraProvider } from "@chakra-ui/react";
import rootReducer from "../store/reducers";

export function renderWithProviders(ui, { preloadedState = {} } = {}) {
  const store = createStore(rootReducer, preloadedState, applyMiddleware(thunk));
  function Wrapper({ children }) {
    return (
      <Provider store={store}>
        <ChakraProvider>{children}</ChakraProvider>
      </Provider>
    );
  }
  return { store, ...render(ui, { wrapper: Wrapper }) };
}
