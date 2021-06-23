import React from "react";
import "./page-navigation.styles.scss";

function PageNavigation({
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

export default PageNavigation;
