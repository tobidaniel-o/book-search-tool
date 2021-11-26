import React from "react";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
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
    fireEvent.click(getByText("Prev"));
    expect(handlePrevClick).toHaveBeenCalledTimes(1);

    fireEvent.click(getByText("Next"));
    expect(handleNextClick).toHaveBeenCalledTimes(1);
  });
});
