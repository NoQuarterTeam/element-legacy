import React, { FC } from "react"
import {
  useCreateTask,
  useUpdateTask,
  useDeleteTask,
} from "../lib/graphql/task/hooks"
import {
  TaskInput,
  TaskFragment,
  AllProgressDocument,
} from "../lib/graphql/types"
import Modal from "./Modal"
import TaskForm from "./TaskForm"
import { useTimelineContext } from "./providers/TimelineProvider"

interface TaskModalProps {
  task: TaskFragment
  closeModal: () => void
}
const TaskModal: FC<TaskModalProps> = ({ closeModal, task }) => {
  const { selectedUserId } = useTimelineContext()
  const createTask = useCreateTask()
  const updateTask = useUpdateTask(task.userId)
  const destroyTask = useDeleteTask(task.id, selectedUserId)

  const handleCreateTask = async (taskData: TaskInput) => {
    const data = { ...taskData, order: 100 }
    await createTask({
      refetchQueries: [{ query: AllProgressDocument }],
      variables: {
        data,
      },
    })
    closeModal()
  }

  const handleDuplicateTask = async () => {
    const data = { ...task, order: task.order + 1 }

    delete data.__typename
    delete data.element
    delete data.id

    await createTask({
      refetchQueries: [{ query: AllProgressDocument }],
      variables: {
        data,
      },
    })
    closeModal()
  }

  const handleUpdateTask = async (data: TaskInput) => {
    await updateTask({
      refetchQueries: [{ query: AllProgressDocument }],
      variables: {
        taskId: task.id,
        data,
      },
    })
    closeModal()
  }

  const handleDeleteTask = async () => {
    await destroyTask({
      variables: {
        taskId: task.id,
      },
    })
    closeModal()
  }

  return (
    <Modal onClose={closeModal}>
      <TaskForm
        onFormSubmit={task.id ? handleUpdateTask : handleCreateTask}
        onDeleteTask={handleDeleteTask}
        onDuplicateTask={handleDuplicateTask}
        task={task}
      />
    </Modal>
  )
}

export default TaskModal
