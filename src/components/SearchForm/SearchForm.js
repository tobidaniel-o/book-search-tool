import React, { Component } from "react";
import axios from "axios";
import Loader from "../../loader.gif";
import Pagination from "../Pagination/Pagination";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import "./SearchForm.scss";
import CardPlaceholder from "../CardPlaceholder/CardPlaceholder";

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

  // fn gets the number of pages
  getPageCount = (total, denominator) => {
    // check if the total is divisible by denominator
    const divisible = 0 === total % denominator;
    const valueToBeAdded = divisible ? 0 : 1;
    return Math.floor(total / denominator) + valueToBeAdded;
  };

  // fn used for pagination.
  getSearchResults = (query, pageNo = 1) => {
    const searchUrl = ` https://openlibrary.org/search.json?q=${query}&page=${pageNo}`;

    // Create a token
    // check if this.cancel has any value, if it has, cancel the previous request
    if (this.cancel) {
      this.cancel.cancel();
    }

    // if not, create a new token and store inside of the axios cancel token
    this.cancel = axios.CancelToken.source();
    this.setState({ loading: true, message: "" });
    axios
      .get(searchUrl, {
        cancelToken: this.cancel.token,
      })
      .then((res) => {
        const total = res.data.numFound; // get the total number of pages returned
        const totalPagesCount = this.getPageCount(total, 20);

        const resultNotFoundMessage = !res.data.docs.length
          ? "There are no more search results. Please try a new search."
          : "";

        this.setState({
          results: res.data.docs,
          message: resultNotFoundMessage,
          totalResults: total,
          totalPages: totalPagesCount,
          currentPageNo: pageNo,
          loading: false,
        });
      })
      .catch((error) => {
        if (error && error.message) {
          this.setState({
            loading: false,
            message: "Page not found",
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
      this.setState({ query }, () => {
        this.getSearchResults(query);
      });
    }
  };

  // fn to handle pagination
  handlePagination = (type, event) => {
    event.preventDefault();
    // Previous is if user is on page 2, and needs to go to page 1, then this.state.currentPageNo - 1, else Next - this.state.currentPageNo + 1
    const updatedPageNo =
      type === "prev"
        ? this.state.currentPageNo - 1
        : this.state.currentPageNo + 1;

    if (!this.state.loading) {
      this.getSearchResults(this.state.query, updatedPageNo);
    }
  };

  // fn to pull results out of the state
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
        <div className="resultsContainer">
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
                    cover={cover_i}
                    authorName={author_name}
                    firstPublishYear={first_publish_year}
                  />
                </div>
              );
            })}
        </div>
      );
    }
  };

  render() {
    const { query, loading, message, currentPageNo, totalPages } = this.state;
    const showPrevLink = query && currentPageNo > 1;
    const showNextLink = query && totalPages > currentPageNo;

    return (
      <div data-testid="searchForm-1">
        <div className="wrapper">
          <div className="formContainer">
            <form onSubmit={(event) => event.preventDefault()}>
              <div className="searchByTitle">
                <label htmlFor="searchInput">Type a book title to search</label>
                <input
                  type="text"
                  name="query"
                  value={query}
                  id="searchInput"
                  placeholder=" (ex. The Great Gatsby)"
                  onChange={this.handleOnInputChange}
                />
                <FontAwesomeIcon icon={faSearch} className="searchIcon" />
              </div>

              <div className="sortResults">
                <label htmlFor="sort">
                  Sort Alphabetically or Recently published
                </label>
                <select name="sort" id="sort" onChange={this.handleSort}>
                  <option value="" default>
                    Click to select
                  </option>
                  <option value="alphabet">Alphabetically</option>
                  <option value="recentlyPublished">Recently Published</option>
                </select>
              </div>
            </form>
          </div>

          {/* Error Message*/}
          {message && <p className="message">{message}</p>}

          {/* Loader*/}
          <img
            src={Loader}
            className={`searchLoading ${loading ? "show" : "hide"}`}
            alt="Searching"
          />

          {/* Page navigation */}
          <Pagination
            loading={loading}
            showPrevLink={showPrevLink}
            showNextLink={showNextLink}
            handlePrevClick={(event) => this.handlePagination("prev", event)}
            handleNextClick={(event) => this.handlePagination("next", event)}
          />

          {/* Results */}
          {this.displaySearchResults()}

          {/* Page navigation */}
          <Pagination
            loading={loading}
            showPrevLink={showPrevLink}
            showNextLink={showNextLink}
            handlePrevClick={(event) => this.handlePagination("prev", event)}
            handleNextClick={(event) => this.handlePagination("next", event)}
          />
        </div>
      </div>
    );
  }
}

export default SearchForm;
