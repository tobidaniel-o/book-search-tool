import { render, screen } from "@testing-library/react";
import SearchForm from "./search-form.component";

test("Searches for the books by entering the input value.", () => {
  render(<SearchForm />);
});
