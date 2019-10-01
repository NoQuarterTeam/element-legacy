import React, { FC } from "react"
import { TaskFragment, AllProgressDocument } from "../lib/graphql/types"
import { DragDropContext } from "react-beautiful-dnd"
import { useUpdateTaskOrder } from "../lib/graphql/task/hooks"
import { getDayTasksAndOrder, reorderTasks, move } from "../lib/helpers"
// import useAppContext from "../lib/hooks/useAppContext"

interface DDProps {
  allTasks: TaskFragment[]
}
const DragDropContainer: FC<DDProps> = ({ children, allTasks }) => {
  const updateTaskOrder = useUpdateTaskOrder()
  // const { user } = useAppContext()

  const onDragEnd = ({ source, destination }: any) => {
    if (!destination) return
    if (source.droppableId === destination.droppableId) {
      const dayTasks = getDayTasksAndOrder(allTasks, source)
      const reorderedTasks = reorderTasks(source, destination, dayTasks)

      reorderedTasks &&
        reorderedTasks.forEach(task => {
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
              updateTaskOrder: {
                __typename: "UpdateTaskOrder",
                id: task.id,
                order: task.order,
                scheduledDate: task.scheduledDate,
                ...task,
              },
            },
          })
        })
    } else {
      let sourceList = getDayTasksAndOrder(allTasks, source)
      let destinationList = getDayTasksAndOrder(allTasks, destination)

      const result = move(sourceList, destinationList, source, destination)

      result &&
        result.forEach(day =>
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
                updateTaskOrder: {
                  __typename: "UpdateTaskOrder",
                  id: task.id,
                  order: task.order,
                  scheduledDate: task.scheduledDate,
                  ...task,
                },
              },
            })
          }),
        )
    }
  }

  return <DragDropContext onDragEnd={onDragEnd}>{children}</DragDropContext>
}

export default DragDropContainer
