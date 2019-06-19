import gql from "graphql-tag"
// import { User } from "../user/fragments"
import { Habit } from "./fragments"

export const GET_ALL_HABITS = gql`
  query AllHabits {
    allHabits {
      ...Habit
    }
  }
  ${Habit}
`

export const CREATE_HABIT = gql`
  mutation CreateHabit($data: HabitInput!) {
    createHabit(data: $data) {
      ...Habit
    }
  }
  ${Habit}
`

export const ARCHIVE_HABIT = gql`
  mutation ArchiveHabit($habitId: String!) {
    archiveHabit(habitId: $habitId) {
      ...Habit
    }
  }
`

// export const UPDATE_HABIT = gql`
//   mutation UpdateHabit($elementId: String!, $data: HabitInput!) {
//     updateHabit(elementId: $elementId, data: $data) {
//       ...Habit
//     }
//   }
//   ${Habit}
// `
