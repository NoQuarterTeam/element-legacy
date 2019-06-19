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

interface TaskModalProps {
  task: TaskFragment
  closeModal: () => void
}
const TaskModal: FC<TaskModalProps> = ({ closeModal, task }) => {
  const createTask = useCreateTask()
  const updateTask = useUpdateTask()
  const destroyTask = useDeleteTask(task)

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
        task={task}
      />
    </Modal>
  )
}

export default TaskModal
