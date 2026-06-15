import "@testing-library/jest-dom";
import React from "react";
import { screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderWithProviders } from "../testUtils";
import PersonalInformation from "../../pages/personal-information";
import { APPLICATION_STEPS } from "../../constants";

const mockPush = jest.fn();
jest.mock("next/router", () => ({ useRouter: () => ({ push: mockPush }) }));
jest.mock("next/link", () => ({
  __esModule: true,
  default: ({ children }) => children,
}));

describe("PersonalInformation page", () => {
  beforeEach(() => {
    mockPush.mockClear();
  });

  it("renders the heading", () => {
    renderWithProviders(<PersonalInformation />);
    expect(screen.getByText(/tell us more about you/i)).toBeInTheDocument();
  });

  it("renders phone and SSN text inputs", () => {
    renderWithProviders(<PersonalInformation />);
    expect(screen.getByPlaceholderText("Phone")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("SSN")).toBeInTheDocument();
  });

  it("renders citizenship and occupation selects", () => {
    renderWithProviders(<PersonalInformation />);
    const selects = screen.getAllByRole("combobox");
    expect(selects).toHaveLength(2);
  });

  it("dispatches form data and navigates on submit", async () => {
    const { store } = renderWithProviders(<PersonalInformation />);
    fireEvent.change(screen.getByPlaceholderText("Phone"), {
      target: { value: "1234567890" },
    });
    fireEvent.change(screen.getByPlaceholderText("SSN"), {
      target: { value: "123-45-6789" },
    });
    fireEvent.submit(screen.getByPlaceholderText("Phone").closest("form"));
    await waitFor(() =>
      expect(mockPush).toHaveBeenCalledWith("/security-setup-verification")
    );
    const appState = store.getState().applicationData;
    expect(appState.application.phone).toBe("1234567890");
    expect(appState.application.ssn).toBe("123-45-6789");
    expect(appState.step).toBe(APPLICATION_STEPS.SECURITY_SETUP_VERIFICATION);
  });

  it("stores selected citizenship in redux", async () => {
    const { store } = renderWithProviders(<PersonalInformation />);
    const [citizenshipSelect] = screen.getAllByRole("combobox");
    fireEvent.change(citizenshipSelect, { target: { value: "Australia" } });
    fireEvent.submit(screen.getByPlaceholderText("Phone").closest("form"));
    await waitFor(() => expect(mockPush).toHaveBeenCalled());
    expect(store.getState().applicationData.application.citizenship).toBe(
      "Australia"
    );
  });
});
