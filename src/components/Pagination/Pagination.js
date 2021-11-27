import React from "react";
import "./Pagination.scss";

function Pagination({
  loading,
  showPrevLink,
  showNextLink,
  handlePrevClick,
  handleNextClick,
}) {
  return (
    <div className="navLinkContainer">
      <button
        className={`navLink ${showPrevLink ? "show" : "hide"}
        ${loading ? "greyedOut" : ""}`}
        onClick={handlePrevClick}
      >
        Prev
      </button>
      <button
        className={`navLink ${showNextLink ? "show" : "hide"}
      ${loading ? "greyedOut" : ""}
      `}
        onClick={handleNextClick}
      >
        Next
      </button>
    </div>
  );
}

export default Pagination;
