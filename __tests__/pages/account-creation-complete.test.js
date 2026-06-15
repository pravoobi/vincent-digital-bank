import "@testing-library/jest-dom";
import React from "react";
import { screen, fireEvent, waitFor, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderWithProviders } from "../testUtils";
import AccountCreationComplete from "../../pages/account-creation-complete";
import { APPLICATION_STEPS } from "../../constants";

const mockPush = jest.fn();
jest.mock("next/router", () => ({ useRouter: () => ({ push: mockPush }) }));
jest.mock("next/link", () => ({ __esModule: true, default: ({ children }) => children }));
jest.mock("react-confetti", () => () => <div data-testid="confetti" />);
jest.mock("../../utils/useWindowSize", () => () => ({ width: 1024, height: 768 }));

describe("AccountCreationComplete page", () => {
  beforeEach(() => {
    mockPush.mockClear();
  });

  it("renders the congratulations heading", () => {
    renderWithProviders(<AccountCreationComplete />);
    expect(screen.getByText(/congratulations/i)).toBeInTheDocument();
  });

  it("renders account number and routing number fields", () => {
    renderWithProviders(<AccountCreationComplete />);
    expect(screen.getByPlaceholderText("AccountNumber")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("RoutingNumber")).toBeInTheDocument();
  });

  it("shows confetti on mount", () => {
    renderWithProviders(<AccountCreationComplete />);
    expect(screen.getByTestId("confetti")).toBeInTheDocument();
  });

  it("hides confetti after 10 seconds", () => {
    jest.useFakeTimers();
    renderWithProviders(<AccountCreationComplete />);
    act(() => {
      jest.advanceTimersByTime(10000);
    });
    expect(screen.queryByTestId("confetti")).not.toBeInTheDocument();
    jest.useRealTimers();
  });

  it("dispatches account data and navigates on submit", async () => {
    const { store } = renderWithProviders(<AccountCreationComplete />);
    fireEvent.change(screen.getByPlaceholderText("AccountNumber"), {
      target: { value: "9876543210" },
    });
    fireEvent.change(screen.getByPlaceholderText("RoutingNumber"), {
      target: { value: "021000021" },
    });
    fireEvent.submit(
      screen.getByPlaceholderText("AccountNumber").closest("form")
    );
    await waitFor(() => expect(mockPush).toHaveBeenCalledWith("/dashboard"));
    const appState = store.getState().applicationData;
    expect(appState.application.accountNumber).toBe("9876543210");
    expect(appState.application.routingNumber).toBe("021000021");
    expect(appState.step).toBe(APPLICATION_STEPS.DASHBOARD);
  });
});
