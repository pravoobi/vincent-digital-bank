import "@testing-library/jest-dom";
import React from "react";
import { screen } from "@testing-library/react";
import { renderWithProviders } from "../testUtils";
import ApplicationDeclined from "../../pages/application-declined";

jest.mock("next/link", () => ({
  __esModule: true,
  default: ({ children }) => children,
}));

describe("ApplicationDeclined page", () => {
  it("renders the sorry heading", () => {
    renderWithProviders(<ApplicationDeclined />);
    expect(screen.getByText(/we are sorry/i)).toBeInTheDocument();
  });

  it("renders the declined message with a contact number", () => {
    renderWithProviders(<ApplicationDeclined />);
    expect(
      screen.getByText(/your application has been declined/i)
    ).toBeInTheDocument();
    expect(screen.getByText(/1800-3489-2348/)).toBeInTheDocument();
  });

  it("renders an application id", () => {
    renderWithProviders(<ApplicationDeclined />);
    expect(screen.getByText(/application id/i)).toBeInTheDocument();
  });
});
