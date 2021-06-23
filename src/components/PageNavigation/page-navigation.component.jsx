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
      <a
        href="#"
        className={`nav-link ${showPrevLink ? "show" : "hide"}
        ${loading ? "greyed-out" : ""}`}
        onClick={handlePrevClick}
      >
        Prev
      </a>
      <a
        href="#"
        className={`nav-link ${showNextLink ? "show" : "hide"}
      ${loading ? "greyed-out" : ""}
      `}
        onClick={handleNextClick}
      >
        Next
      </a>
    </div>
  );
}

export default PageNavigation;
