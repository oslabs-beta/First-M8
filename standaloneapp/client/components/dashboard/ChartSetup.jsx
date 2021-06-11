import React, { useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import OptionsOrSelectedColumn from "./OptionsOrSelectedColumn";
import TimeSeriesChart from "./TimeSeriesChart";
import DonutChart from "./DonutChart";
import DataFilters from "./DataFilters";
import history from "./dashboardHistory";
import queryAlgorithms from './queryAlgorithms';

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
  setPrometheusInstance
}) => {

  /*
  initializes state of notification for if a chart name already exists and old chart name
  */
  const [alreadyExistsNotification, setNotification] = useState(() => "");
  const [oldChartName, setOldChartName] = useState(() => chartName);
  
  /*
  handles after an item has been dragged and dropped:
  updates data selector columns in order to display correctly reflecting where
  items have been dragged and dropped
  */
  const onDragEnd = ({ source, destination }) => {
    if (destination === undefined || destination === null) return;

    if (source.droppableId === destination.droppableId && destination.index === source.index) return;

    const start = columns[source.droppableId];
    const end = columns[destination.droppableId];

    if (start === end) {
      const updatedList = start.list.filter((item, index) => index !== source.index);
      updatedList.splice(destination.index, 0, start.list[source.index]);
      const updatedColumn = {
        ...start,
        list: updatedList
      };
      const updatedState = {
        ...columns,
        [updatedColumn.name]: updatedColumn
      }
      setColumns(updatedState);
      return;
    } else {
      const updatedStartList = start.list.filter((item, index) => index !== source.index);
      const updatedStartColumn = {
        ...start,
        list: updatedStartList
      };
      const updatedEndList = end.list;
      updatedEndList.splice(destination.index, 0, start.list[source.index]);
      const updatedEndColumn = {
        ...end,
        list: updatedEndList
      };
      const updatedState = {
        ...columns,
        [updatedStartColumn.name]: updatedStartColumn,
        [updatedEndColumn.name]: updatedEndColumn
      }
      setColumns(updatedState);
      return;
    }
  }

  /*
  handles changes to chart name input:
  updates chart name and resets notification for if a chart name already exists
  */
  const changeChartName = (event) => {
    setChartName(event.target.value);
    setNotification("");
  }

   /* 
  copy of current state of filters to alter
  */
  const updatedFilters = {...filters};
  /* 
  handles change on filter drop downs:
  updated particular property in updated filters object with
  new selection
  */
  const changeFilter = (event) => {
    updatedFilters[event.target.id] = event.target.value;
  }
  
  /*
  handles click on save chart setup button:
  if new chart, checks if chart name already exists in database and notifies if so
  and if not, adds chart name, data selector columns, and filters to database, adds new chart
  to display on chart setup page and main dashboard page
  if edit chart, update chart name, data selector columns, and filters in database, updates chart
  to display on chart setup page and main dashboard page
  */
  const saveChartSetup = async () => {

    if (id === "new-chart") {
      if (columns.metricsSelected.list.length !== 0) {
        let chartAlreadyExists;
        await fetch(`/dashboard/chart/${chartName}`)
          .then(response => response.json())
          .then(response => {
            chartAlreadyExists = response.found;
          });

        if (!chartAlreadyExists) {
          await fetch(`/dashboard/newChart/${chartName}`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({ columns: columns, filters: updatedFilters })
          })
            .then(response => response.json())
            .then(response => console.log(response, "adding new chart successful"))
            .catch(error => console.log(error, "adding new chart failed"));
          
          let newChart;
          if (columns.timeRangeSelected.list.length !== 0) {
            newChart = [
              <TimeSeriesChart
                type={id}
                id={chartName}
                columns={columns}
                prometheusInstance={prometheusInstance}
                setPrometheusInstance={setPrometheusInstance}
              />
            ];
          } else if (columns.aggregationSelected.list[0] === "Divide") {
            newChart = [
              <DonutChart 
                type={id}
                id={chartName}
                columns={columns}
                prometheusInstance={prometheusInstance}
                setPrometheusInstance={setPrometheusInstance}
              />
            ]
          }
          const updatedAllCharts = allCharts.slice();
          updatedAllCharts.push(newChart);
          
          setChart(newChart);
          setAllCharts(updatedAllCharts);

          await fetch(`/dashboard/allCharts/${prometheusInstance.name}`, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({ display: updatedAllCharts })
          })
            .then(response => response.json())
            .then(response => console.log(response, "update all charts successful"))
            .catch(error => console.log(error, "updating all charts failed"))
        } else {
          setNotification("Chart already exists. Please enter another name.");
        }     
      }
    } else if (id === "edit-chart") {
      // placeholder for logic to construct PromQL queries
      // const query = queryAlgorithms.simpleAlgo(columns.metricsSelected.list[0])
      // console.log("before set", chart);
      const updatedChart = <TimeSeriesChart
          type={id}
          id={chartName}
          columns={columns}
          prometheusInstance={prometheusInstance}
          setPrometheusInstance={setPrometheusInstance}
        />;
      
      setChart(updatedChart);

      for (let index = 0; index < allCharts.length; index++) {
        const currentChart = allCharts[index];
        if (currentChart[0].props.id === oldChartName) {
          allCharts.splice(index, 1, [updatedChart]);
          setAllCharts(allCharts);
          break;
        }
      }

      await fetch(`/dashboard/editChart/${oldChartName}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: chartName,
          columns: columns,
          updatedChart: [updatedChart],
          filters: updatedFilters,
          instance: prometheusInstance.name
         })
      })
        .then(response => response.json())
        .then(response => console.log(response, "editing chart successful"))
        .catch(error => console.log(error, "editing chart failed"))
    }  
  }
  
  console.log("chart setup", chart);

  return (
      <div className="chart-setup">
        <label>Chart Name: </label> <input type="text" value={chartName} onChange={changeChartName}></input>
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
        <button id="save-chart-setup" onClick={saveChartSetup}>Save</button> <button id="close-chart-setup" onClick={() => history.push("/")}>Close</button>
        {chart}
      </div>
  )

}

export default ChartSetup;