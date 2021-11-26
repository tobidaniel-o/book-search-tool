import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import CardPlaceholder from "./CardPlaceholder";

test("renders the CardPlaceholder's components.", () => {
  const { getByText, getByAltText } = render(
    <CardPlaceholder
      title="title"
      author_name="Author name"
      first_publish_year="Published year"
      cover_i="cover"
    />
  );
  expect(getByText("title")).toBeInTheDocument();
  expect(getByText("Author name")).toBeInTheDocument();
  expect(getByText("Published year")).toBeInTheDocument();
  expect(getByAltText("title's cover")).toHaveAttribute(
    "src",
    "http://covers.openlibrary.org/b/id/cover.jpg"
  );
});

