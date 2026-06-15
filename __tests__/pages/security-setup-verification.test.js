import "@testing-library/jest-dom";
import React from "react";
import { screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderWithProviders } from "../testUtils";
import SecuritySetupVerification from "../../pages/security-setup-verification";
import { APPLICATION_STEPS } from "../../constants";

const mockPush = jest.fn();
jest.mock("next/router", () => ({ useRouter: () => ({ push: mockPush }) }));
jest.mock("next/link", () => ({ __esModule: true, default: ({ children }) => children }));

describe("SecuritySetupVerification page", () => {
  beforeEach(() => {
    mockPush.mockClear();
  });

  it("renders the heading", () => {
    renderWithProviders(<SecuritySetupVerification />);
    expect(screen.getByText(/setup your security/i)).toBeInTheDocument();
  });

  it("renders all four fields", () => {
    renderWithProviders(<SecuritySetupVerification />);
    expect(screen.getByLabelText(/security word/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/security hint/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email one time pin/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/sms one time pin/i)).toBeInTheDocument();
  });

  it("dispatches security data and navigates on submit", async () => {
    const { store } = renderWithProviders(<SecuritySetupVerification />);
    await userEvent.type(screen.getByLabelText(/security word/i), "BlueSky");
    await userEvent.type(screen.getByLabelText(/security hint/i), "My favourite colour");
    await userEvent.type(screen.getByLabelText(/email one time pin/i), "112233");
    await userEvent.type(screen.getByLabelText(/sms one time pin/i), "445566");
    fireEvent.submit(
      screen.getByRole("button", { name: /continue/i }).closest("form")
    );
    await waitFor(() =>
      expect(mockPush).toHaveBeenCalledWith("/account-creation-complete")
    );
    const appState = store.getState().applicationData;
    expect(appState.application.securityWord).toBe("BlueSky");
    expect(appState.application.securityHint).toBe("My favourite colour");
    expect(appState.step).toBe(APPLICATION_STEPS.ACCOUNT_CREATION_COMPLETE);
  });
});
