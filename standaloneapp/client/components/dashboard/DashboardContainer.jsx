import React, { useEffect, useState } from "react";
import { Router, Switch, Route } from "react-router-dom";
import ChartSetup from "./ChartSetup";
import ChartsContainer from "./ChartsContainer";
import history from "./dashboardHistory";

const DashboardContainer = ({
  allCharts,
  setAllCharts,
  prometheusInstance,
  setPrometheusInstance
}) => {

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
      list: ["12 Hours", "3 Hours", "1 Hour", "30 Minutes", "15 Minutes", "5 Minutes", "1 Minute", "10 Seconds", "1 Second"]
    },
    timeRangeSelected: {
      name: "timeRangeSelected",
      title: "Time Range Selected",
      list: ["6 Hours"]
    }
  });

  /* 
  helper function to initialize state of filters for chart setup page
  */
  const initialFilters = (object) => object;

  /* 
  initializes state of data selector columns, chart name,
  chart display, filters, and Prometheus instance for chart setup page
  */
  const [columns, setColumns] = useState(() => initialColumns([]));
  const [chartName, setChartName] = useState(() => "");
  const [chart, setChart] = useState(() => []);
  const [filters, setFilters] = useState(() => initialFilters({}));
  
  /*
  retrieves all metrics being tracked by Prometheus that are of gauge
  or counter data types to list on chart setup page
  */
  const getAllPromMetrics = async () => {
    let metrics;
    if (prometheusInstance !== undefined) {
      await fetch(`http://${prometheusInstance.ipAddress}:${prometheusInstance.port}/api/v1/metadata`)
      .then(response => response.json())
      .then(response => {
        const detailedMetrics = response.data;
        metrics = Object.keys(detailedMetrics).filter(metric => {
          return detailedMetrics[metric][0].type === "gauge" || detailedMetrics[metric][0].type === "counter"
        });
        setColumns(initialColumns(metrics))
      });
    }
  }

  /*
  retrieves all labels from Prometheus to list on chart setup page
  */
  const getPrometheusLabels = async () => {
    const labels = {};
    if (prometheusInstance !== undefined) {
      await fetch(`http://${prometheusInstance.ipAddress}:${prometheusInstance.port}/api/v1/labels`)
        .then(response => response.json())
        .then(response => {
          response.data.forEach(label => labels[label] = null)
          setFilters(initialFilters(labels));
      });
    }
     
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
              id="saved-chart"
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
              prometheusInstance={prometheusInstance}
              setPrometheusInstance={setPrometheusInstance}
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
              prometheusInstance={prometheusInstance}
              setPrometheusInstance={setPrometheusInstance}
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
              prometheusInstance={prometheusInstance}
              setPrometheusInstance={setPrometheusInstance}
            />
          </Route>
        </Switch>
      </Router>
    </div>
  );

};

export default DashboardContainer;
