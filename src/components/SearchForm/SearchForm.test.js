import { render } from "@testing-library/react";

import React from "react";
import SearchForm from "./SearchForm";

test("Searches for the books by entering the input value.", () => {
  const { getByTestId } = render(<SearchForm />);

  const searchFormElement = getByTestId("searchForm-1");
  expect(searchFormElement).toBeInTheDocument();
});
