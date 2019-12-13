import React, { memo } from "react"

import { Text } from "@chakra-ui/core"
import { styled } from "./providers/ThemeProvider"

interface Props {
  task: {
    name: string
    completed: boolean
    element: { color: string; name: string }
    startTime: string
    estimatedTime: string
  }
  isDragging: boolean
  hidden: boolean
}

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
          fontSize="sm"
        >
          {task.element.name}
        </StyledTaskElement>
        {task.startTime && (
          <StyledTaskStart
            completed={task.completed}
            fontSize="sm"
            bottom={6}
            right={1}
          >
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

const StyledTaskElement = styled(Text)<{ completed: boolean; color: string }>`
  position: absolute;
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
  border-radius: 0 ${p => p.theme.borders["4px"]} 0 0;
`

const StyledTaskStart = styled(Text)<{ completed: boolean }>`
  color: ${p => (p.completed ? "lightgrey" : p.theme.colors.blackAlpha[700])};
  position: absolute;
  margin: 0;
`

const StyledTaskDuration = styled(Text)<{ completed: boolean }>`
  position: absolute;
  margin: 0;
  color: ${p => (p.completed ? "lightgrey" : p.theme.colors.blackAlpha[700])};
  bottom: ${p => p.theme.sizes[1]};
  right: ${p => p.theme.sizes[1]};
  font-size: ${p => p.theme.fontSizes.sm};
`

const StyledTaskName = styled(Text)<{ completed: boolean }>`
  color: ${p => (p.completed ? "lightgrey" : p.theme.colors.blackAlpha[700])};
  font-size: ${p => p.theme.fontSizes.sm};
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
  flex-direction: column;
  width: 140px;
  min-height: 80px;
  background-color: white;
  margin: ${p => p.theme.sizes[4]} ${p => p.theme.sizes[2]};
  padding: ${p => p.theme.sizes[2]};
  box-shadow: ${p => p.theme.shadows.md};
  filter: ${p => (p.completed ? "blur(0.6px)" : null)};
  opacity: ${p => (p.completed ? 0.8 : 1)};
  border-radius: ${p => p.theme.borders["4px"]};
`
