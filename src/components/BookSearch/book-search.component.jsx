import React, { Component } from "react";

import Header from "../Header/header.component";
import SearchForm from "../SearchForm/search-form.component";

class BookSearch extends Component {
  render() {
    return (
      <div className="container">
        <Header />
        <SearchForm />
      </div>
    );
  }
}

export default BookSearch;
