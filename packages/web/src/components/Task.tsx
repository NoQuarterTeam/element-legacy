import React, { memo } from "react"
import styled from "styled-components"
import {
  TaskFragment,
  AllProgressDocument,
  AllTasksDocument,
  AllTasksQuery,
} from "../lib/graphql/types"
import { hoursInMins, formatTime } from "../lib/helpers"
import {
  useCreateTask,
  useDeleteTask,
  useUpdateTask,
} from "../lib/graphql/task/hooks"
import { darken } from "polished"
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

const StyledTaskElement = styled.p<{ completed: boolean; color: string }>`
  color: "white";
  position: absolute;
  font-size: ${p => p.theme.textXS};
  top: ${p => p.theme.paddingS};
  right: ${p => p.theme.paddingS};
  margin: 0;
  padding: ${p => p.theme.paddingXS};
  background-color: ${props => props.color};
  opacity: ${props => (props.completed ? 0.5 : 1)};
  height: 20px;
  width: 5px;
  border-radius: 5px;
  white-space: nowrap;
  overflow: hidden;
  color: ${props => props.color};
  transition: width 0.1s ease-out;
`

const StyledTaskStart = styled.p<{ completed: boolean }>`
  color: ${props => (props.completed ? "lightgrey" : "grey")};
  position: absolute;
  font-size: ${p => p.theme.textXS};
  bottom: ${p => p.theme.paddingML};
  right: ${p => p.theme.paddingML};
  margin: 0;
  text-decoration: ${props => (props.completed ? "line-through" : "none")};
`

const StyledTaskDuration = styled.p<{ completed: boolean }>`
  position: absolute;
  bottom: ${p => p.theme.paddingXS};
  right: ${p => p.theme.paddingML};
  color: ${props => (props.completed ? "lightgrey" : "grey")};
  font-size: ${p => p.theme.textXS};
  font-weight: ${p => p.theme.fontBlack};
  margin: 0;
  text-decoration: ${props => (props.completed ? "line-through" : "none")};
`

const StyledTaskBox = styled.div<{
  completed: boolean
  color: string
  hidden: boolean
}>`
  display: ${props => (props.hidden ? "none" : "flex")};
  position: relative;
  cursor: pointer;
  flex-direction: column;
  max-width: calc(100% - ${p => p.theme.paddingS});
  min-height: 60px;
  background-color: ${props => (props.completed ? "white" : "white")};
  margin: ${p => p.theme.paddingXS};
  border-radius: ${p => p.theme.borderRadius};
  /* border: ${props =>
    props.completed ? "1px solid" + props.color : "none"}; */
  padding: ${p => p.theme.paddingS};;
  box-shadow: ${props =>
    props.completed ? props.theme.boxShadow : props.theme.boxShadowBold};

  &:hover ${StyledTaskElement} {
    border-radius: ${p => p.theme.borderRadiusS};
    height: 20px;
    width: 50px;
    color: ${p => darken(0.3, p.color)};

  }
  &:hover ${StyledTaskStart} {display: none;}
  &:hover ${StyledTaskDuration} {display: none;}
`

const StyledTaskName = styled.p<{ completed: boolean }>`
  color: ${props => (props.completed ? "lightgrey" : "grey")};
  font-size: ${p => p.theme.textXS};
  font-weight: ${p => p.theme.fontBlack};
  line-height: 12px;
  text-decoration: ${props => (props.completed ? "line-through" : "none")};
  overflow: hidden;
  max-height: 24px;
`
