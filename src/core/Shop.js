import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import Card from "./Card";
import { getCategories, getFilteredProducts } from "./apiCore";
import Checkbox from "./Checkbox";
import RadioBox from "./RadioBox";
import { prices } from "./fixedPrices";

const Shop = () => {
  const [myFilters, setMyFilters] = useState({
    filters: { category: [], price: [] }
  });
  const [categories, setCategories] = useState([]);
  /* eslint-disable no-unused-vars */
  const [error, setError] = useState(false);
  const [limit] = useState(6);
  const [skip, setSkip] = useState(0);
  const [size, setSize] = useState(0);
  const [filteredResults, setFilteredResults] = useState([]);

  const init = () => {
    getCategories().then(data => {
      if (data && data.error) {
        setError(data.error);
      } else if (Array.isArray(data)) {
        setCategories(data);
      }
    }).catch(() => {});
  };

  const loadFilteredResults = newFilters => {
    getFilteredProducts(0, limit, newFilters).then(data => {
      if (data && data.error) {
        setError(data.error);
      } else if (data && data.data) {
        setFilteredResults(data.data);
        setSize(data.size || 0);
        setSkip(0);
      }
    }).catch(() => {});
  };

  const loadMore = () => {
    let toSkip = skip + limit;
    getFilteredProducts(toSkip, limit, myFilters.filters).then(data => {
      if (data && data.error) {
        setError(data.error);
      } else if (data && data.data) {
        setFilteredResults(prev => [...prev, ...data.data]);
        setSize(data.size || 0);
        setSkip(toSkip);
      }
    }).catch(() => {});
  };

  useEffect(() => {
    init();
    loadFilteredResults(myFilters.filters);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleFilters = (filters, filterBy) => {
    const newFilters = { ...myFilters };
    newFilters.filters[filterBy] = filters;

    if (filterBy === "price") {
      let priceValues = handlePrice(filters);
      newFilters.filters[filterBy] = priceValues;
    }
    loadFilteredResults(newFilters.filters);
    setMyFilters(newFilters);
  };

  const handlePrice = value => {
    const data = prices;
    let array = [];
    for (let key in data) {
      if (data[key]._id === parseInt(value)) {
        array = data[key].array;
      }
    }
    return array;
  };

  const resetFilters = () => {
    const fresh = { filters: { category: [], price: [] } };
    setMyFilters(fresh);
    loadFilteredResults(fresh.filters);
  };

  return (
    <Layout
      title="Destinations & Sanctuaries - TravelYaari"
      description="Curated boutique resorts and extraordinary retreats across India."
      className="p-0 m-0"
    >
      {/* Catalog Header */}
      <div style={{ backgroundColor: "#FAF9F6", borderBottom: "1px solid #ECE8E0" }} className="py-5">
        <div className="container">
          <span className="text-uppercase" style={{ fontSize: "12px", fontWeight: "700", letterSpacing: "0.15em", color: "#0F5132" }}>
            The Destination Directory
          </span>
          <h1
            className="mt-1 mb-2"
            style={{
              fontFamily: "var(--font-serif, 'Playfair Display', Georgia, serif)",
              fontSize: "36px",
              fontWeight: "700",
              color: "#111827"
            }}
          >
            Curated Sanctuaries Across India
          </h1>
          <p className="text-muted mb-0" style={{ maxWidth: "680px", fontSize: "15px", lineHeight: "1.6" }}>
            From snow-draped alpine peaks in Uttarakhand to serene coastal havens in Goa, discover vetted sanctuaries crafted for rest, beauty, and authentic discovery.
          </p>
        </div>
      </div>

      {/* Main Filter & Listing Body */}
      <div className="container py-5">
        <div className="row">
          
          {/* Left Sidebar Filters */}
          <div className="col-lg-3 col-md-4 mb-4 mb-md-0">
            <div
              className="p-4 bg-white rounded shadow-sm sticky-top"
              style={{
                top: "90px",
                border: "1px solid #E5E7EB",
                borderRadius: "14px"
              }}
            >
              <div className="d-flex align-items-center justify-content-between pb-3 mb-3 border-bottom">
                <h5 className="font-weight-bold mb-0" style={{ fontSize: "16px", color: "#111827" }}>
                  <i className="fa fa-sliders mr-2 text-muted"></i> Refine Stays
                </h5>
                <button
                  onClick={resetFilters}
                  className="btn btn-sm btn-link text-muted p-0"
                  style={{ fontSize: "12px", textDecoration: "none" }}
                >
                  Reset
                </button>
              </div>

              {/* Category Filter */}
              <div className="mb-4">
                <span className="text-uppercase font-weight-bold d-block mb-2" style={{ fontSize: "11px", letterSpacing: "0.08em", color: "#6B7280" }}>
                  Experience Type
                </span>
                <Checkbox
                  categories={categories}
                  handleFilters={filters => handleFilters(filters, "category")}
                />
              </div>

              <hr />

              {/* Price Filter */}
              <div className="mb-2">
                <span className="text-uppercase font-weight-bold d-block mb-2" style={{ fontSize: "11px", letterSpacing: "0.08em", color: "#6B7280" }}>
                  Nightly Rate (INR)
                </span>
                <RadioBox
                  prices={prices}
                  handleFilters={filters => handleFilters(filters, "price")}
                />
              </div>
            </div>
          </div>

          {/* Right Product Grid */}
          <div className="col-lg-9 col-md-8">
            <div className="d-flex align-items-center justify-content-between mb-4 pb-2 border-bottom">
              <span className="text-muted" style={{ fontSize: "14px" }}>
                Showing <strong className="text-dark tabular-nums">{filteredResults.length}</strong> curated destination{filteredResults.length === 1 ? '' : 's'}
              </span>
              <span className="text-muted" style={{ fontSize: "13px" }}>
                <i className="fa fa-check-circle text-success mr-1"></i> Best Rate Guaranteed
              </span>
            </div>

            {filteredResults.length === 0 ? (
              <div className="text-center py-5 bg-white rounded border my-4">
                <i className="fa fa-compass text-muted mb-3" style={{ fontSize: "36px" }}></i>
                <h4 className="font-weight-bold mb-2">No matching destinations found</h4>
                <p className="text-muted mb-4" style={{ fontSize: "14px" }}>
                  Try selecting a different experience category or expanding your price tier.
                </p>
                <button
                  onClick={resetFilters}
                  className="btn btn-sm text-white px-3 py-2"
                  style={{ backgroundColor: "#0F5132", borderRadius: "8px", fontWeight: "600" }}
                >
                  Show All Destinations
                </button>
              </div>
            ) : (
              <div className="row">
                {filteredResults.map((product, i) => (
                  <div key={i} className="col-lg-4 col-md-6 col-sm-6 mb-4">
                    <Card product={product} />
                  </div>
                ))}
              </div>
            )}

            {/* Load more button */}
            {size > 0 && size >= limit && (
              <div className="text-center mt-4">
                <button
                  onClick={loadMore}
                  className="btn btn-outline-secondary px-4 py-2 font-weight-bold"
                  style={{ borderRadius: "8px", fontSize: "14px" }}
                >
                  Load More Escapes <i className="fa fa-angle-down ml-1"></i>
                </button>
              </div>
            )}
          </div>

        </div>
      </div>
    </Layout>
  );
};

export default Shop;
