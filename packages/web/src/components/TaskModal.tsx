import React, { FC } from "react"
import styled from "../application/theme"
import { useCreateTaskMutation, CreateTaskInput } from "../lib/graphql/types"

import Modal from "./Modal"
import TaskForm from "./TaskForm"

interface TaskModalProps {}
const TaskModal: FC<TaskModalProps> = ({}) => {
  const createTask = useCreateTaskMutation()

  const handleCreateTask = async (taskData: CreateTaskInput) => {
    await createTask({
      variables: {
        data: taskData,
      },
    })
  }

  return (
    <Modal>
      <TaskForm onFormSubmit={handleCreateTask} />
    </Modal>
  )
}

export default TaskModal
