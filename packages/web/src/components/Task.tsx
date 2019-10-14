import React, { memo } from "react"
import styled from "styled-components"
import { TaskFragment, AllProgressDocument } from "../lib/graphql/types"
import { hoursInMins, formatTime } from "../lib/helpers"
import {
  useCreateTask,
  useDeleteTask,
  useUpdateTask,
} from "../lib/graphql/task/hooks"
import { darken, complement, readableColor, lighten } from "polished"
import { useTimelineContext } from "./providers/TimelineProvider"

interface TaskProps {
  task: TaskFragment
  isDragging: boolean
  hidden: boolean
  handleTaskModal: (task: TaskFragment) => void
}
function Task({ task, hidden, handleTaskModal, ...rest }: TaskProps) {
  const { selectedUserId } = useTimelineContext()
  const createTask = useCreateTask()
  const updateTask = useUpdateTask()
  const destroyTask = useDeleteTask(task.id, selectedUserId)

  const onTaskClick = async (event: any, task: TaskFragment) => {
    if (!event) {
      return false
    }

    if (!event.metaKey && !event.altKey && !event.shiftKey) {
      handleTaskModal(task)
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
    <StyledTaskBox
      {...rest}
      completed={task.completed}
      color={task.element.color}
      id={task.id}
      className="task"
      hidden={hidden}
      onClick={event => onTaskClick(event, task)}
    >
      <StyledTaskName completed={task.completed}>{task.name}</StyledTaskName>
      <StyledTaskElement completed={task.completed} color={task.element.color}>
        {task.element.name}
      </StyledTaskElement>
      {task.startTime && (
        <StyledTaskStart completed={task.completed}>
          @{task.startTime}
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
  border-radius: ${p => `0 ${p.theme.borderRadius} 0 ${p.theme.borderRadius}`};
`

const StyledTaskStart = styled.p<{ completed: boolean }>`
  color: ${p => (p.completed ? "lightgrey" : p.theme.colorText)};
  position: absolute;
  font-size: ${p => p.theme.textXS};
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
  font-size: ${p => p.theme.textXS};
  margin: 0;
  /* text-decoration: ${p => (p.completed ? "line-through" : "none")}; */
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
  hidden: boolean
}>`
  display: ${p => (p.hidden ? "none" : "flex")};
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

  &:hover ${StyledTaskElement} {
    height: 20px;
    width: 100%;
    text-overflow: ellipsis;
    padding: ${p => p.theme.paddingXS};
    border-radius: ${p =>
      `${p.theme.borderRadius} ${p.theme.borderRadius} 0 ${
        p.theme.borderRadius
      }`};

    color: ${p =>
      readableColor(p.color, darken(0.3, p.color), lighten(0.35, p.color))};
  }
  &:hover ${StyledTaskName} {
    display: none;
  }
`
