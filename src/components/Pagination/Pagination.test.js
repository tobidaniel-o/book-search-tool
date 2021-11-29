import React from "react";
import { render, fireEvent } from "@testing-library/react";

import Pagination from "./Pagination";

describe("Pagination component", () => {
  test("can click on the previous and next buttons", () => {
    const handlePrevClick = jest.fn();
    const handleNextClick = jest.fn();

    const { getByText } = render(
      <Pagination
        loading
        showPrevLink
        showNextLink
        handlePrevClick={handlePrevClick}
        handleNextClick={handleNextClick}
      />
    );
    fireEvent.click(getByText("Previous"));
    expect(handlePrevClick).toHaveBeenCalledTimes(1);

    fireEvent.click(getByText("Next"));
    expect(handleNextClick).toHaveBeenCalledTimes(1);
  });
});
