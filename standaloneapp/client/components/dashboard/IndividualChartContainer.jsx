import React from "react";
import { Router, Switch, Route } from "react-router-dom";
import ChartSetup from "./ChartSetup";
import TimeSeriesChart from "./TimeSeriesChart";
import history from "./dashboardHistory";

const IndividualChartContainer = ({
  id,
  allCharts,
  setAllCharts,
  columns,
  setColumns,
  chartName,
  setChartName,
  chart,
  setChart,
  filters,
  setFilters,
  prometheusInstance,
  setPrometheusInstance
}) => {

  /*
  handles click on edit button:
  retrieves chart name, data selector columns, and filters for
  particular chart from database to display on chart set up page
  */
  const editChart = async () => {
    await fetch(`/dashboard/editChart/${chartName}`)
      .then(response => response.json())
      .then(response => {
        console.log("inside fetch", response.columns);
        setColumns(response.columns)
        setChartName(response.name);
        setFilters(response.filters);
        const chartToEdit = [
          <TimeSeriesChart
            type="edit-chart"
            id={response.name}
            columns={response.columns}
            prometheusInstance={prometheusInstance}
            setPrometheusInstance={setPrometheusInstance}
          />
        ]
        setChart(chartToEdit);
      });
    history.push("/dashboard/edit-chart");
  }

  /*
  handles click on delete button:
  deletes all information for particular chart from database,
  updates all charts accordingly to display on main dashboard page
  */
  const deleteChart = async () => {
    await fetch(`/dashboard/deleteChart/${chartName}`, { method: "DELETE" })
      .then(response => response.json())
      .then(response => {
        console.log("individual container", response);
        setAllCharts(response);
      });
  }

  return (
    <div className="individual-chart-container">
      <div>{chartName}</div>
      <TimeSeriesChart
        type={id}
        id={chartName}
        columns={chart[0].props.columns}
        prometheusInstance={prometheusInstance}
        setPrometheusInstance={setPrometheusInstance}
      />
      <button id="edit-chart" onClick={editChart}>Edit</button> <button id="delete-chart" onClick={deleteChart}>Delete</button>
    </div>
  )

}

export default IndividualChartContainer;