import { render, screen, fireEvent } from "@testing-library/react";
import Pagination from "../Pagination";

describe("Pagination Component", () => {
  const setup = (
    currentPage: number,
    totalPages: number,
    onPageChange = jest.fn()
  ) => {
    render(
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChange}
      />
    );
    return { onPageChange };
  };

  it("renders the correct page numbers around the current page", () => {
    setup(3, 10);
    expect(screen.getByText("2")).toBeInTheDocument();
    expect(screen.getByText("3")).toBeInTheDocument();
    expect(screen.getByText("4")).toBeInTheDocument();
  });

  it("disables First and Prev when on the first page", () => {
    setup(1, 10);
    expect(screen.getByText("First")).toBeDisabled();
    expect(screen.getByText("Prev")).toBeDisabled();
  });

  it("disables Next and Last when on the last page", () => {
    setup(10, 10);
    expect(screen.getByText("Next")).toBeDisabled();
    expect(screen.getByText("Last")).toBeDisabled();
  });

  it("calls onPageChange when a page number is clicked", () => {
    const { onPageChange } = setup(3, 10);
    fireEvent.click(screen.getByText("4"));
    expect(onPageChange).toHaveBeenCalledWith(4);
  });

  it("calls onPageChange when navigation buttons are clicked", () => {
    const { onPageChange } = setup(5, 10);

    fireEvent.click(screen.getByText("First"));
    expect(onPageChange).toHaveBeenCalledWith(1);

    fireEvent.click(screen.getByText("Prev"));
    expect(onPageChange).toHaveBeenCalledWith(4);

    fireEvent.click(screen.getByText("Next"));
    expect(onPageChange).toHaveBeenCalledWith(6);

    fireEvent.click(screen.getByText("Last"));
    expect(onPageChange).toHaveBeenCalledWith(10);
  });

  it("highlights the current page button", () => {
    setup(3, 10);
    const currentPageButton = screen.getByText("3");
    expect(currentPageButton).toHaveClass("bg-blue-600", "text-white");
  });
});
