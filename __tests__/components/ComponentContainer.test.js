import "@testing-library/jest-dom";
import React from "react";
import { render, screen } from "@testing-library/react";
import { ChakraProvider } from "@chakra-ui/react";
import ComponentContainer from "../../components/ComponentContainer";

jest.mock("next/link", () => ({
  __esModule: true,
  default: ({ children, href }) => <a href={href}>{children}</a>,
}));
jest.mock("next/image", () => ({
  __esModule: true,
  default: (props) => <img {...props} />,
}));

function renderContainer(children = <div>Content</div>) {
  return render(
    <ChakraProvider>
      <ComponentContainer>{children}</ComponentContainer>
    </ChakraProvider>
  );
}

describe("ComponentContainer", () => {
  it("renders the Vincent Bank logo image", () => {
    renderContainer();
    expect(screen.getByAltText("Vincent Bank")).toBeInTheDocument();
  });

  it("renders children inside main", () => {
    renderContainer(<p>Hello World</p>);
    expect(screen.getByText("Hello World")).toBeInTheDocument();
  });

  it("renders the footer", () => {
    renderContainer();
    expect(screen.getByText(/site terms/i)).toBeInTheDocument();
  });

  it("renders a nav element", () => {
    renderContainer();
    expect(screen.getByRole("navigation")).toBeInTheDocument();
  });
});
