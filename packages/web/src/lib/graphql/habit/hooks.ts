import {
  useCreateHabitMutation,
  AllHabitsQuery,
  AllHabitsDocument,
  useAllHabitsQuery,
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
      if (data && data.archiveHabit) {
        const habitsQuery = cache.readQuery<AllHabitsQuery>({
          query: AllHabitsDocument,
        })
        if (habitsQuery && habitsQuery.allHabits) {
          const { allHabits } = habitsQuery
          cache.writeQuery({
            query: AllHabitsDocument,
            data: {
              allHabits: [...allHabits],
            },
          })
        }
      }
    },
  })
}
