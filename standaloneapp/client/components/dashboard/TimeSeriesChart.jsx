import React, { useState, useEffect } from "react";
import { CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis, LineChart, Line } from "recharts";
import moment from "moment";
import queryAlgo from "./queryAlgorithms";


const TimeSeriesChart = ({
  format,
  type,
  id,
  columns,
  filters,
  prometheusInstance,
  setPrometheusInstance
}) => {
  
  const [chartSeries, setChartSeries] = useState(() => []);

  const getData = async () => {
    let query;
    const aggregation = columns.aggregationSelected.list;
    const metric = columns.metricsSelected.list;
    const time = columns.timeRangeSelected.list;

    query = queryAlgo(metric, time, aggregation, filters);
    
    const chartLines = [];
    const dataSeries = [];
    if (prometheusInstance !== undefined) {
      await fetch(`http://${prometheusInstance.ipAddress}:${prometheusInstance.port}/api/v1/query_range?${query}`)
      .then((response) => response.json())
      .then(response => {   
        response.data.result.forEach(metric => {
          const series = metric.values.map((dataPoint) => {
            return ({
              value: parseInt(dataPoint[1]),
              time: dataPoint[0]
            });
          });
          dataSeries.push(series);
        });
        dataSeries.forEach(series => {
          chartLines.push(
            <Line data={series} dataKey="value" dot={false} type={"natural"} />
          );
        });
        setChartSeries(chartLines);
      })
    }
  }

  

  useEffect(() => {
    getData();
    if (type === "saved-chart") {
      const interval = setInterval(() => {
        console.log('refetching');
        getData()
      }, 60000);
      return () => clearInterval(interval);
    }
    
  }, []);

  return (
    <ResponsiveContainer width="95%" height={500}>
      <LineChart>
        <XAxis
          dataKey="time"
          domain={["dataMin", "dataMax"]}
          name="Time"
          tickFormatter={time => moment.unix(time).format("h:mm:ss A")}
          scale="time"
          type="number"
        />
        <YAxis dataKey="value" name="Value" />
        <CartesianGrid />
        <Tooltip 
          labelFormatter={time => moment(Date(time)).format("h:mm:ss A")}
        />
        {chartSeries}
      </LineChart>
    </ResponsiveContainer>
  )
}

export default TimeSeriesChart;