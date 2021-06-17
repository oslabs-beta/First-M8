import React, { useState, useEffect } from 'react';
import queryAlgo from './promQLQueryAlgorithms';

const SingleNumberDisplay = ({
  type,
  columns,
  filters,
  prometheusInstance,
}) => {
  /*
  initializes state of data single number display
  */
  const [data, setData] = useState(() => 0);

  /*
  retrieves data from Prometheus based on data selector columns
  to be represented as a single number
  */
  const getData = async () => {
    const aggregation = columns.aggregationSelected.list;
    const metrics = columns.metricsSelected.list;
    const time = columns.timeRangeSelected.list;

    const query = queryAlgo(metrics, time, aggregation, filters);
    console.log(query);

    if (prometheusInstance !== undefined) {
      await fetch(`http://${prometheusInstance.ipAddress}:${prometheusInstance.port}/api/v1/query?${query}`)
        .then((response) => response.json())
        .then((response) => {
          console.log(response);
          setData(parseInt(response.data.result[0].value[1]));
        });
    }
  };

  /*
  sets up a recurring fetch request to Prometheus every minute
  to update donut chart with latest data
  */
  useEffect(() => {
    getData();
    if (type === 'saved-chart') {
      const interval = setInterval(() => {
        console.log('refetching');
        getData();
      }, 60000);
      return () => clearInterval(interval);
    }
  }, []);

  return (
    <div>
      <span>{data}</span>
    </div>
  );
};

export default SingleNumberDisplay;
