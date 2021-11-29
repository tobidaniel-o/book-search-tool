import React from "react";
import { render } from "@testing-library/react";

import Header from "./Header";

test("renders a message", () => {
  const { getByText } = render(<Header />);
  expect(getByText("BOOK SEARCH TOOL")).toBeInTheDocument();
});
