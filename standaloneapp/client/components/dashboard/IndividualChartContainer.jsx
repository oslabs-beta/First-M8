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

  /*
  handles click on edit button:
  retrieves chart name and data selector columns for particular chart from database
  to display on chart set up page
  */
  const editChart = async () => {
    await fetch(`/dashboard/editChart/${chartName}`)
      .then(response => response.json())
      .then(data => {
        setColumns(data.columns)
        setChartName(data.name);
      });
    const chartToEdit = [<TimeSeriesChart id={chartName} query={chart[0].props.query}/>]
    setChart(chartToEdit);
    history.push("/dashboard/edit-chart");
  }

  /*
  handles click on delete button:
  deletes all information for particular chart from database, updates all charts
  accordingly to display on main dashboard page
  */
  const deleteChart = async () => {
    await fetch(`/dashboard/deleteChart/${chartName}`, { method: "DELETE" })
      .then(response => response.json())
      .then(data => {
        console.log("individual container", data);
        setAllCharts(data);
      });
  }

  return (
    <div className="individual-chart-container">
      <div>{chartName}</div>
      <TimeSeriesChart
        id={chartName}
        query={chart[0].props.query}
      />
      <button id="edit-chart" onClick={editChart}>Edit</button> <button id="delete-chart" onClick={deleteChart}>Delete</button>
    </div>
  )

}

export default IndividualChartContainer;