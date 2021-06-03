import React, { useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import OptionsOrSelectedColumn from "./OptionsOrSelectedColumn";
import TimeSeriesChart from "./TimeSeriesChart";
import history from "./dashboardHistory";




const ChartSetup = ({
  allCharts,
  setAllCharts
}) => {
  // placeholder for logic to get all metric options from Prometheus
  const initialColumns = {
    aggregationOptions: {
      name: "aggregationOptions",
      title: "Aggregation Options",
      list: ["sum", "average", "multiply", "divide", "minimum", "maximum"] // placeholder for prometheus data
    },
    aggregationSelected: {
      name: "aggregationSelected",
      title: "Aggregation Selected",
      list: []
    },
    metricsOptions: {
      name: "metricsOptions",
      title: "Metrics Options",
      list: ["database", "server"] // placeholder for prometheus data
    },
    metricsSelected: {
      name: "metricsSelected",
      title: "Metrics Selected",
      list: []
    }
  };

  const [columns, setColumns] = useState(() => initialColumns);
  const [chartName, setChartName] = useState(() => "");
  const [chart, setChart] = useState(() => []);

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
      .catch(error => console.log(error, "adding new chart failed"))
    // placeholder for logic to construct PromQL queries
    const newChart = [<TimeSeriesChart />]
    setChart(newChart);
    const updatedAllCharts = allCharts.slice();
    updatedAllCharts.push(newChart);
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
      <div className="dashboard-setup">
        Chart Name: <input type="text" onChange={changeChartName}></input>
        <DragDropContext onDragEnd={onDragEnd}>
            {Object.values(columns).map((column, index) => (
              <OptionsOrSelectedColumn
                key={`column${index}`}
                columnName={column.name}
                columnTitle={column.title}
                listOfOperatorsOrMetrics={column.list} 
              />
            ))}
        </DragDropContext>
        <button id="save-chart-setup" onClick={saveChartSetup}>Save</button> <button id="close-chart-setup" onClick={() => history.push("/")}>Close</button>
        {chart}
      </div>
  )
}

export default ChartSetup;