import "@testing-library/jest-dom";
import { screen } from "@testing-library/react";
import { renderWithProviders } from "../testUtils";
import Dashboard from "../../app/dashboard/page";

describe("Dashboard page", () => {
  it("shows default first name John when no application data is stored", () => {
    renderWithProviders(<Dashboard />);
    expect(screen.getByText(/john, welcome!/i)).toBeInTheDocument();
  });

  it("displays the first name from Redux state", () => {
    renderWithProviders(<Dashboard />, {
      preloadedState: {
        applicationData: {
          step: "DASHBOARD",
          application: { firstName: "Alice" },
        },
      },
    });
    expect(screen.getByText(/alice, welcome!/i)).toBeInTheDocument();
  });

  it("renders account table headers", () => {
    renderWithProviders(<Dashboard />);
    expect(screen.getByText("Account")).toBeInTheDocument();
    expect(screen.getByText("Rate")).toBeInTheDocument();
    expect(screen.getByText("Balance")).toBeInTheDocument();
  });

  it("renders the Savers Account row", () => {
    renderWithProviders(<Dashboard />);
    expect(screen.getByText(/savers account - 3478/i)).toBeInTheDocument();
  });

  it("renders both info banners", () => {
    renderWithProviders(<Dashboard />);
    expect(screen.getByText(/link to external accounts/i)).toBeInTheDocument();
    expect(screen.getByText(/fund your account/i)).toBeInTheDocument();
  });
});
