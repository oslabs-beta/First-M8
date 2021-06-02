import React from "react";
import { Droppable } from "react-beautiful-dnd";
import OperatorOrMetric from "./OperatorOrMetric";

const OptionsOrSelectedColumn = ({ columnName, columnTitle, listOfOperatorsOrMetrics }) => {
  return (
    <div>
      {columnTitle}
      <Droppable droppableId={columnName}>
      {(provided) => (
        <div {...provided.droppableProps} ref={provided.innerRef}>
          {listOfOperatorsOrMetrics.map((operatorOrMetric, index) => (
            <OperatorOrMetric text={operatorOrMetric} key={`operatorOrMetric${index}`} index={index} />
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
    </div>
    
  )
}

export default OptionsOrSelectedColumn;