import "../src/styles/setup.css";
import "../src/styles/App.scss";
// import SearchForm from "./components/SearchForm/search-form.component";

// function App() {
//   const param = "think and grow rich";
//   useEffect(() => {
//     axios({
//       url: `http://openlibrary.org/search.json?q=${param}&page=1`,
//       method: "GET",
//       dataResponse: "json",
//       params: {
//         format: "json",
//       },
//     }).then((response) => {
//       console.log(response.data.docs);
//     });
//   }, []);
//   return (
//     <>
//       <Header />
//       <SearchForm />
//     </>
//   );
// }
import React, { Component } from 'react'
import BookSearch from "./components/BookSearch/book-search.component";

class App extends Component {
  render() {
    return (
      <div>
        <BookSearch />
      </div>
    )
  }
}


export default App;
