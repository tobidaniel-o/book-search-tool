import React from "react";

function CardPlaceholder({ title, authorName, firstPublishYear, cover }) {
  return (
    <>
      <h2 className="resultsHeading">{title}</h2>
      <div className="imgContainer">
        <img
          src={`http://covers.openlibrary.org/b/id/${cover}.jpg`}
          alt={`${title}'s cover`}
        />
      </div>
      <div className="authorNameFirstPublishYear">
        <p>
          Author: <span> {authorName}</span>
        </p>
        <p>
          Published Date: <span> {firstPublishYear}</span>
        </p>
      </div>
    </>
  );
}

export default CardPlaceholder;
