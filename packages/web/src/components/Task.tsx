import React, { memo } from "react"
import styled from "styled-components"
import { TaskFragment } from "../lib/graphql/types"

interface TaskProps {
  task: TaskFragment
  isDragging: boolean
}
function Task({ task, ...rest }: TaskProps) {
  return (
    <StyledTaskBox
      {...rest}
      completed={task.completed}
      color={task.element.color}
      id={task.id}
      className="task"
    >
      <StyledTaskName completed={task.completed}>{task.name}</StyledTaskName>
      {/* <StyledTaskElement completed={task.completed}>
        {task.element.name}
      </StyledTaskElement> */}
      <StyledTaskStart completed={task.completed}>{task.order}</StyledTaskStart>
      <StyledTaskDuration completed={task.completed}>
        {task.estimatedTime}
      </StyledTaskDuration>
    </StyledTaskBox>
  )
}

export default memo(Task)

const StyledTaskElement = styled.p<{ completed: boolean }>`
  color: ${props => (props.completed ? "lightgrey" : "white")};
  font-size: 7px;
  margin: 0;
  line-height: 10px;
  margin-top: 2px;
  text-decoration: ${props => (props.completed ? "line-through" : "none")};
  display: none;
`

const StyledTaskBox = styled.div<{ completed: boolean; color: string }>`
  position: relative;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  max-width: calc(100% - 8px);
  min-height: 56px;
  background-color: ${props => (props.completed ? "white" : props.color)};
  margin: 4px;
  border-radius: 8px;
  border: ${props => (props.completed ? "1px solid" + props.color : "none")};
  padding: 6px;
  /* box-shadow: ${props => props.theme.boxShadow}; */

  &:hover ${StyledTaskElement} {
    display: block;
  }
`

const StyledTaskName = styled.p<{ completed: boolean }>`
  color: ${props => (props.completed ? "grey" : "white")};
  font-size: 11px;
  margin: 0;
  line-height: 12px;
  text-decoration: ${props => (props.completed ? "line-through" : "none")};
  overflow: hidden;
  max-height: 24px;
`

const StyledTaskStart = styled.p<{ completed: boolean }>`
  color: ${props => (props.completed ? "grey" : "white")};
  position: absolute;
  font-size: 6px;
  bottom: 16px;
  right: 8px;
  margin: 0;
  text-decoration: ${props => (props.completed ? "line-through" : "none")};
`

const StyledTaskDuration = styled.p<{ completed: boolean }>`
  color: ${props => (props.completed ? "grey" : "white")};
  position: absolute;
  font-size: 11px;
  bottom: 2px;
  right: 8px;
  margin: 0;
  text-decoration: ${props => (props.completed ? "line-through" : "none")};
`
