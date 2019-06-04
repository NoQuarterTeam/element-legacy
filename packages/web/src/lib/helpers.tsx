import dayjs, { Dayjs } from "dayjs"
import { Task, TaskFragment } from "./graphql/types"

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
    .map((k, v) => dayjs(startDate).add(v, "day"))
}

export const today = (day: Dayjs) => {
  return dayjs(day).isSame(dayjs(), "day")
}

export const getMonths = (startDate: Dayjs, daysCount: number) => {
  let days = getDays(startDate, daysCount)

  let monthsByDay = days.map(day => dayjs(day).month())

  return monthsByDay.filter(function(value, index, array) {
    return array.indexOf(value) === index
  })
}

export const calculateTotalTime = (tasks: TaskFragment[]) => {
  let total = 0
  tasks &&
    tasks.map(task => {
      if (task.estimatedTime) {
        let arr = task.estimatedTime.split(":")
        const hoursInMins = parseInt(arr[0]) * 60
        total = total + hoursInMins + parseInt(arr[1])
      }
    })

  const totalFormatted = Math.floor(total / 60) + "h " + (total % 60) + "m"

  return totalFormatted
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

// const isToday? = (day) => {
//   return dayjs(day).isSame(dayjs(), "day")
// }

// Key shortcuts
// const taskOnMouseDown = (event, task) => {
// 	event.preventDefault();
// 	console.log(event.keyCode);

// 	if (window.event.metaKey) {
// 		const name = task.name;
// 		const completed = task.completed;
// 		const elementId = task.element.id;
// 		const scheduledDate = task.scheduledDate;
// 		const startTime = task.startTime;
// 		const estimatedTime = task.estimatedTime;
// 		const description = task.description;
// 		const formData = {
// 			name,
// 			completed,
// 			elementId,
// 			scheduledDate,
// 			startTime,
// 			estimatedTime,
// 			description,
// 		};
// 		createTask(formData).then(() => updateTasks());
// 	} else if (event.altKey) {
// 		deleteTask(task).then(() => updateTasks());
// 	} else if (event.shiftKey) {
// 		const completed = !task.completed;
// 		const elementId = task.element.id;
// 		const order = task.order;
// 		const formData = {
// 			...task,
// 			elementId,
// 			order,
// 			completed,
// 		};
// 		updateTask(formData).then(() => updateTasks());
// 	}
// };
