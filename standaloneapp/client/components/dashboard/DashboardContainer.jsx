import React, { useState } from "react";
import ChartSetup from "./ChartSetup";
import ChartsContainer from "./ChartsContainer";

const DashboardContainer = () => {
  const [allCharts, setAllCharts] = useState(() => []);
  const [chartSetupComponent, setChartSetupComponent] = useState(() => []);

  const startChartSetup = () => {
    setChartSetupComponent([<ChartSetup 
      chartSetupComponent={chartSetupComponent}
      setChartSetupComponent={setChartSetupComponent}
      allCharts={allCharts}
      setAllCharts={setAllCharts}
    />]);
  }

  return (
    <div>
      <button id="new-dashboard-element" onClick={startChartSetup}>New Dashboard Chart</button>
      {chartSetupComponent}
      <ChartsContainer 
        allCharts={allCharts}
        setAllCharts={setAllCharts}
      />
    </div>
  )
}

export default DashboardContainer;