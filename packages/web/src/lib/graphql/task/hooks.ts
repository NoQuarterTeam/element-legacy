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
        try {
          const tasksQuery = cache.readQuery<AllTasksQuery>({
            query: AllTasksDocument,
            variables: { selectedUserId: data.createTask.userId },
          })

          if (tasksQuery && tasksQuery.allTasks) {
            const { allTasks } = tasksQuery
            cache.writeQuery({
              query: AllTasksDocument,
              variables: { selectedUserId: data.createTask.userId },
              data: {
                allTasks: [...allTasks, data.createTask],
              },
            })
          }
        } catch (e) {}
      }
    },
  })
}

export function useAllTasks(
  selectedUserId: string,
  daysBack: number,
  daysForward: number,
) {
  const { data, fetchMore } = useAllTasksQuery({
    variables: {
      selectedUserId,
      daysBack,
      daysForward,
    },
  })
  const allTasks = data?.allTasks || []
  return { allTasks, fetchMore }
}

export function useUpdateTask(oldUserId?: string) {
  return useUpdateTaskMutation({
    update: (cache, { data }) => {
      if (data && data.updateTask) {
        try {
          const newUserId = data.updateTask.userId

          if (newUserId && oldUserId && newUserId !== oldUserId) {
            try {
              const tasksQuery = cache.readQuery<AllTasksQuery>({
                query: AllTasksDocument,
                variables: { selectedUserId: newUserId },
              })
              if (tasksQuery && tasksQuery.allTasks) {
                const { allTasks } = tasksQuery
                // ADD to new user
                cache.writeQuery({
                  query: AllTasksDocument,
                  variables: { selectedUserId: newUserId },
                  data: {
                    allTasks: [...allTasks, data.updateTask],
                  },
                })
              }
              const tasksQueryOld = cache.readQuery<AllTasksQuery>({
                query: AllTasksDocument,
                variables: { selectedUserId: oldUserId },
              })
              if (tasksQueryOld && tasksQueryOld.allTasks) {
                const updatedTasks = tasksQueryOld.allTasks.filter(
                  t => data.updateTask && t.id !== data.updateTask.id,
                )
                // Delete from old user
                cache.writeQuery({
                  query: AllTasksDocument,
                  variables: { selectedUserId: oldUserId },
                  data: {
                    ...tasksQueryOld,
                    allTasks: updatedTasks,
                  },
                })
              }
            } catch {
              const tasksQueryOld = cache.readQuery<AllTasksQuery>({
                query: AllTasksDocument,
                variables: { selectedUserId: oldUserId },
              })
              if (tasksQueryOld && tasksQueryOld.allTasks) {
                const updatedTasks = tasksQueryOld.allTasks.filter(
                  t => data.updateTask && t.id !== data.updateTask.id,
                )
                // Delete from old user
                cache.writeQuery({
                  query: AllTasksDocument,
                  variables: { selectedUserId: oldUserId },
                  data: {
                    ...tasksQueryOld,
                    allTasks: updatedTasks,
                  },
                })
              }
            }
          }
        } catch (e) {}
      }
    },
  })
}

export function useUpdateTaskOrder() {
  return useUpdateTaskOrderMutation()
}

export function useDeleteTask(taskId: string, selectedUserId: string) {
  return useDeleteTaskMutation({
    update: (cache, { data }) => {
      const tasksData = cache.readQuery<AllTasksQuery, AllTasksQueryVariables>({
        query: AllTasksDocument,
        variables: { selectedUserId },
      })
      if (data && tasksData?.allTasks) {
        const tasks = tasksData.allTasks.filter(
          (task: TaskFragment) => task.id !== taskId,
        )
        cache.writeQuery({
          query: AllTasksDocument,
          variables: { selectedUserId },
          data: {
            ...tasksData,
            allTasks: tasks,
          },
        })
      }
    },
  })
}
