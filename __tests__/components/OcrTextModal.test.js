import "@testing-library/jest-dom";
import React from "react";
import { render, screen, fireEvent, act, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ChakraProvider } from "@chakra-ui/react";
import OcrTextModal from "../../components/Modal/OcrTextModal";

function renderModal(props = {}) {
  const documentDispatch = jest.fn();
  const result = render(
    <ChakraProvider>
      <OcrTextModal
        ocrText="John Smith 123 Main St"
        documentDispatch={documentDispatch}
        {...props}
      />
    </ChakraProvider>
  );
  return { ...result, documentDispatch };
}

describe("OcrTextModal", () => {
  it("renders the Fill form from image button", () => {
    renderModal();
    expect(
      screen.getByRole("button", { name: /fill form from image/i })
    ).toBeInTheDocument();
  });

  it("opens the modal when Fill form button is clicked", async () => {
    renderModal();
    await userEvent.click(screen.getByRole("button", { name: /fill form from image/i }));
    expect(screen.getByText(/highlight fields from document id/i)).toBeInTheDocument();
  });

  it("displays the ocrText inside the modal", async () => {
    renderModal();
    await userEvent.click(screen.getByRole("button", { name: /fill form from image/i }));
    expect(screen.getByText("John Smith 123 Main St")).toBeInTheDocument();
  });

  it("closes the modal when footer Close button is clicked", async () => {
    renderModal();
    await userEvent.click(screen.getByRole("button", { name: /fill form from image/i }));
    const closeButtons = screen.getAllByRole("button", { name: /close/i });
    await userEvent.click(closeButtons[closeButtons.length - 1]);
    await waitFor(() =>
      expect(screen.queryByText(/highlight fields from document id/i)).not.toBeInTheDocument()
    );
  });

  it("calls documentDispatch when Done is clicked", async () => {
    const { documentDispatch } = renderModal();
    await userEvent.click(screen.getByRole("button", { name: /fill form from image/i }));

    Object.defineProperty(window, "getSelection", {
      writable: true,
      value: () => ({ toString: () => "John" }),
    });
    act(() => {
      fireEvent.mouseUp(document);
    });

    await userEvent.click(screen.getByRole("button", { name: /done/i }));
    expect(documentDispatch).toHaveBeenCalledWith(
      expect.objectContaining({ type: "FIELDS" })
    );
  });

  it("advances to next field when Next arrow is clicked", async () => {
    renderModal();
    await userEvent.click(screen.getByRole("button", { name: /fill form from image/i }));
    expect(screen.getByText("firstName")).toBeInTheDocument();
    await userEvent.click(screen.getByRole("button", { name: /next field/i }));
    expect(screen.getByText("lastName")).toBeInTheDocument();
  });

  it("goes back to previous field when Previous arrow is clicked", async () => {
    renderModal();
    await userEvent.click(screen.getByRole("button", { name: /fill form from image/i }));
    await userEvent.click(screen.getByRole("button", { name: /next field/i }));
    await userEvent.click(screen.getByRole("button", { name: /previous field/i }));
    expect(screen.getByText("firstName")).toBeInTheDocument();
  });

  it("registers mouseup listener only once (no leak)", () => {
    const addSpy = jest.spyOn(document, "addEventListener");
    renderModal();
    const mouseUpListeners = addSpy.mock.calls.filter(([event]) => event === "mouseup");
    expect(mouseUpListeners).toHaveLength(1);
    addSpy.mockRestore();
  });
});
