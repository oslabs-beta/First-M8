import React, { useState, useEffect } from "react";
import { CartesianGrid, Legend, ResponsiveContainer, Scatter, ScatterChart, Tooltip, XAxis, YAxis, LineChart, Line } from "recharts";
import moment from "moment";


const TimeSeriesChart = ({
  id,
  query,
  prometheusInstance,
  setPrometheusInstance
}) => {
  // placeholder for logic to send PromQL query to DB
  const [chartSeries, setChartSeries] = useState(() => [])
  
  const getData = async (query) => {
    const timeNow = Date.now() / 1000;
    const timeRange = (Date.now() - 300000) / 1000;
    
    const chartLines = [];
    const dataSeries = [];
    if (prometheusInstance !== undefined) {
      await fetch(`http://${prometheusInstance.ipAddress}:${prometheusInstance.port}/api/v1/query_range?${query}&start=${timeRange}&end=${timeNow}&step=1`)
      .then((response) => response.json())
      .then(response => {
        console.log(response);
    
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
    getData(query);
    const interval = setInterval(() => {
      console.log('refetching');
      getData(query)
    }, 60000);
    return () => clearInterval(interval);
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