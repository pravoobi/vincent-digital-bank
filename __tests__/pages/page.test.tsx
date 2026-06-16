import "@testing-library/jest-dom";
import { screen, fireEvent } from "@testing-library/react";
import { renderWithProviders } from "../testUtils";
import Home from "../../app/page";

const mockPush = jest.fn();
jest.mock("next/navigation", () => ({ useRouter: () => ({ push: mockPush }) }));

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
    expect(
      screen.getByRole("button", { name: /open an account/i })
    ).toBeInTheDocument();
  });

  it("dispatches step and navigates on button click", () => {
    const { store } = renderWithProviders(<Home />);
    fireEvent.click(screen.getByRole("button", { name: /open an account/i }));
    expect(mockPush).toHaveBeenCalledWith("/start-application");
    expect(store.getState().applicationData.step).toBe("START");
  });

  it("renders product descriptions", () => {
    renderWithProviders(<Home />);
    expect(screen.getByText("High Yield Savings")).toBeInTheDocument();
    expect(screen.getByText(/Certificates of Deposit/i)).toBeInTheDocument();
    expect(screen.getByText("High Yield Money Market")).toBeInTheDocument();
  });
});
