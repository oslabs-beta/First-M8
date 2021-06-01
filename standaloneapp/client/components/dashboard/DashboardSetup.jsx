import React, { useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import OptionsOrSelectedColumn from "./OptionsOrSelectedColumn";

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


const DashboardSetup = () => {
  const [columns, setColumns] = useState(initialColumns);

  console.log(columns);

  const onDragEnd = ({ source, destination }) => {
    if (destination === undefined || destination === null) return;

    if (source.droppableId === destination.droppableId && destination.index === source.index) return;

    const start = columns[source.droppableId];
    console.log(columns);
    console.log(source.droppableId);

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

  return (
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="dashboard-setup">
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
  )
}

export default DashboardSetup;