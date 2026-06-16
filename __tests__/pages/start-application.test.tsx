import "@testing-library/jest-dom";
import { screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderWithProviders } from "../testUtils";
import StartApplication from "../../app/start-application/page";

const mockPush = jest.fn();
jest.mock("next/navigation", () => ({ useRouter: () => ({ push: mockPush }) }));

const setValue = (placeholder, value) =>
  fireEvent.change(screen.getByPlaceholderText(placeholder), {
    target: { value },
  });

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

  it("renders email, password, confirm password and consent fields", () => {
    renderWithProviders(<StartApplication />);
    expect(screen.getByPlaceholderText("Email")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Confirm Password")).toBeInTheDocument();
    expect(screen.getByLabelText(/consent checkbox/i)).toBeInTheDocument();
  });

  it("shows password mismatch error when passwords differ", () => {
    renderWithProviders(<StartApplication />);
    setValue("Password", "abc123");
    setValue("Confirm Password", "xyz999");
    expect(
      screen.getByText(/password and confirm passwords do not match/i)
    ).toBeInTheDocument();
  });

  it("does not navigate when passwords do not match", () => {
    renderWithProviders(<StartApplication />);
    setValue("Password", "abc123");
    setValue("Confirm Password", "xyz999");
    fireEvent.submit(screen.getByPlaceholderText("Email").closest("form"));
    expect(mockPush).not.toHaveBeenCalled();
  });

  it("dispatches application data and navigates when form is valid", () => {
    const { store } = renderWithProviders(<StartApplication />);
    setValue("Email", "test@example.com");
    setValue("Password", "secret123");
    setValue("Confirm Password", "secret123");
    fireEvent.submit(screen.getByPlaceholderText("Email").closest("form"));
    expect(mockPush).toHaveBeenCalledWith("/document-id-upload");
    const appState = store.getState().applicationData;
    expect(appState.application.email).toBe("test@example.com");
    expect(appState.step).toBe("DOCUMENT_UPLOAD");
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
