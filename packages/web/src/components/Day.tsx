import React from "react"
import styled from "styled-components"
import { Dayjs } from "dayjs"

import Task from "./Task"

import { calculateTotalTime } from "../lib/helpers"
import { Task as TaskType } from "../lib/graphql/types"
// import { Droppable, Draggable } from 'react-beautiful-dnd';

// import dayjs from "dayjs"
// import AdvancedFormat from 'dayjs/plugin/advancedFormat';
// dayjs.extend(AdvancedFormat);

// import { AppContext } from '../application/context';

interface DayProps {
  weekend: boolean
  day: Dayjs
  month: string
  tasks: TaskType[]
}
function Day({ weekend, day, month, tasks }: DayProps) {
  // const { updateTasks } = useContext(AppContext);

  return (
    // <Droppable droppableId={day.toString()}>
    // 	{provided => (
    // <div ref={provided.innerRef}>
    <StyledDay weekend={weekend}>
      {tasks &&
        tasks
          // .sort(function(a, b) {
          //   return a.order - b.order
          // })
          .map((task, index) => (
            <Task
              key={index}
              // isDragging={snapshot.isDragging}
              id={index}
              task={task}
              // onClick={() => handleTaskModal(task)}
              // onMouseDown={() => onMouseDown(event, task)}
            />
          ))}

      {/* {tasks &&
							tasks
								.sort(function(a, b) {
									return a.order - b.order;
								})
								.map((task, index) => (
									<Draggable key={task.id} draggableId={task.id} index={index}>
										{(provided, snapshot) => {
											const onMouseDown = (() => {
												// dragHandleProps might be null
												if (!provided.dragHandleProps) {
													return onMouseDown;
												}
												// creating a new onMouseDown function that calls taskOnMouseDown as well as the drag handle one.
												return event => {
													taskOnMouseDown(event, task);
													// provided.dragHandleProps.onMouseDown(event);
												};
											})();

											return (
												<div
													ref={provided.innerRef}
													{...provided.draggableProps}
													{...provided.dragHandleProps}
													style={getItemStyle(
														snapshot.isDragging,
														provided.draggableProps.style,
													)}
												>
													<Task
														// key={index}
														isDragging={snapshot.isDragging}
														id={index}
														task={task}
														onClick={() => handleTaskModal(task)}
														onMouseDown={() => onMouseDown(event, task)}
													/>
												</div>
											);
										}}
									// {/* </Draggable> */}
      {/* ))} */}
      {/* {provided.placeholder} */}
      {calculateTotalTime(tasks)}
    </StyledDay>
    // </div>
    // )}
    // </Droppable>
  )
}

export default Day

const StyledDay = styled.div<{ weekend: boolean }>`
  position: relative;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  width: 88px;
  background-color: ${props => (props.weekend ? "rgba(0,0,0,0.03)" : "")};
  height: 880px;
  font-size: 12px;
`
