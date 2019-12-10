import React, { memo } from "react"
import styled from "styled-components"
import { Dayjs } from "dayjs"
import { Droppable, Draggable } from "react-beautiful-dnd"

import Task from "./Task"

import { calculateTotalTime, today } from "../lib/helpers"
import { TaskFragment } from "../lib/graphql/types"
import { darken } from "polished"
import dayjs from "dayjs"
import { useTimelineContext } from "./providers/TimelineProvider"
import { media } from "../application/theme"
import { useMe } from "./providers/MeProvider"

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
  const { selectedUserId } = useTimelineContext()
  const user = useMe()

  return (
    <StyledBorder
      monday={dayjs(day).day() === 1}
      first={dayjs(day).date() === 1}
      currentUser={
        selectedUserId && user && selectedUserId === user.id ? true : false
      }
    >
      <Droppable
        droppableId={day.toString()}
        // style={{ height: "-webkit-fill-available" }}
      >
        {(provided, snapshot) => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            <StyledDay weekend={weekend} today={today(day)} {...props}>
              {tasks
                ?.sort((a, b) => {
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
                            hidden={filteredElements?.includes(task.element.id)}
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
    </StyledBorder>
  )
}

export default memo(Day)

const StyledBorder = styled.div<{
  monday: boolean
  first: boolean
  currentUser: boolean
}>`
  display: flex;
  border-left: ${p => p.monday && "5px #efefef dotted"};
  border-left: ${p => p.first && `5px ${p.theme.colorLightBlue} dotted`};
  min-height: ${p =>
    p.currentUser ? `calc(100vh - 164px)` : `calc(100vh - 132px)`};

  ${p => media.greaterThan("md")`
    min-height: ${
      p.currentUser ? `calc(100vh - 176px)` : `calc(100vh - 145px)`
    };
  `}
`

const StyledDay = styled.div<{
  weekend: boolean
  today: boolean
}>`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 98px;
  height: 100%;
  font-size: ${p => p.theme.textS};
  background-color: ${p =>
    p.today ? p.theme.colorBlue : p.theme.colorBackground};
  // border: ${p => (p.today ? "3px solid black" : "none")};
  box-sizing: content-box;
  border-top: none;
  padding-bottom: ${p => (p.today ? "20px" : "0")};
  transition: height -0.3s linear 2s;
  
`

const PlaceholderTask = styled.div`
  min-width: calc(100% - ${p => p.theme.paddingS});
  height: 64px;
  /* border-radius: ${p => p.theme.borderRadius}; */
`

const StyledTotalTime = styled.div<{ dragging: boolean }>`
  color: ${p => p.theme.colorLabel};
  display: flex;
  justify-content: center;
  margin-top: ${p => (p.dragging ? "74px" : 0)};
`

const AddNewTask = styled.div`
  cursor: pointer;
  /* border-radius: ${p => p.theme.borderRadius}; */
  margin: ${p => p.theme.paddingS};
  flex: 1;

  &:hover ${PlaceholderTask} {
    background-color: ${p => darken(0.02, p.theme.colorLightBlue)};
  }
`
