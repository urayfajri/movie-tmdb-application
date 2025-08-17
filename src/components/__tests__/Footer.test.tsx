import { render, screen } from "@testing-library/react";
import Footer from "../Footer";

describe("Footer Component", () => {
  it("renders the copyright text with current year", () => {
    render(<Footer />);

    const currentYear = new Date().getFullYear();
    const footerText = screen.getByText(`© ${currentYear} Uray Widiansyah`, {
      exact: false,
    });

    expect(footerText).toBeInTheDocument();
  });
});
