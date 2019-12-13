import React, { memo } from "react"
import styled from "styled-components"
import { darken, readableColor, lighten } from "polished"

interface Props {
  task: {
    name: string
    completed: boolean
    element: { color: string; name: string }
    startTime: string //TODO: DateTime?
    estimatedTime: string //TODO: DateTime?
  }
  isDragging: boolean
  hidden: boolean
}

// TODO: Make it Chakralicious
function DemoTask({ task, hidden, ...rest }: Props) {
  return (
    <>
      <StyledTaskBox
        {...rest}
        completed={task.completed}
        color={task.element.color}
        className="task"
        hidden={hidden}
      >
        <StyledTaskName completed={task.completed}>{task.name}</StyledTaskName>
        <StyledTaskElement
          completed={task.completed}
          color={task.element.color}
        >
          {task.element.name}
        </StyledTaskElement>
        {task.startTime && (
          <StyledTaskStart completed={task.completed}>
            @{task.startTime}
          </StyledTaskStart>
        )}
        <StyledTaskDuration completed={task.completed}>
          {task.estimatedTime}
        </StyledTaskDuration>
      </StyledTaskBox>
    </>
  )
}

export default memo(DemoTask)

const StyledTaskElement = styled.p<{ completed: boolean; color: string }>`
  position: absolute;
  font-size: ${p => p.theme.textS};
  top: 0;
  right: 0;
  margin: 0;
  padding: 0;
  background-color: ${p => p.color};
  opacity: ${p => (p.completed ? 0.2 : 1)};
  height: 25px;
  width: 8px;
  white-space: nowrap;
  overflow: hidden;
  color: ${p => p.color};
  transition: width 0.1s ease-out;
  text-align: center;
  border-radius: ${p => `0 ${p.theme.borderRadius} 0 0`};
`

const StyledTaskStart = styled.p<{ completed: boolean }>`
  color: ${p => (p.completed ? "lightgrey" : p.theme.colorText)};
  position: absolute;
  font-size: ${p => p.theme.textS};
  bottom: ${p => p.theme.paddingML};
  right: ${p => p.theme.paddingXS};
  margin: 0;
  /* text-decoration: ${p => (p.completed ? "line-through" : "none")}; */
`

const StyledTaskDuration = styled.p<{ completed: boolean }>`
  position: absolute;
  bottom: ${p => p.theme.paddingXS};
  right: ${p => p.theme.paddingXS};
  color: ${p => (p.completed ? "lightgrey" : p.theme.colorText)};
  font-size: ${p => p.theme.textS};
  margin: 0;
  /* text-decoration: ${p => (p.completed ? "line-through" : "none")}; */
`

const StyledTaskName = styled.p<{ completed: boolean }>`
  color: ${p => (p.completed ? "lightgrey" : p.theme.colorText)};
  font-size: ${p => p.theme.textS};
  /* text-decoration: ${p => (p.completed ? "line-through" : "none")}; */
  overflow: hidden;
  max-height: 26px;
  line-height: 13px;
  width: 92%;
`

const StyledTaskBox = styled.div<{
  completed: boolean
  color: string
  hidden: boolean
}>`
  display: ${p => (p.hidden ? "none" : "flex")};
  position: relative;
  cursor: pointer;
  flex-direction: column;
  width: 140px;
  min-height: 80px;
  background-color: white;
  margin: ${p => p.theme.paddingM} ${p => p.theme.paddingS};
  padding: ${p => p.theme.paddingS};
  box-shadow: ${p => (p.completed ? p.theme.boxShadow : p.theme.boxShadow)};
  filter: ${p => (p.completed ? "blur(0.6px)" : null)};
  opacity: ${p => (p.completed ? 0.8 : 1)};
  border-radius: ${p => p.theme.borderRadius};

  &:hover ${StyledTaskElement} {
    height: 25px;
    width: 100%;
    text-overflow: ellipsis;
    padding: ${p => p.theme.paddingXS};
    color: ${p =>
      readableColor(p.color, darken(0.3, p.color), lighten(0.35, p.color))};
    border-radius: ${p => p.theme.borderRadius} ${p => p.theme.borderRadius} 0 0;
  }
  &:hover ${StyledTaskName} {
    display: none;
  }
`
