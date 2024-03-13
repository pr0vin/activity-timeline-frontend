import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const initialFiscalYears = [
  { id: "1", year: "2022" },
  { id: "2", year: "2023" },
  { id: "3", year: "2024" },
  { id: "4", year: "2025" },
];

const FiscalYearList = () => {
  const [fiscalYears, setFiscalYears] = useState(initialFiscalYears);

  const handleDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    const reorderedFiscalYears = Array.from(fiscalYears);
    const [removed] = reorderedFiscalYears.splice(result.source.index, 1);
    reorderedFiscalYears.splice(result.destination.index, 0, removed);

    setFiscalYears(reorderedFiscalYears);
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="fiscal-years">
        {(provided) => (
          <ul {...provided.droppableProps} ref={provided.innerRef}>
            {fiscalYears.map((fiscalYear, index) => (
              <Draggable
                key={fiscalYear.id}
                draggableId={fiscalYear.id}
                index={index}
              >
                {(provided) => (
                  <li
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    {fiscalYear.year}
                  </li>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </ul>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default FiscalYearList;
