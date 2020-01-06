import React, { memo } from "react"
import styled from "styled-components"
import { darken, readableColor, lighten } from "polished"

import { TaskFragment, AllProgressDocument } from "../lib/graphql/types"
import { hoursInMins, formatTime } from "../lib/helpers"
import {
  useCreateTask,
  useDeleteTask,
  useUpdateTask,
} from "../lib/graphql/task/hooks"
import { useTimelineContext } from "./providers/TimelineProvider"
import TaskModal from "./TaskModal"
import { useDisclosure, Box, Flex } from "@chakra-ui/core"

interface TaskProps {
  task: TaskFragment
  isDragging: boolean
}
function Task({ task, ...rest }: TaskProps) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { selectedUserId } = useTimelineContext()
  const [createTask] = useCreateTask()
  const [updateTask] = useUpdateTask()
  const [destroyTask] = useDeleteTask(task.id, selectedUserId)

  const onTaskClick = async (event: any, task: TaskFragment) => {
    if (!event) return false
    if (!event.metaKey && !event.altKey && !event.shiftKey) {
      onOpen()
    }
    if (event.metaKey) {
      // DUPLICATE
      const data = { ...task, order: task.order }

      delete data.__typename
      delete data.element
      delete data.id

      await createTask({
        refetchQueries: [{ query: AllProgressDocument }],
        variables: {
          data,
        },
      })
    } else if (event.shiftKey) {
      // DELETE
      await destroyTask({
        refetchQueries: [{ query: AllProgressDocument }],
        variables: {
          taskId: task.id,
        },
      })
    } else if (event.altKey) {
      // COMPLETE
      const data = { ...task, completed: !task.completed }
      delete data.__typename
      delete data.element
      delete data.id
      await updateTask({
        refetchQueries: [{ query: AllProgressDocument }],
        variables: {
          taskId: task.id,
          data,
        },
      })
    }
  }

  return (
    <>
      <StyledTaskBox
        {...rest}
        completed={task.completed}
        color={task.element.color}
        id={task.id}
        className="task"
        onClick={event => onTaskClick(event, task)}
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
        <Flex
          justify="space-between"
          align="center"
          bottom="0"
          direction="row-reverse"
          position="absolute"
          width="100%"
          pr={2}
        >
          <StyledTaskDuration completed={task.completed}>
            {formatTime(hoursInMins(task.estimatedTime)) &&
              formatTime(hoursInMins(task.estimatedTime))}
          </StyledTaskDuration>
          {task?.description && (
            <StyledBottomLeftTriangle color={task.element.color} />
          )}
        </Flex>
      </StyledTaskBox>
      <TaskModal isOpen={isOpen} onClose={onClose} task={task} />
    </>
  )
}

export default memo(Task)

const StyledTaskElement = styled.p<{ completed: boolean; color: string }>`
  position: absolute;
  font-size: ${p => p.theme.textXS};
  top: 0;
  right: 0;
  margin: 0;
  padding: 0;
  background-color: ${p => p.color};
  opacity: ${p => (p.completed ? 0.2 : 1)};
  height: 20px;
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
  font-size: ${p => p.theme.textXS};
  bottom: ${p => p.theme.paddingML};
  right: ${p => p.theme.paddingXS};
  margin: 0;
`

const StyledTaskDuration = styled.p<{ completed: boolean }>`
  color: ${p => (p.completed ? "lightgrey" : p.theme.colorText)};
  font-size: ${p => p.theme.textXS};
`

const StyledTaskName = styled.p<{ completed: boolean }>`
  color: ${p => (p.completed ? "lightgrey" : p.theme.colorText)};
  font-size: ${p => p.theme.textXS};
  /* text-decoration: ${p => (p.completed ? "line-through" : "none")}; */
  overflow: hidden;
  max-height: 26px;
  line-height: 13px;
  width: 92%;
`

const StyledTaskBox = styled.div<{
  completed: boolean
  color: string
}>`
  display: flex;
  position: relative;
  cursor: pointer;
  flex-direction: column;
  max-width: calc(100% - ${p => p.theme.paddingS});
  min-height: 64px;
  background-color: white;
  margin: ${p => p.theme.paddingS} ${p => p.theme.paddingS};
  padding: ${p => p.theme.paddingXS};
  box-shadow: ${p => (p.completed ? p.theme.boxShadow : p.theme.boxShadow)};
  filter: ${p => (p.completed ? "blur(0.6px)" : null)};
  opacity: ${p => (p.completed ? 0.8 : 1)};
  border-radius: ${p => p.theme.borderRadius};
  overflow: hidden;

  &:hover ${StyledTaskElement} {
    height: 20px;
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

const StyledBottomLeftTriangle = styled(Box)`
  width: 0;
  height: 0;
  left: -3px;
  bottom: -2px;
  border-right: 12px solid transparent;
  border-bottom: 12px solid ${p => p.color};
`
