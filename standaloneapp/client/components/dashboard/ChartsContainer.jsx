import React, { useEffect } from "react";
import IndividualChartContainer from "./IndividualChartContainer";


const ChartsContainer = ({
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

  const chartsToDisplay = [];
  allCharts.forEach(individualChart => {
    chartsToDisplay.push(
      <IndividualChartContainer
        format={individualChart[0].props.format}
        id={id}
        allCharts={allCharts}
        setAllCharts={setAllCharts}
        columns={individualChart[0].props.columns}
        setColumns={setColumns}
        chartName={individualChart[0].props.id}
        setChartName={setChartName}
        chart={individualChart}
        setChart={setChart}
        filters={individualChart[0].props.filters}
        setFilters={setFilters}
        prometheusInstance={prometheusInstance}
        setPrometheusInstance={setPrometheusInstance}
      />);
  });

  return (
    <div className="charts-container">
      {chartsToDisplay}
    </div>
  )
  
}

export default ChartsContainer;