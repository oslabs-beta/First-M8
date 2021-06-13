import React from 'react';
import IndividualDropDown from './IndividualDropDown';

const DataFilters = ({
  filters,
  setFilters,
  onChange,
  prometheusInstance,
  setPrometheusInstance,
}) => {
  /*
  displays drop down for each Prometheus label on chart setup page
  */
  const labels = [];
  Object.keys(filters).forEach((label) => {
    if (label !== '__name__') {
      labels.push(
        <IndividualDropDown
          filters={filters}
          setFilters={setFilters}
          label={label}
          onChange={onChange}
          prometheusInstance={prometheusInstance}
          setPrometheusInstance={setPrometheusInstance}
        />,
      );
    }
  });

  return (
    <div className="data-filters">
      {labels}
    </div>
  );
};

export default DataFilters;
