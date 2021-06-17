import React from 'react';
import TimeSeriesChart from './TimeSeriesChart';
import DonutChart from './DonutChart';
import SingleNumberDisplay from './SingleNumberDisplay';
import history from './dashboardHistory';

const IndividualChartContainer = ({
  format,
  id,
  setAllCharts,
  setColumns,
  chartName,
  setChartName,
  chart,
  setChart,
  setFilters,
  prometheusInstance,
  setPrometheusInstance,
}) => {
  /*
  handles click on edit button:
  retrieves chart name, data selector columns, and filters for
  particular chart from database to display on chart set up page

  chart type displayed on chart set up page depenent on
  format property passed down from main charts container
  */
  const editChart = async () => {
    await fetch(`/dashboard/editChart/${chartName}`)
      .then((response) => response.json())
      .then((response) => {
        console.log('inside fetch', response.columns);
        setColumns(response.columns);
        setChartName(response.name);
        setFilters(response.filters);
        const chartToEdit = [];
        if (format === 'time-series') {
          chartToEdit.push(
            <TimeSeriesChart
              format={format}
              type={id}
              id={chartName}
              columns={response.columns}
              filters={response.filters}
              prometheusInstance={prometheusInstance}
              setPrometheusInstance={setPrometheusInstance}
            />,
          );
        } else if (format === 'donut') {
          chartToEdit.push(
            <DonutChart
              format={format}
              type={id}
              id={chartName}
              columns={response.columns}
              filters={response.filters}
              prometheusInstance={prometheusInstance}
              setPrometheusInstance={setPrometheusInstance}
            />,
          );
        } else if (format === 'single-number') {
          chartToEdit.push(
            <SingleNumberDisplay
              format={format}
              type={id}
              id={chartName}
              columns={response.columns}
              filters={response.filters}
              prometheusInstance={prometheusInstance}
              setPrometheusInstance={setPrometheusInstance}
            />,
          );
        }
        setChart(chartToEdit);
      });
    history.push('/dashboard/edit-chart');
  };

  /*
  handles click on delete button:
  deletes all information for particular chart from database,
  updates all charts accordingly to display on main dashboard page
  */
  const deleteChart = async () => {
    await fetch(`/dashboard/deleteChart/${prometheusInstance.name}/${chartName}`, {
      method: 'DELETE',
    })
      .then((response) => response.json())
      .then((response) => {
        console.log('individual container', response);
        setAllCharts(response);
      });
  };

  /*
  displays individual chart on main dashboard page

  individual chart displayed on main dashboard page dependent
  on format property passed down from main charts container
  */
  const chartToDisplay = [];
  if (format === 'time-series') {
    chartToDisplay.push(
      <TimeSeriesChart
        format={format}
        type={id}
        id={chartName}
        columns={chart[0].props.columns}
        filters={chart[0].props.filters}
        prometheusInstance={prometheusInstance}
        setPrometheusInstance={setPrometheusInstance}
      />,
    );
  } else if (format === 'donut') {
    chartToDisplay.push(
      <DonutChart
        format={format}
        type={id}
        id={chartName}
        columns={chart[0].props.columns}
        filters={chart[0].props.filters}
        prometheusInstance={prometheusInstance}
        setPrometheusInstance={setPrometheusInstance}
      />,
    );
  } else if (format === 'single-number') {
    chartToDisplay.push(
      <SingleNumberDisplay
        format={format}
        type={id}
        id={chartName}
        columns={chart[0].props.columns}
        filters={chart[0].props.filters}
        prometheusInstance={prometheusInstance}
        setPrometheusInstance={setPrometheusInstance}
      />,
    );
  }

  return (
    <div className="individual-chart-container">
      <div>{chartName}</div>
      {chartToDisplay}
      <button type="button" id="edit-chart" onClick={editChart}>Edit</button> <button type="button" id="delete-chart" onClick={deleteChart}>Delete</button>
    </div>
  );
};

export default IndividualChartContainer;
