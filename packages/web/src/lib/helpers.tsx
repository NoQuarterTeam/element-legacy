import dayjs, { Dayjs } from "dayjs"
import {
  Task,
  TaskFragment,
  ProgressFragment,
  HabitFragment,
} from "./graphql/types"

export const snakeToCamel = (value: string) =>
  value.replace(/_(\w)/g, m => m[1].toUpperCase())

export const capitalize = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
}

export const round = (value: number, places = 2) => {
  const exp = Math.pow(10, places)
  return Math.round(value * exp) / exp
}

export const sleep = (delay: number) => {
  return new Promise(resolve => {
    setTimeout(() => resolve(), delay)
  })
}

export const decimalCount = (value: number) => {
  if (value % 1 !== 0) return value.toString().split(".")[1].length
  return 0
}

export const getDays = (startDate: Dayjs, daysCount: number) => {
  return Array(daysCount)
    .fill(null)
    .map((_, v) => startDate.add(v, "day"))
}

export const isToday = (day: Dayjs) => {
  return dayjs(day).isSame(dayjs(), "day")
}

export const getMonths = (startDate: Dayjs, daysCount: number) => {
  // Include year to cater for scrolling further than 12
  const monthsByDay = Array(daysCount)
    .fill(null)
    .map(
      (_, v) =>
        startDate.add(v, "day").month() + "/" + startDate.add(v, "day").year(),
    )

  const uniqueMonths = monthsByDay.filter(function(value, index, array) {
    return array.indexOf(value) === index
  })

  return uniqueMonths.map(month => ({
    month: Number(month.split("/", 2)[0]),
    year: Number(month.split("/", 2)[1]),
  }))
}

export const formatTime = (time: number) => {
  if (time !== 0) {
    let formatted
    if (Math.floor(time / 60)) {
      formatted = Math.floor(time / 60) + "h "
      if (Math.floor(time % 60)) {
        formatted = formatted + Math.floor(time % 60) + "m"
      }
    } else if (Math.floor(time % 60)) {
      formatted = Math.floor(time % 60) + "m"
    }
    return formatted
  } else {
    return false
  }
}

export const hoursInMins = (estimatedTime?: string | null) => {
  if (estimatedTime) {
    const split = estimatedTime.split(":")
    const minutes = parseInt(split[0]) * 60
    return minutes + parseInt(split[1])
  } else {
    return 0
  }
}

export const calculateTotalTime = (tasks: TaskFragment[]) => {
  let total = 0
  tasks &&
    tasks.length &&
    tasks.map(task => {
      if (task.estimatedTime) {
        return (total = total + hoursInMins(task.estimatedTime))
      } else {
        return 0
      }
    })

  if (total !== 0) {
    const formatted = formatTime(total)
    return formatted
  } else {
    return false
  }
}

// a little function to help us with reordering the result
function reorder<R>(list: R[], startIndex: number, endIndex: number): R[] {
  const result = list

  const [removed] = result.splice(startIndex, 1)

  result.splice(endIndex, 0, removed)

  return result
}

export const reorderTasks = (source: any, destination: any, dayTasks: any) => {
  const orderedTasks = reorder<Task>(dayTasks, source.index, destination.index)

  const updatedTaskList = orderedTasks.map((task, index) => {
    return {
      ...task,
      order: index,
    }
  })

  return updatedTaskList
}

export function move(
  source: Task[],
  destination: Task[],
  droppableSource: any,
  droppableDestination: any,
): [Task[], Task[]] {
  const sourceClone = Array.from(source)
  const destClone = Array.from(destination)
  const [removed] = sourceClone.splice(droppableSource.index, 1)
  destClone.splice(droppableDestination.index, 0, removed)

  const updatedDestinationTasksByDay = destClone.map((task, index) => {
    const scheduledDate = dayjs(droppableDestination.droppableId).toISOString()
    return {
      ...task,
      order: index,
      scheduledDate: scheduledDate,
    }
  })

  const updatedSourceTasksByDay = sourceClone.map((task, index) => {
    return {
      ...task,
      order: index,
    }
  })

  return [updatedSourceTasksByDay, updatedDestinationTasksByDay]
}

export const getDayTasksAndOrder = (allTasks: any, target: any) => {
  return allTasks
    .filter((t: Task) =>
      dayjs(t.scheduledDate).isSame(dayjs(target.droppableId), "day"),
    )
    .sort((a: Task, b: Task) => {
      return a.order - b.order
    })
}

export const allActiveHabits = (
  day: Dayjs,
  habits?: HabitFragment[] | null,
) => {
  if (!habits) return []
  const activeHabits = habits
    .filter((hab: HabitFragment) =>
      dayjs(day)
        .startOf("day")
        .isAfter(
          dayjs(hab.activeFrom)
            .startOf("day")
            .subtract(1, "day"),
        ),
    )
    .filter((hab: HabitFragment) => {
      if (hab.archivedAt) {
        return dayjs(day)
          .endOf("day")
          .isBefore(dayjs(hab.archivedAt).endOf("day"))
      } else {
        return true
      }
    })

  return activeHabits
}

export const calculateHabitProgress = (
  day: Dayjs,
  allProgress: ProgressFragment[],
  habits: HabitFragment[],
) => {
  const dayProgress = allProgress.filter((progress: ProgressFragment) =>
    dayjs(progress.task.scheduledDate).isSame(dayjs(day), "day"),
  )
  const progArr = dayProgress.map(
    (progress: ProgressFragment) => progress.task.element.name,
  )

  const activeHabits = allActiveHabits(day, habits)

  const results = activeHabits
    .map((h: HabitFragment) => {
      if (progArr.includes(h.element.name)) {
        return [h, true]
      } else {
        return [h, false]
      }
    })
    .sort((x, y) => {
      return x[1] === y[1] ? 0 : x[1] ? -1 : 1
    })

  return results
}

// DAYJS set month is broken!!
export const monthNames = [
  "jan.",
  "feb.",
  "mar.",
  "apr.",
  "may.",
  "jun.",
  "jul.",
  "aug.",
  "sept.",
  "oct.",
  "nov.",
  "dec.",
]

export const isMobileDevice = () => {
  return (
    typeof window.orientation !== "undefined" ||
    navigator.userAgent.indexOf("IEMobile") !== -1
  )
}

export interface ValidationError {
  property: string
  constraints: { [key: string]: string }
}

export type FormattedError = {
  name: string
  types: {
    [key: string]: string
  }
}
export function formatValidations(errors: ValidationError[]): FormattedError[] {
  return errors.map(error => ({
    name: error.property,
    types: error.constraints,
  }))
}

export const formatFileName = (filename: string) => {
  const cleanFileName = filename.toLowerCase().replace(/[^a-z0-9]/g, "-")
  return cleanFileName
}
