import React, { useEffect, useRef, FC, useState } from "react"
import { RouteComponentProps } from "@reach/router"
import dayjs from "dayjs"
// import useAppContext from "../../lib/hooks/useAppContext"
// import { useLogout } from "../../lib/graphql/user/hooks"
import styled from "../application/theme"
import Day from "../components/Day"
import TimelineHead from "../components/TimelineHead"
import { useAllTasks } from "../lib/graphql/task/hooks"
import { getDays } from "../lib/helpers"
import DragDropContainer from "../components/DragDropContainer"
import TaskModal from "../components/TaskModal"

const Timeline: FC<RouteComponentProps> = () => {
  // const { user } = useAppContext()
  const [modal, setModal] = useState("")
  const [task, setTask] = useState("")
  const allTasks = useAllTasks()

  const timelineRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Center horizontal scroll to current day
    if (timelineRef.current) {
      timelineRef.current.scrollLeft =
        timelineRef.current.scrollWidth / 2 - window.innerWidth / 3
    }
  }, [])

  const openTaskModal = ({ task, day }: any) => {
    setModal("task")
    if (task) {
      setTask(task)
    } else {
      const task = { scheduledDate: day }
      setTask(task)
    }
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
      <StyledNav />
      <StyledTimelineWrapper ref={timelineRef}>
        <TimelineHead />
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
                        openTaskModal({ task: passedTask, day: dayjs(day) })
                      }
                      weekend={dayjs(day).day() === 0 || dayjs(day).day() === 6}
                      // onClick={openTaskModal}
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
  background-color: #fff;
  box-shadow: 1px 1px 7px rgba(0, 0, 0, 0.0655288);
`

const StyledTimelineWrapper = styled.div`
  padding-top: 100px;
  overflow: scroll;
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
