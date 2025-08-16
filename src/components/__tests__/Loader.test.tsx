// __tests__/Loader.test.tsx
import { render, screen } from "@testing-library/react";
import Loader from "../Loader";

describe("Loader component", () => {
  it("renders default loading message", () => {
    render(<Loader />);
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("renders custom message", () => {
    render(<Loader message="Please wait..." />);
    expect(screen.getByText("Please wait...")).toBeInTheDocument();
  });

  it("renders spinner element", () => {
    render(<Loader />);
    expect(screen.getByRole("status")).toBeInTheDocument();
  });
});
