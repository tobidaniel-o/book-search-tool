import React from 'react'

function CardPlaceholder({title, author_name, first_publish_year,cover_i}) {
  return (
    <>
      <h2 className="results-heading">{title}</h2>
      <div className="img-container">
        <img
          src={`http://covers.openlibrary.org/b/id/${cover_i}.jpg`}
          alt={`${title}'s cover`}
        />
      </div>
      <div className="author-name-first-publish-year">
        <p>{author_name}</p>
        <p>{first_publish_year}</p>
      </div>
    </>
  );
}

export default CardPlaceholder
