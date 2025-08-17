import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import NotFound from "../NotFound";

describe("NoDataFullScreen component", () => {
  it("renders with default message", () => {
    render(<NotFound />);
    expect(screen.getByText("No data available")).toBeInTheDocument();
  });

  it("renders with custom message", () => {
    const customMessage = "Data not found!";
    render(<NotFound message={customMessage} />);
    expect(screen.getByText(customMessage)).toBeInTheDocument();
  });

  it("renders SVG icon", () => {
    render(<NotFound />);
    const svgElement = screen.getByRole("img", { hidden: true });
    expect(svgElement).toBeInTheDocument();
  });
});
