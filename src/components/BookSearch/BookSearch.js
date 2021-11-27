import React from "react";

import Header from "../Header/Header";
import SearchForm from "../SearchForm/SearchForm";

// class BookSearch extends Component {
//   render() {
//     return (
//       <div className="container">
//         <Header />
//         <SearchForm />
//       </div>
//     );
//   }
// }

function BookSearch() {
  return (
    <div className="container">
      <Header />
      <SearchForm />
    </div>
  );
}

export default BookSearch;
