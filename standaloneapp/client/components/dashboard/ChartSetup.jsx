import React, { useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import OptionsOrSelectedColumn from "./OptionsOrSelectedColumn";
import TimeSeriesChart from "./TimeSeriesChart";
import history from "./dashboardHistory";
import QueryAlgorithms from './QueryAlgorithms';

const ChartSetup = ({
  id,
  allCharts,
  setAllCharts,
  columns,
  setColumns,
  chartName,
  setChartName,
  chart,
  setChart
}) => {
  const [alreadyExistsNotification, setNotification] = useState(() => "");
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

  const changeChartName = (event) => {
    setChartName(event.target.value);
    setNotification("");
  }
  
  const saveChartSetup = async () => {
    console.log(columns);
    console.log(chartName);
    if (id === "new-chart") {
      if (columns.metricsSelected.list.length !== 0) {
        let chartAlreadyExists;
        await fetch(`/dashboard/chart/${chartName}`)
          .then(response => response.json())
          .then(data => {
            chartAlreadyExists = data.found;
          });
        if (!chartAlreadyExists) {
          await fetch(`/dashboard/newChart/${chartName}`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({ columns: columns })
          })
            .then(response => response.json())
            .then(data => console.log(data, "adding new chart successful"))
            .catch(error => console.log(error, "adding new chart failed"));
          // placeholder for logic to construct PromQL queries
          const query = QueryAlgorithms.simpleAlgo(columns.metricsSelected.list[0])
          const newChart = [<TimeSeriesChart id={chartName} query={query}/>]
          setChart(newChart);
          const updatedAllCharts = allCharts.slice();
          updatedAllCharts.push(newChart);
          console.log(updatedAllCharts);
          setAllCharts(updatedAllCharts);
          await fetch("/dashboard/allCharts", {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({ display: updatedAllCharts })
          })
            .then(response => response.json())
            .then(data => console.log(data, "update all charts successful"))
            .catch(error => console.log(error, "updating all charts failed"))
        } else {
          setNotification("Chart already exists. Please enter another name.");
        }     
      }
    } else if (id === "edit-chart") {
      // placeholder for logic to construct PromQL queries
      const query = QueryAlgorithms.simpleAlgo(columns.metricsSelected.list[0])
      const updatedChart = [<TimeSeriesChart id={chartName} query={query}/>]
      for (let index = 0; index < allCharts.length; index++) {
        const currentChart = allCharts[index];
        if (currentChart[0].props.id === chartName) {
          allCharts.splice(index, 1, updatedChart);
          setAllCharts(allCharts);
          break;
        }
      }
      await fetch(`/dashboard/editChart/${chartName}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ columns: columns, updatedChart: updatedChart })
      })
        .then(response => response.json())
        .then(data => console.log(data, "editing chart successful"))
        .catch(error => console.log(error, "editing chart failed"))
    }  
  }
  
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
        <button id="save-chart-setup" onClick={saveChartSetup}>Save</button> <button id="close-chart-setup" onClick={() => history.push("/")}>Close</button>
        {chart}
      </div>
  )
}

export default ChartSetup;