import React, { useState } from "react";

const ChartsContainer = ({ allCharts, setAllCharts }) => {
  
  if (allCharts.length === 0) {
    // get request all charts from DB and assign result to allCharts
    // setAllCharts(allCharts)
  }
  return (
    <div className="charts-container">
      {allCharts}
    </div>
  )
}

export default ChartsContainer;