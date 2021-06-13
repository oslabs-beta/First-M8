import React, { useState } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import OptionsOrSelectedColumn from './OptionsOrSelectedColumn';
import TimeSeriesChart from './TimeSeriesChart';
import DonutChart from './DonutChart';
import DataFilters from './DataFilters';
import history from './dashboardHistory';

const ChartSetup = ({
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
  setPrometheusInstance,
}) => {
  /*
  initializes state of notification for if a chart name already exists and old chart name
  */
  const [alreadyExistsNotification, setNotification] = useState(() => '');
  // eslint-disable-next-line no-unused-vars
  const [oldChartName, setOldChartName] = useState(() => chartName);

  /*
  handles after an item has been dragged and dropped:
  updates data selector columns in order to display correctly reflecting where
  items have been dragged and dropped
  */
  const onDragEnd = ({ source, destination }) => {
    setNotification('');
    if (destination === undefined || destination === null) return;

    if (source.droppableId === destination.droppableId && destination.index === source.index) {
      return;
    }
    const start = columns[source.droppableId];
    const end = columns[destination.droppableId];

    if (start === end) {
      const updatedList = start.list.filter((item, index) => index !== source.index);
      updatedList.splice(destination.index, 0, start.list[source.index]);
      const updatedColumn = {
        ...start,
        list: updatedList,
      };
      const updatedState = {
        ...columns,
        [updatedColumn.name]: updatedColumn,
      };
      setColumns(updatedState);
    } else {
      const updatedStartList = start.list.filter((item, index) => index !== source.index);
      const updatedStartColumn = {
        ...start,
        list: updatedStartList,
      };
      const updatedEndList = end.list;
      updatedEndList.splice(destination.index, 0, start.list[source.index]);
      const updatedEndColumn = {
        ...end,
        list: updatedEndList,
      };
      const updatedState = {
        ...columns,
        [updatedStartColumn.name]: updatedStartColumn,
        [updatedEndColumn.name]: updatedEndColumn,
      };
      setColumns(updatedState);
    }
  };

  /*
  handles changes to chart name input:
  updates chart name and resets notification for if a chart name already exists
  */
  const changeChartName = (event) => {
    setChartName(event.target.value);
    setNotification('');
  };

  /*
  copy of current state of filters to alter
  */
  const updatedFilters = { ...filters };
  /*
  handles change on filter drop downs:
  updated particular property in updated filters object with
  new selection
  */
  const changeFilter = (event) => {
    updatedFilters[event.target.id] = event.target.value;
    setFilters(updatedFilters);
  };

  /*
  handles click on save chart setup button:
  if new chart, checks if chart name already exists in database and notifies if so
  and if not, adds chart name, data selector columns, and filters to database, adds new chart
  to display on chart setup page and main dashboard page
  if edit chart, update chart name, data selector columns, and filters in database, updates chart
  to display on chart setup page and main dashboard page
  */
  const saveChartSetup = async () => {
    if (id === 'new-chart') {
      if (columns.metricsSelected.list.length !== 0 && chartName !== '') {
        let chartAlreadyExists;
        await fetch(`/dashboard/chart/${chartName}`)
          .then((response) => response.json())
          .then((response) => {
            chartAlreadyExists = response.found;
          });

        if (!chartAlreadyExists) {
          let newChart;
          const aggregation = columns.aggregationSelected.list;
          const metric = columns.metricsSelected.list;
          const time = columns.timeRangeSelected.list;
          if (
            time.length !== 0
            && !aggregation.includes('Divide')
            && !aggregation.includes('Multiply')
          ) {
            newChart = [
              <TimeSeriesChart
                format="time-series"
                type={id}
                id={chartName}
                columns={columns}
                filters={filters}
                prometheusInstance={prometheusInstance}
                setPrometheusInstance={setPrometheusInstance}
              />,
            ];
          } else if (
            time.length === 0
            && aggregation.length === 1
            && aggregation[0] === 'Divide'
            && metric.length === 2
          ) {
            newChart = [
              <DonutChart
                format="donut"
                type={id}
                id={chartName}
                columns={columns}
                filters={filters}
                prometheusInstance={prometheusInstance}
                setPrometheusInstance={setPrometheusInstance}
              />,
            ];
          } else if (
            time.length === 0
            && aggregation.length >= 0
            && metric.length === 1
          ) {
            newChart = [
              <div>
                Single-number panels are in development.
                We appreciate your patience in the meantime.
              </div>,
            ];
          } else {
            newChart = [
              <div>
                Data visualization and PromQL translation not yet available.
                Please try something else.
              </div>,
            ];
          }

          setChart(newChart);

          if (newChart[0].type !== 'div') {
            const updatedAllCharts = allCharts.slice();
            updatedAllCharts.push(newChart);

            setAllCharts(updatedAllCharts);

            await fetch(`/dashboard/newChart/${chartName}`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ columns, filters: updatedFilters }),
            })
              .then((response) => response.json())
              .then((response) => console.log(response, 'adding new chart successful'))
              .catch((error) => console.log(error, 'adding new chart failed'));

            await fetch(`/dashboard/allCharts/${prometheusInstance.name}`, {
              method: 'PATCH',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ display: updatedAllCharts }),
            })
              .then((response) => response.json())
              .then((response) => console.log(response, 'update all charts successful'))
              .catch((error) => console.log(error, 'updating all charts failed'));
          }
        } else {
          setNotification('Chart already exists. Please enter another name.');
        }
      } else if (columns.metricsSelected.list.length === 0 && chartName === '') {
        setNotification('Please enter a chart name and select a metric.');
      } else if (columns.metricsSelected.list.length === 0) {
        setNotification('Please select a metric.');
      } else if (chartName === '') {
        setNotification('Please enter a chart name.');
      }
    } else if (id === 'edit-chart') {
      const updatedChart = <TimeSeriesChart
        format="time-series"
        type={id}
        id={chartName}
        columns={columns}
        filters={filters}
        prometheusInstance={prometheusInstance}
        setPrometheusInstance={setPrometheusInstance}
      />;

      setChart(updatedChart);

      for (let index = 0; index < allCharts.length; index += 1) {
        const currentChart = allCharts[index];
        if (currentChart[0].props.id === oldChartName) {
          allCharts.splice(index, 1, [updatedChart]);
          setAllCharts(allCharts);
          break;
        }
      }

      await fetch(`/dashboard/editChart/${oldChartName}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: chartName,
          columns,
          updatedChart: [updatedChart],
          filters: updatedFilters,
          instance: prometheusInstance.name,
        }),
      })
        .then((response) => response.json())
        .then((response) => console.log(response, 'editing chart successful'))
        .catch((error) => console.log(error, 'editing chart failed'));
    }
  };

  return (
    <div className="chart-setup">
      <label>Chart Name: </label> <input type="text" value={chartName} onChange={changeChartName} />
      <div>{alreadyExistsNotification}</div>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="chart-setup-columns">
          {Object.values(columns).map((column, index) => (
            <OptionsOrSelectedColumn
              key={`column${index}`}
              columnName={column.name}
              columnTitle={column.title}
              listOfOperatorsOrMetrics={column.list}
            />
          ))}
        </div>
      </DragDropContext>
      <DataFilters
        filters={filters}
        setFilters={setFilters}
        onChange={changeFilter}
        prometheusInstance={prometheusInstance}
        setPrometheusInstance={setPrometheusInstance}
      />
      <button type="button" id="save-chart-setup" onClick={saveChartSetup}>Save</button> <button type="button" id="close-chart-setup" onClick={() => history.push('/')}>Close</button>
      {chart}
    </div>
  );
};

export default ChartSetup;
