import React, { useEffect, useState } from "react";
import { Router, Switch, Route } from "react-router-dom";
import ChartSetup from "./ChartSetup";
import ChartsContainer from "./ChartsContainer";
import history from "./dashboardHistory";

const DashboardContainer = ({ allCharts, setAllCharts }) => {
  const initialColumns = (metricsList) => ({
    aggregationOptions: {
      name: "aggregationOptions",
      title: "Aggregation Options",
      list: ["sum", "average", "multiply", "divide", "minimum", "maximum"]
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
    }
  });

  const [columns, setColumns] = useState(() => initialColumns([]));
  const [chartName, setChartName] = useState(() => "");
  const [chart, setChart] = useState(() => []);

  const getAllPromMetrics = async () => {
    let metrics;
    await fetch("http://localhost:9090/api/v1/metadata")
    .then(response => response.json())
    .then(data => {
      const detailedMetrics = data.data;
      metrics = Object.keys(detailedMetrics).filter(metric => metric.includes("prometheus"));
      setColumns(initialColumns(metrics))
    });
  }

  const newDashboardChart = () => {
    getAllPromMetrics();
    setChartName("");
    setChart([]);
    history.push("/dashboard/new-chart");
  }

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
            />
          </Route>
          <Route path="/dashboard/new-chart">
            <ChartSetup
              allCharts={allCharts}
              setAllCharts={setAllCharts}
              columns={columns}
              setColumns={setColumns}
              chartName={chartName}
              setChartName={setChartName}
              chart={chart}
              setChart={setChart}
            />
          </Route>
          <Route path="/dashboard/edit-chart">
            <ChartSetup
              allCharts={allCharts}
              setAllCharts={setAllCharts}
              columns={columns}
              setColumns={setColumns}
              chartName={chartName}
              setChartName={setChartName}
              chart={chart}
              setChart={setChart}
            />
          </Route>
        </Switch>
      </Router>
    </div>
  );
};

export default DashboardContainer;
