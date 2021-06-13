/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState, useEffect } from 'react';

const IndividualDropDown = ({
  filters,
  label,
  onChange,
  prometheusInstance,
}) => {
  /*
  initializes options for a single label dropdown
  */
  const [options, setOptions] = useState(() => []);

  /*
  retrieves options from Prometheus for a particular label
  */
  const getOptions = async () => {
    const optionTags = [<option value="" />];
    if (prometheusInstance !== undefined) {
      await fetch(`http://${prometheusInstance.ipAddress}:${prometheusInstance.port}/api/v1/label/${label}/values`)
        .then((response) => response.json())
        .then((response) => {
          response.data.forEach((option) => {
            if (filters[label] === option) {
              optionTags.push(
                <option value={option} selected="true">{option}</option>,
              );
            } else {
              optionTags.push(
                <option value={option}>{option}</option>,
              );
            }
          });
          setOptions(optionTags);
        });
    }
  };

  useEffect(() => {
    getOptions();
  }, []);

  return (
    <div className="individual-drop-down">
      <label>{label}</label>
      <select id={label} onChange={onChange}>
        {options}
      </select>
    </div>
  );
};

export default IndividualDropDown;
