import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Footer from "../../components/Footer";

describe("Footer", () => {
  it("renders site terms link", () => {
    render(<Footer />);
    expect(screen.getByText(/site terms/i)).toBeInTheDocument();
  });

  it("renders privacy policy link", () => {
    render(<Footer />);
    expect(screen.getByText(/privacy policy/i)).toBeInTheDocument();
  });

  it("renders privacy notice link", () => {
    render(<Footer />);
    expect(screen.getByText(/privacy notice/i)).toBeInTheDocument();
  });

  it("renders social media icon buttons", () => {
    render(<Footer />);
    expect(screen.getByLabelText("Twitter")).toBeInTheDocument();
    expect(screen.getByLabelText("LinkedIn")).toBeInTheDocument();
    expect(screen.getByLabelText("YouTube")).toBeInTheDocument();
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
  });

  it("renders phone number", () => {
    render(<Footer />);
    expect(screen.getByText(/1800-1234-8970/)).toBeInTheDocument();
  });

  it("renders copyright notice", () => {
    render(<Footer />);
    expect(screen.getByText(/vincent bank llc/i)).toBeInTheDocument();
  });

  it("renders FDIC notice", () => {
    render(<Footer />);
    expect(screen.getByText(/fdic insured/i)).toBeInTheDocument();
  });
});
