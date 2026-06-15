import "@testing-library/jest-dom";
import React from "react";
import { screen } from "@testing-library/react";
import { renderWithProviders } from "../testUtils";
import Dashboard from "../../pages/dashboard";

jest.mock("next/link", () => ({
  __esModule: true,
  default: ({ children }) => children,
}));
jest.mock("../../utils/useWindowSize", () => () => ({
  width: 1024,
  height: 768,
}));

describe("Dashboard page", () => {
  it("shows default first name John when no application data is stored", () => {
    renderWithProviders(<Dashboard />);
    expect(screen.getByText(/john, welcome!/i)).toBeInTheDocument();
  });

  it("displays the first name from Redux state", () => {
    renderWithProviders(<Dashboard />, {
      preloadedState: {
        applicationData: {
          sample: [],
          step: "DASHBOARD",
          application: { firstName: "Alice" },
          loading: false,
        },
      },
    });
    expect(screen.getByText(/alice, welcome!/i)).toBeInTheDocument();
  });

  it("renders the account table with headers", () => {
    renderWithProviders(<Dashboard />);
    expect(screen.getByText("Account")).toBeInTheDocument();
    expect(screen.getByText("Rate")).toBeInTheDocument();
    expect(screen.getByText("Balance")).toBeInTheDocument();
  });

  it("renders the Savers Account row", () => {
    renderWithProviders(<Dashboard />);
    expect(screen.getByText(/savers account/i)).toBeInTheDocument();
  });

  it("renders both info banners", () => {
    renderWithProviders(<Dashboard />);
    expect(screen.getByText(/link to external accounts/i)).toBeInTheDocument();
    expect(screen.getByText(/fund your account/i)).toBeInTheDocument();
  });
});
