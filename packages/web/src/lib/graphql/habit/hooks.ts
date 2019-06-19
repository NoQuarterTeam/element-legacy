import {
  useCreateHabitMutation,
  AllHabitsQuery,
  AllHabitsDocument,
  useAllHabitsQuery,
  AllHabitsQueryVariables,
  useArchiveHabitMutation,
} from "../types"

export function useCreateHabit() {
  return useCreateHabitMutation({
    update: (cache, { data }) => {
      if (data && data.createHabit) {
        const habitsQuery = cache.readQuery<AllHabitsQuery>({
          query: AllHabitsDocument,
        })
        if (habitsQuery && habitsQuery.allHabits) {
          const { allHabits } = habitsQuery
          cache.writeQuery({
            query: AllHabitsDocument,
            data: {
              allHabits: [...allHabits, data.createHabit],
            },
          })
        }
      }
    },
  })
}

// export function useUpdateHabit() {
//   return useUpdateHabitMutation({})
// }

export function useAllHabits() {
  const { data } = useAllHabitsQuery({})
  const allHabits = data && data.allHabits
  return allHabits
}

export function useArchiveHabit() {
  return useArchiveHabitMutation({
    update: (cache, { data }) => {
      const habitsData = cache.readQuery<
        AllHabitsQuery,
        AllHabitsQueryVariables
      >({
        query: AllHabitsDocument,
      })
      if (data && data.archiveHabit && habitsData && habitsData.allHabits) {
        const habits = habitsData.allHabits.filter(
          h => h.id !== data.archiveHabit.id,
        )
        cache.writeQuery({
          query: AllHabitsDocument,
          data: {
            ...habitsData,
            allHabits: habits,
          },
        })
      }
    },
  })
}
