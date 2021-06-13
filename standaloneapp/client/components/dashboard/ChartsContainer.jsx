import React from 'react';
import IndividualChartContainer from './IndividualChartContainer';

const ChartsContainer = ({
  id,
  allCharts,
  setAllCharts,
  setColumns,
  setChartName,
  setChart,
  setFilters,
  prometheusInstance,
  setPrometheusInstance,
}) => {
  const chartsToDisplay = [];
  allCharts.forEach((individualChart) => {
    if (individualChart !== null) {
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
        />,
      );
    }
  });

  return (
    <div className="charts-container">
      {chartsToDisplay}
    </div>
  );
};

export default ChartsContainer;
