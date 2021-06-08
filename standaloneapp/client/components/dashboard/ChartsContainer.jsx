import React, { useEffect } from "react";
import IndividualChartContainer from "./IndividualChartContainer";


const ChartsContainer = ({
  allCharts,
  setAllCharts,
  columns,
  setColumns,
  chartName,
  setChartName,
  chart,
  setChart,
  prometheusLabels,
  setPrometheusLabels,
  filters,
  setFilters
}) => {

  const chartsToDisplay = [];
  allCharts.forEach(individualChart => {
    chartsToDisplay.push(
      <IndividualChartContainer
        allCharts={allCharts}
        setAllCharts={setAllCharts}
        columns={columns}
        setColumns={setColumns}
        chartName={individualChart[0].props.id}
        setChartName={setChartName}
        chart={individualChart}
        setChart={setChart}
        prometheusLabels={prometheusLabels}
        setPrometheusLabels={setPrometheusLabels}
        filters={filters}
        setFilters={setFilters}
      />);
  });

  return (
    <div className="charts-container">
      {chartsToDisplay}
    </div>
  )
  
}

export default ChartsContainer;