import React, { useState } from "react";

const CheckBox = ({ categories, handleFilters }) => {
  const [selected, setSelected] = useState("");

  const handleSelect = (categoryId) => {
    const nextVal = selected === categoryId ? "" : categoryId;
    setSelected(nextVal);
    handleFilters(nextVal ? [nextVal] : []);
  };

  return (
    <div className="d-flex flex-column" style={{ gap: "8px" }}>
      <button
        type="button"
        onClick={() => handleSelect("")}
        className="d-flex align-items-center justify-content-between p-2 rounded text-left border-0"
        style={{
          backgroundColor: selected === "" ? "#E8F5E9" : "transparent",
          color: selected === "" ? "#0F5132" : "#4B5563",
          fontWeight: selected === "" ? "600" : "400",
          fontSize: "14px",
          transition: "all 0.15s ease",
          cursor: "pointer"
        }}
      >
        <span>All Experiences</span>
        {selected === "" && <i className="fa fa-check text-success" style={{ fontSize: "12px" }}></i>}
      </button>

      {categories.map((c, i) => {
        const isCurrent = selected === c._id;
        return (
          <button
            key={i}
            type="button"
            onClick={() => handleSelect(c._id)}
            className="d-flex align-items-center justify-content-between p-2 rounded text-left border-0"
            style={{
              backgroundColor: isCurrent ? "#E8F5E9" : "transparent",
              color: isCurrent ? "#0F5132" : "#4B5563",
              fontWeight: isCurrent ? "600" : "400",
              fontSize: "14px",
              transition: "all 0.15s ease",
              cursor: "pointer"
            }}
          >
            <span>{c.name}</span>
            {isCurrent && <i className="fa fa-check text-success" style={{ fontSize: "12px" }}></i>}
          </button>
        );
      })}
    </div>
  );
};

export default CheckBox;
