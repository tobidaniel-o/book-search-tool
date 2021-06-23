import React, { Component } from "react";
import axios from "axios";
import Loader from "../../loader.gif";
import PageNavigation from "../PageNavigation/page-navigation.component";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import "./search-form.styles.scss";
import CardPlaceholder from "../CardPlaceholder/card-placeholder.component";

class SearchForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      query: "",
      results: [],
      loading: false,
      totalResults: 0,
      totalPages: 0,
      currentPageNo: 0,
      message: "",
      sortBy: "",
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
    const searchUrl = ` https://openlibrary.org/search.json?q=${query}${pageNumber}`;

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
        const total = res.data.numFound; // get the total number of pages returned
        const totalPagesCount = this.getPageCount(total, 20); //the denominator is 5. meaning I want to show 5 results per page

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

  // fn used to sort title, alphabetically and recently published
  handleSort = (event) => {
    event.preventDefault();
    const optionValue = event.target.value;
    this.setState({ sortBy: optionValue });
  };

  // fn used to handle the search input value
  handleOnInputChange = (event) => {
    const query = event.target.value;
    // Check if there is no query, show no results, else show
    if (!query) {
      this.setState({
        query,
        results: [],
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

  // fn to handle page click on Prev and Next button
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
    const { results = [], sortBy } = this.state;

    const sortCriteria = {
      alphabet: (a, b) => a.title.localeCompare(b.title),
      recentlyPublished: (a, b) => b.first_publish_year - a.first_publish_year,
    };
    const sortedResults = sortBy ? results.sort(sortCriteria[sortBy]) : results;

    // Check if results is not empty
    if (Object.keys(sortedResults).length && sortedResults.length) {
      return (
        <div className="results-container">
          {sortedResults

            .filter((result) => {
              // remove cards that do not have images, author name and publish year
              return (
                result.cover_i &&
                result.first_publish_year &&
                result.author_name
              );
            })
            .map((result) => {
              const { key, title, cover_i, author_name, first_publish_year } =
                result;
              return (
                <div key={key} className="card">
                  <CardPlaceholder
                    title={title}
                    cover_i={cover_i}
                    author_name={author_name}
                    first_publish_year={first_publish_year}
                  />
                </div>
              );
            })}
        </div>
      );
    } 
  };

  // Render search results...
  render() {
    const { query, loading, message, currentPageNo, totalPages } = this.state;
    const showPrevLink = query && 1 < currentPageNo;
    const showNextLink = query && totalPages > currentPageNo;

    return (
      <>
        <div className="wrapper">
          <div className="form-container">
            <form onSubmit={(event) => event.preventDefault()}>
              <div className="search-by-title">
                <label htmlFor="search-input">Search By Title</label>
                <input
                  type="text"
                  name="query"
                  value={query}
                  id="search-input"
                  placeholder=" (ex. The Great Gatsby)"
                  onChange={this.handleOnInputChange}
                />
                <FontAwesomeIcon icon={faSearch} className="search-icon" />
              </div>

              <div className="sort-results">
                <label htmlFor="sort">
                  Sort Alphabetically or Recently published
                </label>
                <select name="sort" id="" onChange={this.handleSort}>
                  <option value="" default>
                    Select one
                  </option>
                  <option value="alphabet">Alphabetically</option>
                  <option value="recentlyPublished">Recently Published</option>
                </select>
              </div>
            </form>
          </div>

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
