import "@testing-library/jest-dom";
import React from "react";
import { screen } from "@testing-library/react";
import { ChakraProvider } from "@chakra-ui/react";
import { render } from "@testing-library/react";
import Footer from "../../components/Footer";

jest.mock("next/link", () => ({
  __esModule: true,
  default: ({ children, href }) => <a href={href}>{children}</a>,
}));

function renderFooter() {
  return render(
    <ChakraProvider>
      <Footer />
    </ChakraProvider>
  );
}

describe("Footer", () => {
  it("renders site terms link", () => {
    renderFooter();
    expect(screen.getByText(/site terms/i)).toBeInTheDocument();
  });

  it("renders privacy policy link", () => {
    renderFooter();
    expect(screen.getByText(/privacy policy/i)).toBeInTheDocument();
  });

  it("renders privacy notice link", () => {
    renderFooter();
    expect(screen.getByText(/privacy notice/i)).toBeInTheDocument();
  });

  it("renders social media icon buttons", () => {
    renderFooter();
    expect(screen.getByLabelText("Twitter")).toBeInTheDocument();
    expect(screen.getByLabelText("LinkedIn")).toBeInTheDocument();
    expect(screen.getByLabelText("YouTube")).toBeInTheDocument();
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
  });

  it("renders phone number", () => {
    renderFooter();
    expect(screen.getByText(/1800-1234-8970/)).toBeInTheDocument();
  });

  it("renders copyright notice", () => {
    renderFooter();
    expect(screen.getByText(/vincent bank llc/i)).toBeInTheDocument();
  });

  it("renders FDIC notice", () => {
    renderFooter();
    expect(screen.getByText(/fdic insured/i)).toBeInTheDocument();
  });
});
