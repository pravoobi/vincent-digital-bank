import "@testing-library/jest-dom";
import React from "react";
import { screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderWithProviders } from "../testUtils";
import StartApplication from "../../pages/start-application";
import { APPLICATION_STEPS } from "../../constants";

const mockPush = jest.fn();
jest.mock("next/router", () => ({ useRouter: () => ({ push: mockPush }) }));
jest.mock("next/link", () => ({
  __esModule: true,
  default: ({ children }) => children,
}));

describe("StartApplication page", () => {
  beforeEach(() => {
    mockPush.mockClear();
  });

  it("renders the heading", () => {
    renderWithProviders(<StartApplication />);
    expect(
      screen.getByText(/let's start your application/i)
    ).toBeInTheDocument();
  });

  it("renders email, password, confirm password fields and consent checkbox", () => {
    renderWithProviders(<StartApplication />);
    expect(screen.getByPlaceholderText("Email")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Confirm Password")).toBeInTheDocument();
    expect(screen.getByLabelText(/consent checkbox/i)).toBeInTheDocument();
  });

  it("shows password mismatch error when passwords differ", async () => {
    renderWithProviders(<StartApplication />);
    await userEvent.type(screen.getByPlaceholderText("Password"), "abc123");
    await userEvent.type(
      screen.getByPlaceholderText("Confirm Password"),
      "xyz999"
    );
    expect(
      screen.getByText(/password and confirm passwords do not match/i)
    ).toBeInTheDocument();
  });

  it("does not navigate when passwords do not match", async () => {
    renderWithProviders(<StartApplication />);
    await userEvent.type(screen.getByPlaceholderText("Password"), "abc123");
    await userEvent.type(
      screen.getByPlaceholderText("Confirm Password"),
      "xyz999"
    );
    fireEvent.submit(screen.getByPlaceholderText("Password").closest("form"));
    expect(mockPush).not.toHaveBeenCalled();
  });

  it("dispatches application data and navigates when form is valid", async () => {
    const { store } = renderWithProviders(<StartApplication />);
    await userEvent.type(
      screen.getByPlaceholderText("Email"),
      "test@example.com"
    );
    await userEvent.type(screen.getByPlaceholderText("Password"), "secret123");
    await userEvent.type(
      screen.getByPlaceholderText("Confirm Password"),
      "secret123"
    );
    await userEvent.click(screen.getByLabelText(/consent checkbox/i));
    fireEvent.submit(screen.getByPlaceholderText("Email").closest("form"));
    await waitFor(() =>
      expect(mockPush).toHaveBeenCalledWith("/document-id-upload")
    );
    const appState = store.getState().applicationData;
    expect(appState.application.email).toBe("test@example.com");
    expect(appState.step).toBe(APPLICATION_STEPS.DOCUMENT_UPLOAD);
  });

  it("clears consents when checkbox is unchecked", async () => {
    const { store } = renderWithProviders(<StartApplication />);
    const checkbox = screen.getByLabelText(/consent checkbox/i);
    await userEvent.click(checkbox);
    await userEvent.click(checkbox);
    await userEvent.type(screen.getByPlaceholderText("Password"), "abc123");
    await userEvent.type(
      screen.getByPlaceholderText("Confirm Password"),
      "abc123"
    );
    fireEvent.submit(screen.getByPlaceholderText("Email").closest("form"));
    await waitFor(() => expect(mockPush).toHaveBeenCalled());
    expect(store.getState().applicationData.application.consents).toEqual([]);
  });

  it("toggles password visibility", async () => {
    renderWithProviders(<StartApplication />);
    const passwordInput = screen.getByPlaceholderText("Password");
    expect(passwordInput).toHaveAttribute("type", "password");
    await userEvent.click(screen.getByRole("button", { name: /show/i }));
    expect(passwordInput).toHaveAttribute("type", "text");
    await userEvent.click(screen.getByRole("button", { name: /hide/i }));
    expect(passwordInput).toHaveAttribute("type", "password");
  });
});
