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
  setChart
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
      />);
  });

  return (
    <div className="charts-container">
      {chartsToDisplay}
    </div>
  )
  
}

export default ChartsContainer;