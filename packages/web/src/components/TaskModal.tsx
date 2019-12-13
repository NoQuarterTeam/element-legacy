import React, { FC } from "react"
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/core"

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
import TaskForm from "./TaskForm"
import { useTimelineContext } from "./providers/TimelineProvider"
import { isMobileDevice } from "../lib/helpers"

interface TaskModalProps {
  task?: TaskFragment
  scheduledDate?: string
  isOpen: boolean
  onClose: () => void
}
const TaskModal: FC<TaskModalProps> = ({
  onClose,
  task,
  isOpen,
  scheduledDate,
}) => {
  const { selectedUserId } = useTimelineContext()
  const [createTask] = useCreateTask()
  const [updateTask] = useUpdateTask(task?.userId)
  // TODO: fix this
  const [destroyTask] = useDeleteTask(task?.id || "", selectedUserId)

  const handleCreateTask = async (taskData: TaskInput) => {
    if (!scheduledDate) return
    const data = { ...taskData, scheduledDate, order: 100 }
    await createTask({
      refetchQueries: [{ query: AllProgressDocument }],
      variables: { data },
    })
    onClose()
  }

  const handleDuplicateTask = async () => {
    if (!task) return
    const { id, element, __typename, order, ...data } = task
    await createTask({
      refetchQueries: [{ query: AllProgressDocument }],
      variables: { data: { ...data, order: order + 1 } },
    })
    onClose()
  }

  const handleUpdateTask = async (data: TaskInput) => {
    if (!task) return
    await updateTask({
      refetchQueries: [{ query: AllProgressDocument }],
      variables: { taskId: task.id, data },
    })
    onClose()
  }

  const handleDeleteTask = async () => {
    if (!task) return
    await destroyTask({ variables: { taskId: task.id } })
    onClose()
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered size={["full", "lg"]}>
      <ModalOverlay />
      <ModalContent
        m={0}
        height={["100vh", "auto"]}
        border="solid"
        borderWidth={4}
        borderColor="black"
      >
        <ModalBody p={12} m={0}>
          {isMobileDevice() && <ModalCloseButton />}
          <TaskForm
            onFormSubmit={task ? handleUpdateTask : handleCreateTask}
            onDeleteTask={handleDeleteTask}
            onDuplicateTask={handleDuplicateTask}
            task={task}
            day={scheduledDate}
          />
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

export default TaskModal
