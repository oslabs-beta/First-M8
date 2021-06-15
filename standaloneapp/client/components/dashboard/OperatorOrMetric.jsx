import React from 'react';
import { Draggable } from 'react-beautiful-dnd';

const OperatorOrMetric = ({ text, index }) => (
  <Draggable draggableId={text} key={text} index={index}>
    {(provided) => (
      <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
        {text}
      </div>
    )}
  </Draggable>
);

export default OperatorOrMetric;
