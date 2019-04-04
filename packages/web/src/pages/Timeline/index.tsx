import React, { useRef, useEffect, useState } from "react"
import { RouteComponentProps } from "@reach/router"

import dayjs from "dayjs"

// import useAppContext from "../../lib/hooks/useAppContext"
// import { useLogout } from "../../lib/graphql/user/hooks"

import styled from "../../application/theme"
// import Button from "../../components/Button"

import TaskModal from "../../components/TaskModal"
import TimelineHead from "../../components/TimelineHead"
import { getDays } from "../../lib/helpers"
import Day from "../../components/Day"
import { useAllTasks } from "../../lib/graphql/task/hooks"

const Timeline: RouteComponentProps = () => {
  // const { user } = useAppContext()
  const [groupedTasks, setGroupedTasks] = useState([])
  const tasks = useAllTasks()

  const timelineRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (timelineRef.current) {
      timelineRef.current.scrollLeft =
        timelineRef.current.scrollWidth / 2 - window.innerWidth / 9
    }
  }, [])

  const groupTasks = () => {
    const tasksByDay =
      tasks &&
      tasks.reduce((acc, task) => {
        const day = dayjs(task.scheduledDate).format("DD/MM/YYYY")

        if (acc[day]) {
          return { ...acc, [day]: [...acc[day], task] }
        } else {
          return {
            ...acc,
            [day]: [task],
          }
        }
      }, {})

    tasksByDay && setGroupedTasks(tasksByDay)
  }

  useEffect(() => {
    groupTasks(tasks)
  }, [tasks])

  // const logout = useLogout()

  return (
    <>
      <StyledNav />
      <StyledTimelineContainer ref={timelineRef}>
        <TimelineHead />
        <StyledTimeline>
          <TaskModal />
          {/* <DragDropContext onDragEnd={onDragEnd}> */}
          <StyledDaysContainer>
            {getDays(dayjs().subtract(20, "day"), 40).map(day => {
              return (
                <Day
                  key={day.unix()}
                  day={day}
                  month={dayjs(day).format("MMMM")}
                  tasks={groupedTasks[dayjs(day).format("DD/MM/YYYY")]}
                  // handleTaskModal={handleTaskModal}
                  weekend={dayjs(day).day() === 0 || dayjs(day).day() === 6}
                />
              )
            })}
          </StyledDaysContainer>
          {/* </DragDropContext> */}
        </StyledTimeline>
      </StyledTimelineContainer>
    </>
  )
}

export default Timeline

const StyledNav = styled.div`
  height: 50px;
  width: 100%;
  z-index: 200;
  position: fixed;
  background-color: #fff;
`

const StyledTimelineContainer = styled.div`
  padding-top: 100px;
  overflow: scroll;
`

const StyledTimeline = styled.div`
  display: flex;
  flex-direction: column;
`

const StyledDaysContainer = styled.div`
  display: flex;
  width: fit-content;
  overflow: scroll;
  height: -webkit-fill-available;
  margin-top: 8px;
`
