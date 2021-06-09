import React from "react";
import IndividualDropDown from "./IndividualDropDown";

const DataFilters = ({
  filters,
  setFilters,
  onChange
}) => {
  const labels = [];
  Object.keys(filters).forEach(label => {
    if (label !== "__name__") {
      labels.push(
        <IndividualDropDown
          filters={filters}
          setFilters={setFilters}
          label={label}
          onChange={onChange}
        /> 
      );
    }
  })

  return (
    <div className="data-filters">
      {labels}
    </div>
  )
}

export default DataFilters;