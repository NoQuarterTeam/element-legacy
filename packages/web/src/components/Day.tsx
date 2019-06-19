import React, { memo } from "react"
import styled from "styled-components"
import { Dayjs } from "dayjs"
import { Droppable, Draggable } from "react-beautiful-dnd"

import Task from "./Task"

import { calculateTotalTime, today } from "../lib/helpers"
import { TaskFragment } from "../lib/graphql/types"
import { darken } from "polished"
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
  handleTaskModal: (task?: TaskFragment) => void
}
function Day({ weekend, day, tasks, handleTaskModal, ...props }: DayProps) {
  // const { updateTasks } = useContext(AppContext);

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
                            onClick={() => handleTaskModal(task)}
                            // onMouseDown={() => onMouseDown(event, task)}
                          />
                        </div>
                      )
                    }}
                  </Draggable>
                ))}
            <StyledTotalTime dragging={snapshot.isDraggingOver}>
              {calculateTotalTime(tasks) && calculateTotalTime(tasks)}
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
  width: 88px;
  height: 880px;
  font-size: ${p => p.theme.textS};
  background-color: ${props =>
    props.weekend
      ? p => darken(0.02, p.theme.colorBackground)
      : p => p.theme.colorBackground};
  background-color: ${props => (props.today ? "rgb(225, 233, 244, 0.8)" : "")};
`

const PlaceholderTask = styled.div`
  min-width: calc(100% - ${p => p.theme.paddingS});
  height: 56px;
  border-radius: ${p => p.theme.borderRadius};
`

const StyledTotalTime = styled.div<{ dragging: boolean }>`
  color: ${p => p.theme.colorLabel};
  font-weight: 600;
  display: flex;
  justify-content: center;
  margin-top: ${props => (props.dragging ? "65px" : 0)};
`

const AddNewTask = styled.div`
  cursor: pointer;
  height: -webkit-fill-available;
  border-radius: ${p => p.theme.borderRadius};
  margin: ${p => p.theme.paddingS};

  &:hover ${PlaceholderTask} {
    background-color: rgb(225, 233, 244, 0.5);
  }
`
