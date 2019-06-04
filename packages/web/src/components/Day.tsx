import React, { memo } from "react"
import styled from "styled-components"
import { Dayjs } from "dayjs"
import { Droppable, Draggable } from "react-beautiful-dnd"

import Task from "./Task"

import { calculateTotalTime, today } from "../lib/helpers"
import { TaskFragment } from "../lib/graphql/types"
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
  handleTaskModal: any
}
function Day({
  weekend,
  day,
  month,
  tasks,
  handleTaskModal,
  ...props
}: DayProps) {
  // const { updateTasks } = useContext(AppContext);

  return (
    <Droppable droppableId={day.toString()}>
      {provided => (
        <div ref={provided.innerRef} {...provided.droppableProps}>
          <StyledDay weekend={weekend} today={today(day)} {...props}>
            {tasks &&
              tasks
                .sort((a, b) => {
                  return a.order - b.order
                })
                .map((task, index) => (
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
            {/* {calculateTotalTime(tasks)} */}

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

const StyledDay = styled.div<{ weekend: boolean; today: boolean }>`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 88px;
  background-color: ${props => (props.weekend ? "rgba(0,0,0,0.03)" : "")};
  height: 880px;
  font-size: 12px;
  padding-top: 8px;
  background-color: ${props => (props.today ? "rgb(225, 233, 244, 0.8)" : "")};
`

const PlaceholderTask = styled.div`
  min-width: calc(100% - 8px);
  height: 56px;
  border-radius: 8px;
`

const AddNewTask = styled.div`
  cursor: pointer;
  height: -webkit-fill-available;
  border-radius: 5px;
  margin: 4px;

  &:hover ${PlaceholderTask} {
    background-color: rgb(225, 233, 244, 0.5);
  }
`
