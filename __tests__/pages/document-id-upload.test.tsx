import "@testing-library/jest-dom";
import { screen, fireEvent } from "@testing-library/react";
import { renderWithProviders } from "../testUtils";
import DocumentIdUpload from "../../app/document-id-upload/page";

const mockPush = jest.fn();
jest.mock("next/navigation", () => ({ useRouter: () => ({ push: mockPush }) }));

const setValue = (placeholder, value) =>
  fireEvent.change(screen.getByPlaceholderText(placeholder), {
    target: { value },
  });

describe("DocumentIdUpload page", () => {
  beforeEach(() => {
    mockPush.mockClear();
  });

  it("renders the heading", () => {
    renderWithProviders(<DocumentIdUpload />);
    expect(screen.getByText(/upload your document id/i)).toBeInTheDocument();
  });

  it("renders all address text inputs", () => {
    renderWithProviders(<DocumentIdUpload />);
    expect(screen.getByPlaceholderText("First Name")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Last Name")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("House Number")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Street")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("City")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Zip Code")).toBeInTheDocument();
  });

  it("renders a file input for document image", () => {
    renderWithProviders(<DocumentIdUpload />);
    const fileInput = screen.getByLabelText(/document id image/i);
    expect(fileInput).toHaveAttribute("type", "file");
  });

  it("dispatches form data and navigates on submit", () => {
    const { store } = renderWithProviders(<DocumentIdUpload />);
    setValue("First Name", "Alice");
    setValue("Last Name", "Smith");
    setValue("House Number", "42");
    setValue("Street", "Main St");
    setValue("City", "Boston");
    setValue("Zip Code", "02101");
    fireEvent.submit(screen.getByPlaceholderText("First Name").closest("form"));
    expect(mockPush).toHaveBeenCalledWith("/personal-information");
    const app = store.getState().applicationData;
    expect(app.application.firstName).toBe("Alice");
    expect(app.application.lastName).toBe("Smith");
    expect(app.application.city).toBe("Boston");
    expect(app.step).toBe("PERSONAL_INFORMATION");
  });
});
