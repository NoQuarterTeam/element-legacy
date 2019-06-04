import React, { FC } from "react"

import {
  useCreateTaskMutation,
  CreateTaskInput,
  Task,
  useUpdateTaskMutation,
  UpdateTaskInput,
} from "../lib/graphql/types"

import Modal from "./Modal"
import TaskForm from "./TaskForm"

interface TaskModalProps {
  task: Task
  closeModal: () => void
}
const TaskModal: FC<TaskModalProps> = ({ closeModal, task }) => {
  const createTask = useCreateTaskMutation()
  const updateTask = useUpdateTaskMutation()

  const handleCreateTask = async (taskData: CreateTaskInput) => {
    await createTask({
      variables: {
        data: taskData,
      },
    })
    closeModal()
  }

  const handleUpdateTask = async (data: UpdateTaskInput) => {
    await updateTask({
      variables: {
        taskId: task.id,
        data,
      },
    })
    closeModal()
  }

  return (
    <Modal onClose={closeModal}>
      <TaskForm
        onFormSubmit={task ? handleUpdateTask : handleCreateTask}
        task={task}
      />
    </Modal>
  )
}

export default TaskModal
