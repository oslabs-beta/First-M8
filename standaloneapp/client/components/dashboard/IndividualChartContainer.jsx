import React from "react";
import { Router, Switch, Route } from "react-router-dom";
import ChartSetup from "./ChartSetup";
import TimeSeriesChart from "./TimeSeriesChart";
import history from "./dashboardHistory";

const IndividualChartContainer = ({
  allCharts,
  setAllCharts,
  columns,
  setColumns,
  chartName,
  setChartName,
  chart,
  setChart
}) => {
  const editChart = async () => {
    await fetch(`/dashboard/editChart/${chartName}`)
      .then(response => response.json())
      .then(data => {
        console.log(data)
        setColumns(data.columns)
        setChartName(data.name);
      });
    // setChart(chart);
    history.push("/dashboard/edit-chart");
  }



  return (
    <div className="individual-chart-container">
      <div>{chartName}</div>
      <TimeSeriesChart
        id={chartName}
        query={chart[0].props.query}
      />
      <button id="edit-chart" onClick={editChart}>Edit</button> <button id="delete-chart">Delete</button>
    </div>
  )
}

export default IndividualChartContainer;