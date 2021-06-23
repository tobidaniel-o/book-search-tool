import "../src/styles/setup.css";
import "../src/styles/App.scss";

import React, { Component } from "react";
import BookSearch from "./components/BookSearch/book-search.component";

class App extends Component {
  render() {
    return <BookSearch />;
  }
}

export default App;
