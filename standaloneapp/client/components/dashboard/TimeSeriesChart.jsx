import React, { useState, useEffect } from "react";
import { CartesianGrid, Legend, ResponsiveContainer, Scatter, ScatterChart, Tooltip, XAxis, YAxis } from "recharts";
import moment from "moment";


const TimeSeriesChart = ({
  id,
  query
}) => {
  // placeholder for logic to send PromQL query to DB
  const [chartData, setChartData] = useState(() => [])
  
  const getData = async (query) => {
    const timeNow = Date.now() / 1000
    const timeRange = (Date.now() - 300000) / 1000;
    
    let newChartData;
    await fetch(`http://localhost:9090/api/v1/query_range?${query}&start=${timeRange}&end=${timeNow}&step=1`)
    .then((res) => res.json())
    .then((result) => {
      // console.log('result', result);

      const dataFiltered = result.data.result.filter((dataPoint) => (dataPoint.metric.code === '200'
        && dataPoint.metric.handler === "/api/v1/metadata"
        && dataPoint.metric.instance === "localhost:9090"
        && dataPoint.metric.job === "prometheus"
      ));
      // console.log('datafiltered', dataFiltered)
      newChartData = dataFiltered[0].values.map((dataPoint) => {
        return ({
          value: parseInt(dataPoint[1]),
          time: dataPoint[0]
        })
      })
      // console.log("new chart data", newChartData)
      setChartData(newChartData);
    })
  }

  useEffect(() => {
    getData(query);
  }, []);

  // console.log("chartData", chartData);
  return (
    <ResponsiveContainer width="95%" height={500}>
      <ScatterChart>
        <XAxis
          dataKey="time"
          domain={["auto", "auto"]}
          name="Time"
          tickFormatter={(unixTime) => moment(unixTime).format("HH:mm:ss")}
          type="number"
        />
        <YAxis dataKey="value" name="Value" />

        <Scatter
          data={chartData}
          line={{ stroke: "#eee" }}
          lineJointType="monotoneX"
          lineType="joint"
          name="Values"
        />
      </ScatterChart>
    </ResponsiveContainer>
  )
}

export default TimeSeriesChart;