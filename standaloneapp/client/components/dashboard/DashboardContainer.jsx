import React, { useEffect, useState } from "react";
import { Router, Switch, Route } from "react-router-dom";
import ChartSetup from "./ChartSetup";
import ChartsContainer from "./ChartsContainer";
import history from "./dashboardHistory";

const DashboardContainer = ({ allCharts, setAllCharts }) => {

  /* 
  helper function to initialize state of data selector
  columns for chart setup page
  */
  const initialColumns = (metricsList) => ({
    aggregationOptions: {
      name: "aggregationOptions",
      title: "Aggregation Options",
      list: ["Sum", "Average", "Multiply", "Divide", "Minimum", "Maximum"]
    },
    aggregationSelected: {
      name: "aggregationSelected",
      title: "Aggregation Selected",
      list: []
    },
    metricsOptions: {
      name: "metricsOptions",
      title: "Metrics Options",
      list: metricsList
    },
    metricsSelected: {
      name: "metricsSelected",
      title: "Metrics Selected",
      list: []
    },
    timeRange: {
      name: "timeRange",
      title: "Time Range",
      list: ["Last 12 Hours", "Last 3 Hours", "Last 1 Hour", "Last 30 Minutes", "Last 15 Minutes", "Last 5 Minutes", "Last 1 Minute", "Last 10 Seconds", "Last 1 Second"]
    },
    timeRangeSelected: {
      name: "timeRangeSelected",
      title: "Time Range Selected",
      list: ["Last 6 Hours"]
    }
  });

  /* 
  initializes state of data selector columns, chart name,
  chart display, Prometheus labels, and filters for chart setup page
  */
  const [columns, setColumns] = useState(() => initialColumns([]));
  const [chartName, setChartName] = useState(() => "");
  const [chart, setChart] = useState(() => []);
  const [filters, setFilters] = useState(() => {});

  /*
  retrieves all metrics being tracked by Prometheus that are of gauge
  or counter data types to list on chart setup page
  */
  const getAllPromMetrics = async () => {
    let metrics;
    await fetch("http://localhost:9090/api/v1/metadata")
    .then(response => response.json())
    .then(response => {
      const detailedMetrics = response.data;
      metrics = Object.keys(detailedMetrics).filter(metric => {
        return detailedMetrics[metric][0].type === "gauge" || detailedMetrics[metric][0].type === "counter"
      });
      setColumns(initialColumns(metrics))
    });
  }

  /* 
  handles click on new dashboard chart button:
  retrieves metrics from Prometheus, resets chart name, and resets
  chart display for chart set up page
  */
  const newDashboardChart = () => {
    getAllPromMetrics();
    getPrometheusLabels();
    setChartName("");
    setChart([]);
    history.push("/dashboard/new-chart");
  }

  const getPrometheusLabels = async () => {
    let labels;
    const initialFilters = {};
    await fetch("http://localhost:9090/api/v1/labels")
      .then(response => response.json())
      .then(response => {
        labels = response.data;
        labels.forEach(label => initialFilters[label] = true)
        setFilters(initialFilters);
      });
  }

  useEffect(() => {
    getPrometheusLabels();
  }, []);

  return (
    <div>
      <button
        id="new-dashboard-chart"
        onClick={newDashboardChart}
      >
        New Dashboard Chart
      </button>
      <Router history={history}>
        <Switch>
          <Route exact path="/">
            <ChartsContainer
              allCharts={allCharts}
              setAllCharts={setAllCharts}
              columns={columns}
              setColumns={setColumns}
              chartName={chartName}
              setChartName={setChartName}
              chart={chart}
              setChart={setChart}
              filters={filters}
              setFilters={setFilters}
            />
          </Route>
          <Route path="/dashboard/new-chart">
            <ChartSetup
              id="new-chart"
              allCharts={allCharts}
              setAllCharts={setAllCharts}
              columns={columns}
              setColumns={setColumns}
              chartName={chartName}
              setChartName={setChartName}
              chart={chart}
              setChart={setChart}
              filters={filters}
              setFilters={setFilters}
            />
          </Route>
          <Route path="/dashboard/edit-chart">
            <ChartSetup
              id="edit-chart"
              allCharts={allCharts}
              setAllCharts={setAllCharts}
              columns={columns}
              setColumns={setColumns}
              chartName={chartName}
              setChartName={setChartName}
              chart={chart}
              setChart={setChart}
              filters={filters}
              setFilters={setFilters}
            />
          </Route>
        </Switch>
      </Router>
    </div>
  );

};

export default DashboardContainer;
