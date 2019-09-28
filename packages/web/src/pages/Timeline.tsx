import React, { useEffect, useRef, FC, useState } from "react"
import { RouteComponentProps } from "@reach/router"
import dayjs, { Dayjs } from "dayjs"
// import useAppContext from "../../lib/hooks/useAppContext"
// import { useLogout } from "../../lib/graphql/user/hooks"
import Day from "../components/Day"
import TimelineHead from "../components/TimelineHead"
import { useAllTasks } from "../lib/graphql/task/hooks"
import { getDays } from "../lib/helpers"
import DragDropContainer from "../components/DragDropContainer"
import TaskModal from "../components/TaskModal"
import HabitModal from "../components/HabitModal"

import { TaskFragment } from "../lib/graphql/types"
import styled from "../application/theme"
import Nav from "../components/Nav"
import { useTimelineContext } from "../components/providers/TimelineProvider"
import ShareModal from "../components/ShareModal"

const Timeline: FC<RouteComponentProps> = () => {
  // TODO: SET TASK IN TimelineProvider
  const [task, setTask] = useState()
  const [dayClicked, setDayClicked] = useState()

  // TODO: SET filteredElements IN TimelineProvider
  const [filteredElements, setFilteredElements] = useState<string[]>([])
  const { selectedUserId, handleSetModal, modal } = useTimelineContext()

  const allTasks = useAllTasks(selectedUserId)

  const timelineRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (timelineRef.current) {
      window.scrollTo(timelineRef.current.scrollWidth / 2.4, 0)
    }
  }, [timelineRef.current])

  const openTaskModal = (day: Dayjs, task?: TaskFragment) => {
    handleSetModal("task")
    if (task) {
      setTask(task)
    } else {
      const scheduledTask = { scheduledDate: day }
      setTask(scheduledTask)
    }
  }

  const handleHabitModal = (day: Dayjs) => {
    handleSetModal("habit")
    setDayClicked(day)
  }

  const closeTaskModal = () => {
    setTask("")
    handleSetModal("")
  }

  const closeShareModal = () => {
    handleSetModal("")
  }

  return (
    <>
      {modal === "task" && (
        <TaskModal task={task} closeModal={() => closeTaskModal()} />
      )}
      {modal === "habit" && (
        <HabitModal day={dayClicked} closeModal={() => closeTaskModal()} />
      )}
      {modal === "share" && (
        <ShareModal
          // element={elementToShare}
          closeModal={() => closeShareModal()}
        />
      )}
      <Nav
        filteredElements={filteredElements}
        handleSetFilteredElements={setFilteredElements}
        scrollToToday={() =>
          timelineRef.current &&
          window.scrollTo(timelineRef.current.scrollWidth / 2.4, 0)
        }
      />
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
                      filteredElements={filteredElements && filteredElements}
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

const StyledTimelineWrapper = styled.div`
  padding-top: 100px;
`

const StyledTimeline = styled.div`
  display: flex;
  flex-direction: column;
  height: -webkit-fill-available;
`

const StyledDaysWrapper = styled.div`
  display: flex;
  width: fit-content;
  overflow: scroll;
`
