import React from "react";

const ChartsContainer = ({ allCharts }) => {
  // placeholder for logic to get all charts from DB to display
  // const chartsToDisplay = [];
  // await fetch("/dashboard")
  //   .then(response => response.json())
  //   .then(data => {
  //     data[0].display.forEach(chart => chartsToDisplay.push(chart));
  //   })

  return (
    <div className="charts-container">
      {/* {chartsToDisplay} */}
      {allCharts}
    </div>
  )
}

export default ChartsContainer;