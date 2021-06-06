import React from "react";
import { DragDropContext } from "react-beautiful-dnd";
import OptionsOrSelectedColumn from "./OptionsOrSelectedColumn";
import TimeSeriesChart from "./TimeSeriesChart";
import history from "./dashboardHistory";
import QueryAlgorithms from './QueryAlgorithms';

const ChartSetup = ({
  allCharts,
  setAllCharts,
  columns,
  setColumns,
  chartName,
  setChartName,
  chart,
  setChart
}) => {

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
  }
  
  const saveChartSetup = async () => {
    console.log(columns);
    console.log(chartName);
    // placeholder for logic to send current state of columns to DB
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
    // placeholder for logic to update all charts in DB
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
  }
  
  return (
      <div className="chart-setup">
        Chart Name: <input type="text" value={chartName} onChange={changeChartName}></input>
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