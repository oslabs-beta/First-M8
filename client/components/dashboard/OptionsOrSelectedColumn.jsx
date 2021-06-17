import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import OperatorOrMetric from './OperatorOrMetric';

const OptionsOrSelectedColumn = ({ columnName, columnTitle, listOfOperatorsOrMetrics }) => {
  return (
    <div className="chart-setup-individual-column">
      <div className="column-title">{columnTitle}</div>
      <Droppable droppableId={columnName}>
      {(provided) => (
        <div {...provided.droppableProps} ref={provided.innerRef} id="droppable-area">
          {listOfOperatorsOrMetrics.map((operatorOrMetric, index) => (
            <OperatorOrMetric text={operatorOrMetric} key={`operatorOrMetric${index}`} index={index} />
          ))}
          {provided.placeholder}
        </div>
      )}
      </Droppable>
    </div>

  );
};

export default OptionsOrSelectedColumn;
