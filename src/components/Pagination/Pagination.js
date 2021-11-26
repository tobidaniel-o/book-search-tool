import React from "react";
import "./pagination.styles.scss";

function Pagination({
  loading,
  showPrevLink,
  showNextLink,
  handlePrevClick,
  handleNextClick,
}) {
  return (
    <div className="nav-link-container">
      <button
        className={`nav-link ${showPrevLink ? "show" : "hide"}
        ${loading ? "greyed-out" : ""}`}
        onClick={handlePrevClick}
      >
        Prev
      </button>
      <button
        className={`nav-link ${showNextLink ? "show" : "hide"}
      ${loading ? "greyed-out" : ""}
      `}
        onClick={handleNextClick}
      >
        Next
      </button>
    </div>
  );
}

export default Pagination;
