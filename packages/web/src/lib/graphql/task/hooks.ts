import {
  useCreateTaskMutation,
  useAllTasksQuery,
  useUpdateTaskMutation,
  useUpdateTaskOrderMutation,
  useDeleteTaskMutation,
  AllTasksQuery,
  AllTasksQueryVariables,
  AllTasksDocument,
  TaskFragment,
} from "../types"

export function useCreateTask() {
  return useCreateTaskMutation({
    update: (cache, { data }) => {
      if (data && data.createTask) {
        const tasksQuery = cache.readQuery<AllTasksQuery>({
          query: AllTasksDocument,
        })
        if (tasksQuery && tasksQuery.allTasks) {
          const { allTasks } = tasksQuery
          cache.writeQuery({
            query: AllTasksDocument,
            data: {
              allTasks: [...allTasks, data.createTask],
            },
          })
        }
      }
    },
  })
}

export function useAllTasks() {
  const { data } = useAllTasksQuery()
  const allTasks = data && data.allTasks
  return allTasks
}

export function useUpdateTask() {
  return useUpdateTaskMutation()
}

export function useUpdateTaskOrder() {
  return useUpdateTaskOrderMutation()
}

export function useDeleteTask(task: TaskFragment) {
  return useDeleteTaskMutation({
    update: (cache, { data }) => {
      const tasksData = cache.readQuery<AllTasksQuery, AllTasksQueryVariables>({
        query: AllTasksDocument,
      })
      if (data && tasksData && tasksData.allTasks) {
        const tasks = tasksData.allTasks.filter(t => t.id !== task.id)
        cache.writeQuery({
          query: AllTasksDocument,
          data: {
            ...tasksData,
            allTasks: tasks,
          },
        })
      }
    },
  })
}
