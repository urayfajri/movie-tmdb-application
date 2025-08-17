import { render, screen } from "@testing-library/react";
import Header from "../Header";

describe("Header Component", () => {
  it("renders the app title correctly", () => {
    render(<Header />);

    const heading = screen.getByRole("heading", {
      name: /🎬 TMDB Movies/i,
    });

    expect(heading).toBeInTheDocument();
    expect(heading.tagName).toBe("H1");
  });
});
