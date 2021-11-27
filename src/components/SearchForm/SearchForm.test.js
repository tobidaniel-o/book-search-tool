import { render, screen } from "@testing-library/react";
import SearchForm from "./SearchForm";

test("Searches for the books by entering the input value.", () => {
  render(<SearchForm />);
  const searchFormElement = screen.getByTestId("searchForm-1");
  expect(searchFormElement).toBeInTheDocument();
});
