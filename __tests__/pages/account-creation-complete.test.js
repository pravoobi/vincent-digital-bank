import "@testing-library/jest-dom";
import { screen, fireEvent, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderWithProviders } from "../testUtils";
import AccountCreationComplete from "../../app/account-creation-complete/page";

const mockPush = jest.fn();
jest.mock("next/navigation", () => ({ useRouter: () => ({ push: mockPush }) }));
jest.mock("react-confetti", () => {
  const Mock = () => <div data-testid="confetti" />;
  return Mock;
});
jest.mock("../../utils/useWindowSize", () => () => ({
  width: 1024,
  height: 768,
}));

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
    expect(mockPush).toHaveBeenCalledWith("/dashboard");
    const app = store.getState().applicationData;
    expect(app.application.accountNumber).toBe("9876543210");
    expect(app.application.routingNumber).toBe("021000021");
    expect(app.step).toBe("DASHBOARD");
  });
});
