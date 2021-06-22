import React, { Component } from "react";
import axios from "axios";
import Loader from "../../loader.gif";
import PageNavigation from "../PageNavigation/page-navigation.component";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import "./search-form.styles.scss";

class SearchForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      query: "",
      results: {},
      loading: false,
      totalResults: 0,
      totalPages: 0,
      currentPageNo: 0,
      message: "",
    };

    this.cancel = "";
  }

  // fn to get how many pages are there
  getPageCount = (total, denominator) => {
    // check if the total is divisible by denominator
    const divisible = 0 === total % denominator;
    const valueToBeAdded = divisible ? 0 : 1;
    return Math.floor(total / denominator) + valueToBeAdded;
  };

  // fn used for pagination.
  getSearchResults = (updatedPageNo = "", query) => {
    const pageNumber = updatedPageNo ? `&page=${updatedPageNo}` : "";
    const searchUrl = ` http://openlibrary.org/search.json?q=${query}${pageNumber}`;

    // Create a token
    // check if this.cancel has any value, if it has, cancel the previous request
    if (this.cancel) {
      this.cancel.cancel();
    }

    // if not, create a new token and store inside of the axios cancel token
    this.cancel = axios.CancelToken.source();

    axios
      .get(searchUrl, {
        cancelToken: this.cancel.token,
      })
      .then((res) => {
        console.log(res.data);
        const total = res.data.numFound; // get the total number of pages returned
        const totalPagesCount = this.getPageCount(total, 20); //the denominator is 5. meaning I want to show 5 results per page

        console.log("total => " + total);
        console.log("totalPagesCount => " + totalPagesCount);

        const resultNotFoundMessage = !res.data.docs.length
          ? "There are no more search results. Please try a new search."
          : "";

        this.setState({
          results: res.data.docs,
          message: resultNotFoundMessage,
          totalResults: total,
          totalPages: totalPagesCount,
          currentPageNo: updatedPageNo,
          loading: false,
        });
      })
      .catch((error) => {
        if (axios.isCancel(error) || error) {
          this.setState({
            loading: false,
            message: "Please wait while we get the data...",
          });
        }
      });
  };

  // fn used to prevent load from loading after submission
  handleSubmit = (event) => {
    event.preventDefault();
  };

  // fn used to handle the search input value
  handleOnInputChange = (event) => {
    const query = event.target.value;
    // Check if there is no query, show no results, else show
    if (!query) {
      this.setState({
        query,
        results: {},
        message: "",
        totalPages: 0,
        totalResults: 0,
      });
    } else {
      this.setState({ query, loading: true, message: "" }, () => {
        this.getSearchResults(1, query);
      });
    }
  };

  // fn to handle page click
  handlePageClick = (type, event) => {
    event.preventDefault();
    // Prev is if user is on page 2, and needs to go to page 1, then this.state.currentPageNo - 1, else Next - this.state.currentPageNo + 1
    const updatedPageNo =
      "prev" === type
        ? this.state.currentPageNo - 1
        : this.state.currentPageNo + 1;

    if (!this.state.loading) {
      //loading value should be false
      this.setState({ loading: true, message: "" }, () => {
        this.getSearchResults(updatedPageNo, this.state.query);
      });
    }
  };

  // fn to pull results out of the state and render the results
  displaySearchResults = () => {
    const { results } = this.state;

    // Check if results is not empty
    if (Object.keys(results).length && results.length) {
      return (
        <div className="results-container">
          {results.map((result) => {
            return (
              <div key={result.key} className="card">
                <h2 className="results-heading">{result.title}</h2>
                <div className="img-container">
                  <img
                    src={`http://covers.openlibrary.org/b/id/${result.cover_i}.jpg`}
                    alt="think and grow rich cover"
                  />
                </div>
                <div className="author-name-first-publish-year">
                  <p>{result.author_name}</p>
                  <p>{result.first_publish_year}</p>
                </div>
              </div>
            );
          })}
        </div>
      );
    }
  };

  // Render search results function should be here...
  render() {
    const { query, loading, message, currentPageNo, totalPages } = this.state;
    const showPrevLink = 1 < currentPageNo;
    const showNextLink = totalPages > currentPageNo;
    return (
      <>
        <div className="wrapper">
          <form onSubmit={this.handleSubmit}>
            <div className="search-by-title">
              <label htmlFor="search-input">Search By Title</label>
              <input
                type="text"
                name="query"
                value={query}
                id="search-input"
                placeholder="Search..."
                onChange={this.handleOnInputChange}
              />
              <FontAwesomeIcon icon={faSearch} className="search-icon" />
            </div>

            <div className="sort-results">
              <label htmlFor="sort">
                Sort By Alphabet or Recently Published
              </label>
              <select name="sort" id="">
                <option value="" selected="selected" disabled>
                  Select one
                </option>
                <option value="By Alphabet">By Alphabet</option>
                <option value="Recently Published">Recently Published</option>
              </select>
            </div>
          </form>

          {/* Error Message should be here */}
          {message && <p className="message">{message}</p>}

          {/* Load should be here too */}
          <img
            src={Loader}
            className={`search-loading ${loading ? "show" : "hide"}`}
            alt="Search loader"
          />

          {/* Navigation */}
          <PageNavigation
            loading={loading}
            showPrevLink={showPrevLink}
            showNextLink={showNextLink}
            handlePrevClick={(event) => this.handlePageClick("prev", event)}
            handleNextClick={(event) => this.handlePageClick("next", event)}
          />

          {/* Results */}
          {this.displaySearchResults()}

          {/* Navigation */}
          <PageNavigation
            loading={loading}
            showPrevLink={showPrevLink}
            showNextLink={showNextLink}
            handlePrevClick={(event) => this.handlePageClick("prev", event)}
            handleNextClick={(event) => this.handlePageClick("next", event)}
          />
        </div>
      </>
    );
  }
}

export default SearchForm;
