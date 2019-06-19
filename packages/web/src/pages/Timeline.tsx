import React, { useEffect, useRef, FC, useState } from "react"
import { RouteComponentProps } from "@reach/router"
import dayjs, { Dayjs } from "dayjs"
// import useAppContext from "../../lib/hooks/useAppContext"
// import { useLogout } from "../../lib/graphql/user/hooks"
import styled from "../application/theme"
import Day from "../components/Day"
import TimelineHead from "../components/TimelineHead"
import { useAllTasks } from "../lib/graphql/task/hooks"
import { getDays, sleep } from "../lib/helpers"
import DragDropContainer from "../components/DragDropContainer"
import TaskModal from "../components/TaskModal"
import HabitModal from "../components/HabitModal"
import Button from "../components/Button"
import { TaskFragment } from "../lib/graphql/types"

const Timeline: FC<RouteComponentProps> = () => {
  // const { user } = useAppContext()
  const [modal, setModal] = useState("")
  const [task, setTask] = useState()
  const [dayClicked, setDayClicked] = useState()
  const [isLoading, setIsLoading] = useState(true)

  const allTasks = useAllTasks()

  const timelineRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (timelineRef.current) {
      window.scrollTo(timelineRef.current.scrollWidth / 2.4, 0)
    }
  }, [timelineRef.current])

  const openTaskModal = (day: Dayjs, task?: TaskFragment) => {
    setModal("task")
    if (task) {
      setTask(task)
    } else {
      const scheduledTask = { scheduledDate: day }
      setTask(scheduledTask)
    }
  }

  const handleHabitModal = (day: Dayjs) => {
    setModal("habit")
    setDayClicked(day)
  }

  const closeTaskModal = () => {
    setTask("")
    setModal("")
  }

  return (
    <>
      {modal === "task" && (
        <TaskModal task={task} closeModal={() => closeTaskModal()} />
      )}
      {modal === "habit" && (
        <HabitModal day={dayClicked} closeModal={() => closeTaskModal()} />
      )}

      <StyledNav />
      <StyledTimelineWrapper ref={timelineRef}>
        <TimelineHead openHabitModal={handleHabitModal} />
        <StyledTimeline>
          {allTasks && (
            <DragDropContainer allTasks={allTasks}>
              <StyledDaysWrapper>
                {getDays(dayjs().subtract(20, "day"), 40).map(day => {
                  return (
                    <Day
                      key={day.unix()}
                      day={day}
                      month={dayjs(day).format("MMMM")}
                      tasks={allTasks.filter(t =>
                        dayjs(t.scheduledDate).isSame(dayjs(day), "day"),
                      )}
                      handleTaskModal={passedTask =>
                        openTaskModal(dayjs(day), passedTask)
                      }
                      weekend={dayjs(day).day() === 0 || dayjs(day).day() === 6}
                    />
                  )
                })}
              </StyledDaysWrapper>
            </DragDropContainer>
          )}
        </StyledTimeline>
      </StyledTimelineWrapper>
    </>
  )
}

export default Timeline

const StyledNav = styled.div`
  height: 50px;
  width: 100%;
  z-index: 98;
  position: fixed;
  background-color: ${p => p.theme.colorBackground};
  box-shadow: 1px 1px 7px rgba(0, 0, 0, 0.0655288);
`

const StyledTimelineWrapper = styled.div`
  padding-top: 100px;
  /* overflow: scroll; */
`

const StyledTimeline = styled.div`
  display: flex;
  flex-direction: column;
`

const StyledDaysWrapper = styled.div`
  display: flex;
  width: fit-content;
  overflow: scroll;
  height: -webkit-fill-available;
`
