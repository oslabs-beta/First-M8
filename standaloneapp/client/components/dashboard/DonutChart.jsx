import React, { useState, useEffect } from "react";
import { ResponsiveContainer, PieChart, Pie, Cell, Label, Tooltip } from "recharts";
import queryAlgorithms from "./queryAlgorithms";

const DonutChart = ({
  format,
  type,
  id,
  columns,
  prometheusInstance,
  setPrometheusInstance
}) => {
  const [data, setData] = useState(() => []);
  const [labelForDonut, setLabelForDonut] = useState(() => "");

  const getData = async () => {
    let query;
    const aggregation = columns.aggregationSelected.list;
    const metric = columns.metricsSelected.list;
    const time = columns.timeRangeSelected.list;

    if (aggregation.length === 0 && time.length !== 0) {
      // placeholder for logic to construct PromQL queries
      query = queryAlgorithms.rangeQuery(metric, time);
    } else if (aggregation.length === 0 && time.length === 0) {
      // placeholder for logic to construct PromQL queries
      query = queryAlgorithms.instantQuery(metric);
    } else if (aggregation.length > 0 && time.length === 0) {
      // placeholder for logic to construct PromQL queries
      query = queryAlgorithms.instantQueryWithAggregation(metric, aggregation);
    }
    
    if (prometheusInstance !== undefined) {
      await fetch(`http://${prometheusInstance.ipAddress}:${prometheusInstance.port}/api/v1/${query}`)
      .then((response) => response.json())
      .then(response => {    
        const percentageUsed = parseFloat(response.data.result[0].value[1])
        const newData = [
          { name: "used", value: percentageUsed},
          { name: "remaining", value: 1 - percentageUsed}
        ];
        setData(newData);
        setLabelForDonut(`${Math.round(newData[0].value * 100)}%`)
      });
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
      <PieChart>
        <Pie
          data={data}
          dataKey="value"
          innerRadius={60}
          outerRadius={80}
        >
          {data.map((dataPoints, index) => {
            if (index === 1) {
              return <Cell fill="#f3f6f9" />
            }
            return <Cell fill="green" />
          })}
        <Label 
          value={labelForDonut}
          position="center"
          fill="grey"
          style={{
            fontSize: "32px",
            fontWeight: "bold",
            fontFamily: "Roboto"
          }}
        />
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  )
}

export default DonutChart;