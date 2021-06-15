import React, { useState, useEffect } from 'react';
// eslint-disable-next-line object-curly-newline
import { CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis, LineChart, Line } from 'recharts';
import moment from 'moment';
import queryAlgo from './promQLQueryAlgorithms';

const TimeSeriesChart = ({
  type,
  columns,
  filters,
  prometheusInstance,
}) => {
  /*
  initializes state of data series for time series chart
  */
  const [chartSeries, setChartSeries] = useState(() => []);

  /*
  retrieves data from Prometheus based on data selector columns
  to be represented as a time series chart
  */
  const getData = async () => {
    const aggregation = columns.aggregationSelected.list;
    const metrics = columns.metricsSelected.list;
    const time = columns.timeRangeSelected.list;

    const query = queryAlgo(metrics, time, aggregation, filters);

    const chartLines = [];
    const dataSeries = [];
    if (prometheusInstance !== undefined) {
      await fetch(`http://${prometheusInstance.ipAddress}:${prometheusInstance.port}/api/v1/query_range?${query}`)
        .then((response) => response.json())
        .then((response) => {
          response.data.result.forEach((metric) => {
            const series = metric.values.map((dataPoint) => {
              return ({
                value: parseInt(dataPoint[1]),
                time: dataPoint[0],
              });
            });
            dataSeries.push(series);
          });
          dataSeries.forEach((series) => {
            chartLines.push(
            <Line data={series} dataKey="value" dot={false} type="natural" stroke="#005AAA" strokeWidth={3}/>,
            );
          });
          setChartSeries(chartLines);
        });
    }
  };

  /*
  sets up a recurring fetch request to Prometheus every minute
  to update time series chart with latest data
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
    <ResponsiveContainer width="95%" height={500}>
      <LineChart>
        <XAxis
          dataKey="time"
          domain={['dataMin', 'dataMax']}
          name="Time"
          tickFormatter={(time) => moment.unix(time).format('h:mm:ss A')}
          scale="time"
          type="number"
          style={{
            fontFamily: 'Arial, Helvetica, sans-serif',
          }}
        />
        <YAxis
          dataKey="value"
          name="Value"
          tickFormatter={(value) => (value / 1000).toLocaleString()}
          style={{
            fontFamily: 'Arial, Helvetica, sans-serif',
          }}
        />
        <CartesianGrid />
        <Tooltip
          labelFormatter={(time) => moment(Date(time)).format('h:mm:ss A')}
        />
        {chartSeries}
      </LineChart>
    </ResponsiveContainer>
  );
};

export default TimeSeriesChart;
