import dayjs, { Dayjs } from "dayjs"
import { Task } from "./graphql/types"

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

export const calculateTotalTime = (tasks: Task[]) => {
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
