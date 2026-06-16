import "@testing-library/jest-dom";
import { screen, fireEvent } from "@testing-library/react";
import { renderWithProviders } from "../testUtils";
import SecuritySetupVerification from "../../app/security-setup-verification/page";

const mockPush = jest.fn();
jest.mock("next/navigation", () => ({ useRouter: () => ({ push: mockPush }) }));

const setValue = (placeholder, value) =>
  fireEvent.change(screen.getByPlaceholderText(placeholder), {
    target: { value },
  });

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
    expect(screen.getByPlaceholderText("Security Word")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Security Hint")).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("Email One Time Pin")
    ).toBeInTheDocument();
    expect(screen.getByPlaceholderText("SMS One Time Pin")).toBeInTheDocument();
  });

  it("dispatches security data and navigates on submit", () => {
    const { store } = renderWithProviders(<SecuritySetupVerification />);
    setValue("Security Word", "BlueSky");
    setValue("Security Hint", "Favourite colour");
    setValue("Email One Time Pin", "112233");
    setValue("SMS One Time Pin", "445566");
    fireEvent.submit(
      screen.getByPlaceholderText("Security Word").closest("form")
    );
    expect(mockPush).toHaveBeenCalledWith("/account-creation-complete");
    const app = store.getState().applicationData;
    expect(app.application.securityWord).toBe("BlueSky");
    expect(app.application.otp).toBe("112233");
    expect(app.step).toBe("ACCOUNT_CREATION_COMPLETE");
  });
});
