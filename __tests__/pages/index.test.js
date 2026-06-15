import "@testing-library/jest-dom";
import React from "react";
import { screen, fireEvent } from "@testing-library/react";
import { renderWithProviders } from "../testUtils";
import Home from "../../pages/index";
import { APPLICATION_STEPS } from "../../constants";

const mockPush = jest.fn();
jest.mock("next/router", () => ({ useRouter: () => ({ push: mockPush }) }));
jest.mock("next/link", () => ({ __esModule: true, default: ({ children }) => children }));
jest.mock("next/image", () => ({ __esModule: true, default: (props) => <img {...props} /> }));

describe("Home page", () => {
  beforeEach(() => {
    mockPush.mockClear();
  });

  it("renders the heading", () => {
    renderWithProviders(<Home />);
    expect(screen.getByText("Savings Accounts")).toBeInTheDocument();
  });

  it("renders the Open an Account button", () => {
    renderWithProviders(<Home />);
    expect(screen.getByRole("button", { name: /open an account/i })).toBeInTheDocument();
  });

  it("navigates to start-application on button click", () => {
    const { store } = renderWithProviders(<Home />);
    fireEvent.click(screen.getByRole("button", { name: /open an account/i }));
    expect(mockPush).toHaveBeenCalledWith("/start-application");
    expect(store.getState().applicationData.step).toBe(APPLICATION_STEPS.START);
  });

  it("renders savings product descriptions", () => {
    renderWithProviders(<Home />);
    expect(screen.getByText("High Yield Savings")).toBeInTheDocument();
    expect(screen.getByText(/Certificates of Deposit/i)).toBeInTheDocument();
    expect(screen.getByText("High Yield Money Market")).toBeInTheDocument();
  });
});
