import React, { useState, useEffect } from "react";
import { getCategories, list } from "./apiCore";
import Card from "./Card";
import "../CSS/search.css";

const Search = () => {
  const [data, setData] = useState({
    categories: [],
    category: "",
    search: "",
    results: [],
    searched: false
  });

  const { categories, category, search, results, searched } = data;

  useEffect(() => {
    let isMounted = true;
    getCategories().then(resCategories => {
      if (isMounted && resCategories && !resCategories.error && Array.isArray(resCategories)) {
        setData(prev => ({ ...prev, categories: resCategories }));
      }
    }).catch(() => {});

    return () => {
      isMounted = false;
    };
  }, []);

  const searchData = () => {
    list({ search: search || undefined, category: category || undefined }).then(
      response => {
        if (response && !response.error && Array.isArray(response)) {
          setData(prev => ({ ...prev, results: response, searched: true }));
        }
      }
    ).catch(() => {});
  };

  const searchSubmit = e => {
    e.preventDefault();
    searchData();
  };

  const handleChange = name => event => {
    setData({ ...data, [name]: event.target.value, searched: false });
  };

  const searchMessage = (searched, results) => {
    if (searched && results.length > 0) {
      return (
        <div className="d-flex align-items-center justify-content-between mb-4 pb-2 border-bottom">
          <p className="mb-0 text-muted" style={{ fontSize: '14px' }}>
            Found <strong className="text-dark tabular-nums">{results.length}</strong> matching destination{results.length > 1 ? 's' : ''}
          </p>
          <button
            onClick={() => setData({ ...data, search: "", category: "", results: [], searched: false })}
            className="btn btn-sm btn-link text-muted p-0"
            style={{ fontSize: '13px', textDecoration: 'none' }}
          >
            Clear results
          </button>
        </div>
      );
    }
    if (searched && results.length < 1) {
      return (
        <div className="text-center py-5 my-3 bg-white rounded shadow-sm border">
          <i className="fa fa-compass text-muted mb-3" style={{ fontSize: '32px' }}></i>
          <h5 className="font-weight-bold mb-1">No exact destinations found</h5>
          <p className="text-muted mb-3" style={{ fontSize: '14px' }}>
            Try searching for a different keyword like "Auli", "Goa", "Kashmir", or select "All Experiences".
          </p>
          <button
            onClick={() => setData({ ...data, search: "", category: "", results: [], searched: false })}
            className="btn btn-sm btn-outline-secondary"
            style={{ borderRadius: '8px' }}
          >
            Reset Search
          </button>
        </div>
      );
    }
  };

  const searchedProducts = (results = []) => {
    return (
      <div className="container mt-4 mb-4">
        {searchMessage(searched, results)}
        <div className="row">
          {results.map((product, i) => (
            <div key={i} className="col-lg-3 col-md-6 col-sm-6 mb-4">
              <Card product={product} />
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="travelyaari-search-wrapper">
      <div className="search-console-card">
        <form onSubmit={searchSubmit}>
          <div className="row align-items-end">
            
            {/* Destination Keyword */}
            <div className="col-lg-6 col-md-6 mb-3 mb-lg-0">
              <label htmlFor="searchDestination" className="search-field-label">
                <i className="fa fa-map-marker mr-1" style={{ color: '#0F5132' }}></i> Destination or Resort
              </label>
              <input
                id="searchDestination"
                type="search"
                className="search-input-field"
                onChange={handleChange("search")}
                value={search}
                placeholder="Where would you like to escape? (e.g. Auli, Goa, Taj, Kashmir...)"
              />
            </div>

            {/* Experience Category */}
            <div className="col-lg-4 col-md-4 mb-3 mb-lg-0">
              <label htmlFor="searchCategory" className="search-field-label">
                <i className="fa fa-tree mr-1" style={{ color: '#0F5132' }}></i> Experience Style
              </label>
              <select
                id="searchCategory"
                className="search-input-field"
                onChange={handleChange("category")}
                value={category}
              >
                <option value="All">All Experiences</option>
                {categories.map((c, i) => (
                  <option key={i} value={c._id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Submit Button */}
            <div className="col-lg-2 col-md-2">
              <button className="search-submit-btn" type="submit">
                <i className="fa fa-search mr-2"></i> Search
              </button>
            </div>

          </div>
        </form>
      </div>

      {searchedProducts(results)}
    </div>
  );
};

export default Search;
