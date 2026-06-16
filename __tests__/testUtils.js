import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { makeStore } from "../store/store";

export function renderWithProviders(ui, { preloadedState } = {}) {
  const store = makeStore(preloadedState);
  function Wrapper({ children }) {
    return <Provider store={store}>{children}</Provider>;
  }
  return { store, ...render(ui, { wrapper: Wrapper }) };
}
