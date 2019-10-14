import React, { memo } from "react"
import styled from "styled-components"
import { Dayjs } from "dayjs"
import { Droppable, Draggable } from "react-beautiful-dnd"

import Task from "./Task"

import { calculateTotalTime, today } from "../lib/helpers"
import { TaskFragment } from "../lib/graphql/types"
import { lighten, darken } from "polished"

// import { Droppable, Draggable } from 'react-beautiful-dnd';

// import dayjs from "dayjs"
// import AdvancedFormat from 'dayjs/plugin/advancedFormat';
// dayjs.extend(AdvancedFormat);

// import { AppContext } from '../application/context';

interface DayProps {
  weekend: boolean
  day: Dayjs
  month: string
  tasks: TaskFragment[]
  filteredElements: string[]
  handleTaskModal: (task?: TaskFragment) => void
}
function Day({
  weekend,
  day,
  tasks,
  handleTaskModal,
  filteredElements,
  ...props
}: DayProps) {
  return (
    <Droppable droppableId={day.toString()}>
      {(provided, snapshot) => (
        <div ref={provided.innerRef} {...provided.droppableProps}>
          <StyledDay weekend={weekend} today={today(day)} {...props}>
            {tasks &&
              tasks
                .sort((a, b) => {
                  return a.order - b.order
                })
                .map((task: TaskFragment, index) => (
                  <Draggable key={task.id} draggableId={task.id} index={index}>
                    {(provided, snapshot) => {
                      return (
                        <div
                          ref={provided.innerRef}
                          key={index}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <Task
                            isDragging={snapshot.isDragging}
                            task={task}
                            hidden={
                              filteredElements &&
                              filteredElements.includes(task.element.id)
                            }
                            handleTaskModal={handleTaskModal}
                            // onMouseDown={() => onTaskClick(event, task)}
                          />
                        </div>
                      )
                    }}
                  </Draggable>
                ))}
            <StyledTotalTime dragging={snapshot.isDraggingOver}>
              {filteredElements &&
                calculateTotalTime(
                  tasks.filter(
                    task => !filteredElements.includes(task.element.id),
                  ),
                )}
            </StyledTotalTime>

            {provided.placeholder}

            <AddNewTask onClick={() => handleTaskModal()}>
              <PlaceholderTask />
            </AddNewTask>
          </StyledDay>
        </div>
      )}
    </Droppable>
  )
}

export default memo(Day)

const StyledDay = styled.div<{
  weekend: boolean
  today: boolean
}>`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 98px;
  height: 880px;
  font-size: ${p => p.theme.textS};
  background-color: ${p => (p.today ? p.theme.colorLightBlue : "transparent")};
`

const PlaceholderTask = styled.div`
  min-width: calc(100% - ${p => p.theme.paddingS});
  height: 64px;
  border-radius: ${p => p.theme.borderRadius};
`

const StyledTotalTime = styled.div<{ dragging: boolean }>`
  color: ${p => p.theme.colorLabel};
  display: flex;
  justify-content: center;
  margin-top: ${p => (p.dragging ? "74px" : 0)};
`

const AddNewTask = styled.div`
  cursor: pointer;
  height: -webkit-fill-available;
  border-radius: ${p => p.theme.borderRadius};
  margin: ${p => p.theme.paddingS};

  &:hover ${PlaceholderTask} {
    background-color: ${p => darken(0.02, p.theme.colorLightBlue)};
  }
`
