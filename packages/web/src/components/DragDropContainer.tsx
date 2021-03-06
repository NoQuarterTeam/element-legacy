import React, { FC } from "react"
import { TaskFragment, AllProgressDocument } from "../lib/graphql/types"
import { DragDropContext } from "react-beautiful-dnd"
import { useUpdateTaskOrder } from "../lib/graphql/task/hooks"
import { getDayTasksAndOrder, reorderTasks, move } from "../lib/helpers"

interface DDProps {
  tasks: TaskFragment[]
}

export const DragDropContainer: FC<DDProps> = ({ children, tasks }) => {
  const [updateTaskOrder] = useUpdateTaskOrder()

  const onDragEnd = ({ source, destination }: any) => {
    if (!destination) return
    if (source.droppableId === destination.droppableId) {
      const dayTasks = getDayTasksAndOrder(tasks, source)
      const reorderedTasks = reorderTasks(source, destination, dayTasks)
      reorderedTasks?.forEach(task => {
        updateTaskOrder({
          variables: {
            taskId: task.id,
            data: {
              userId: task.userId,
              order: task.order,
              scheduledDate: task.scheduledDate,
            },
          },
          optimisticResponse: {
            __typename: "Mutation",
            updateTaskOrder: task,
          },
        })
      })
    } else {
      const sourceList = getDayTasksAndOrder(tasks, source)
      const destinationList = getDayTasksAndOrder(tasks, destination)

      const result = move(sourceList, destinationList, source, destination)

      result?.forEach(day =>
        day.forEach(task => {
          updateTaskOrder({
            refetchQueries: [{ query: AllProgressDocument }],
            variables: {
              taskId: task.id,
              data: {
                order: task.order,
                scheduledDate: task.scheduledDate,
                userId: task.userId,
              },
            },
            optimisticResponse: {
              __typename: "Mutation",
              updateTaskOrder: task,
            },
          })
        }),
      )
    }
  }

  return <DragDropContext onDragEnd={onDragEnd}>{children}</DragDropContext>
}
