import React, { useState } from "react";

const RadioBox = ({ prices, handleFilters }) => {
  const [value, setValue] = useState(0);

  const handleChange = event => {
    handleFilters(event.target.value);
    setValue(Number(event.target.value));
  };

  return (
    <div className="d-flex flex-column" style={{ gap: "10px" }}>
      {prices.map((p, i) => {
        const isSelected = value === p._id;
        return (
          <label
            key={i}
            className="d-flex align-items-center mb-0 p-2 rounded"
            style={{
              cursor: "pointer",
              backgroundColor: isSelected ? "#F3F4F6" : "transparent",
              color: isSelected ? "#111827" : "#4B5563",
              fontSize: "13.5px",
              fontWeight: isSelected ? "600" : "400",
              transition: "all 0.15s ease"
            }}
          >
            <input
              onChange={handleChange}
              value={`${p._id}`}
              name="priceFilter"
              type="radio"
              checked={isSelected}
              className="mr-2"
              style={{ accentColor: "#0F5132" }}
            />
            <span>{p.name}</span>
          </label>
        );
      })}
    </div>
  );
};

export default RadioBox;
