import { render, screen } from "@testing-library/react";
import ErrorMessage from "../ErrorMessage";

describe("ErrorMessage Component", () => {
  it("renders the default error message", () => {
    render(<ErrorMessage />);
    expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();
  });

  it("renders a custom error message", () => {
    const customMessage = "Failed to fetch data";
    render(<ErrorMessage message={customMessage} />);
    expect(screen.getByText(customMessage)).toBeInTheDocument();
  });

  it("applies the correct styles", () => {
    render(<ErrorMessage />);
    const errorDiv = screen.getByText(/something went wrong/i);
    expect(errorDiv).toHaveClass(
      "p-4",
      "text-red-500",
      "bg-red-100",
      "border",
      "border-red-300",
      "rounded"
    );
  });
});
