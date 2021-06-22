import React from "react";
import "./search-form.styles.scss";

function SearchForm() {
  return (
    <>
      <div className="wrapper">
        <form>
          <div className="search-by-title">
            <label htmlFor="title">Search By Title</label>
            <input type="text" name="title" />
          </div>

          <div className="sort-results">
            <label htmlFor="sort">
              Sort By Alphabelt or Recently Published
            </label>
            <select name="sort" id="">
              <option value="By Alphabet">By Alphabet</option>
              <option value="Recently Published">Recently Published</option>
            </select>
          </div>
        </form>
      </div>
    </>
  );
}

export default SearchForm;
