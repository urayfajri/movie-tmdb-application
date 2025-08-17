import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import NotFoundPage from "../NotFoundPage";

describe("NotFoundPage", () => {
  it("renders 404 message", () => {
    render(
      <MemoryRouter
        future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
      >
        <NotFoundPage />
      </MemoryRouter>
    );

    expect(screen.getByText("404")).toBeInTheDocument();
    expect(
      screen.getByText("Oops! The page you are looking for does not exist.")
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /Go Back to Movies/i })
    ).toBeInTheDocument();
  });

  it("link navigates to /movie", () => {
    render(
      <MemoryRouter
        future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
      >
        <NotFoundPage />
      </MemoryRouter>
    );

    const link = screen.getByRole("link", { name: /Go Back to Movies/i });
    expect(link).toHaveAttribute("href", "/movie");
  });
});
