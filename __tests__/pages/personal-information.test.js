import "@testing-library/jest-dom";
import { screen, fireEvent } from "@testing-library/react";
import { renderWithProviders } from "../testUtils";
import PersonalInformation from "../../app/personal-information/page";

const mockPush = jest.fn();
jest.mock("next/navigation", () => ({ useRouter: () => ({ push: mockPush }) }));

describe("PersonalInformation page", () => {
  beforeEach(() => {
    mockPush.mockClear();
  });

  it("renders the heading", () => {
    renderWithProviders(<PersonalInformation />);
    expect(screen.getByText(/tell us more about you/i)).toBeInTheDocument();
  });

  it("renders phone and SSN inputs", () => {
    renderWithProviders(<PersonalInformation />);
    expect(screen.getByPlaceholderText("Phone")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("SSN")).toBeInTheDocument();
  });

  it("dispatches form data and navigates on submit", () => {
    const { store } = renderWithProviders(<PersonalInformation />);
    fireEvent.change(screen.getByPlaceholderText("Phone"), {
      target: { value: "1234567890" },
    });
    fireEvent.change(screen.getByPlaceholderText("SSN"), {
      target: { value: "123-45-6789" },
    });
    fireEvent.submit(screen.getByPlaceholderText("Phone").closest("form"));
    expect(mockPush).toHaveBeenCalledWith("/security-setup-verification");
    const app = store.getState().applicationData;
    expect(app.application.phone).toBe("1234567890");
    expect(app.application.ssn).toBe("123-45-6789");
    expect(app.step).toBe("SECURITY_SETUP_VERIFICATION");
  });
});
