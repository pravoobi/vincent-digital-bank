import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import ComponentContainer from "../../components/ComponentContainer";

jest.mock("next/image", () => ({
  __esModule: true,
  default: (props) => {
    // eslint-disable-next-line jsx-a11y/alt-text, @next/next/no-img-element
    return <img {...props} />;
  },
}));

describe("ComponentContainer", () => {
  it("renders the Vincent Bank logo image", () => {
    render(
      <ComponentContainer>
        <div>child</div>
      </ComponentContainer>
    );
    expect(screen.getByAltText("Vincent Bank")).toBeInTheDocument();
  });

  it("renders children inside main", () => {
    render(
      <ComponentContainer>
        <p>Hello World</p>
      </ComponentContainer>
    );
    expect(screen.getByText("Hello World")).toBeInTheDocument();
  });

  it("renders the footer", () => {
    render(
      <ComponentContainer>
        <div />
      </ComponentContainer>
    );
    expect(screen.getByText(/site terms/i)).toBeInTheDocument();
  });

  it("renders a nav element", () => {
    render(
      <ComponentContainer>
        <div />
      </ComponentContainer>
    );
    expect(screen.getByRole("navigation")).toBeInTheDocument();
  });
});
