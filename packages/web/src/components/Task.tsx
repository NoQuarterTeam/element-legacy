import React, { memo } from "react"
import styled from "styled-components"
import { TaskFragment } from "../lib/graphql/types"
import { hoursInMins, formatTime } from "../lib/helpers"

interface TaskProps {
  task: TaskFragment
  isDragging: boolean
  onClick: (event: any) => void
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
      <StyledTaskElement completed={task.completed}>
        {task.element.name}
      </StyledTaskElement>
      {task.startTime && (
        <StyledTaskStart completed={task.completed}>
          @ {task.startTime}
        </StyledTaskStart>
      )}
      <StyledTaskDuration completed={task.completed}>
        {formatTime(hoursInMins(task.estimatedTime)) &&
          formatTime(hoursInMins(task.estimatedTime))}
      </StyledTaskDuration>
    </StyledTaskBox>
  )
}

export default memo(Task)

const StyledTaskElement = styled.p<{ completed: boolean }>`
  color: ${props => (props.completed ? "grey" : "white")};
  position: absolute;
  font-size: ${p => p.theme.textXS};
  bottom: ${p => p.theme.paddingXS};
  right: ${p => p.theme.paddingS};
  margin: 0;
  text-decoration: ${props => (props.completed ? "line-through" : "none")};
  display: none;
`

const StyledTaskStart = styled.p<{ completed: boolean }>`
  color: ${props => (props.completed ? "grey" : "white")};
  position: absolute;
  font-size: ${p => p.theme.textXS};
  bottom: ${p => p.theme.paddingML};
  right: ${p => p.theme.paddingS};
  margin: 0;
  text-decoration: ${props => (props.completed ? "line-through" : "none")};
`

const StyledTaskDuration = styled.p<{ completed: boolean }>`
  position: absolute;
  bottom: ${p => p.theme.paddingXS};
  right: ${p => p.theme.paddingS};
  color: ${props => (props.completed ? "grey" : "white")};
  font-size: ${p => p.theme.textXS};
  font-weight: ${p => p.theme.fontBlack};
  margin: 0;
  text-decoration: ${props => (props.completed ? "line-through" : "none")};
`

const StyledTaskBox = styled.div<{ completed: boolean; color: string }>`
  position: relative;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  max-width: calc(100% - ${p => p.theme.paddingS});
  min-height: 60px;
  background-color: ${props => (props.completed ? "white" : props.color)};
  margin: ${p => p.theme.paddingXS};
  border-radius: ${p => p.theme.borderRadius};
  border: ${props => (props.completed ? "1px solid" + props.color : "none")};
  padding: ${p => p.theme.paddingS};;
  /* box-shadow: ${props => props.theme.boxShadow}; */

  &:hover ${StyledTaskElement} {display: block;}
  &:hover ${StyledTaskStart} {display: none;}
  &:hover ${StyledTaskDuration} {display: none;}
`

const StyledTaskName = styled.p<{ completed: boolean }>`
  color: ${props => (props.completed ? "grey" : "white")};
  font-size: ${p => p.theme.textXS};
  font-weight: ${p => p.theme.fontBlack};
  line-height: 12px;
  text-decoration: ${props => (props.completed ? "line-through" : "none")};
  overflow: hidden;
  max-height: 24px;
`
