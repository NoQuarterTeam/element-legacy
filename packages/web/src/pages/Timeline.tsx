import React, { useEffect, useRef, FC, useState } from "react"
import { RouteComponentProps } from "@reach/router"
import dayjs, { Dayjs } from "dayjs"
// import useAppContext from "../../lib/hooks/useAppContext"
// import { useLogout } from "../../lib/graphql/user/hooks"
import Day from "../components/Day"
import TimelineHead from "../components/TimelineHead"
import { getDays, isMobileDevice } from "../lib/helpers"
import DragDropContainer from "../components/DragDropContainer"
import TaskModal from "../components/TaskModal"
import HabitModal from "../components/HabitModal"

import { TaskFragment } from "../lib/graphql/types"
import styled from "../application/theme"
import Nav from "../components/Nav"
import { useTimelineContext } from "../components/providers/TimelineProvider"
import ShareModal from "../components/ShareModal"
// import { useSubscription } from "react-apollo-hooks"
import { ArrowCircleLeft } from "styled-icons/fa-solid/ArrowCircleLeft"
import { ArrowCircleRight } from "styled-icons/fa-solid/ArrowCircleRight"

// import gql from "graphql-tag"

const Timeline: FC<RouteComponentProps> = () => {
  // TODO: SET TASK IN TimelineProvider
  const [task, setTask] = useState()
  const [initialLoad, setInitialLoad] = useState("")

  const [dayClicked, setDayClicked] = useState()

  // const { data } = useSubscription(gql`
  //   subscription OnTaskUpdate {
  //     updateTaskSubscription {
  //       id
  //       name
  //       startTime
  //       description
  //       estimatedTime
  //       completed
  //       order
  //       scheduledDate
  //       elementId
  //       userId
  //       element {
  //         id
  //         color
  //         name
  //         archived
  //         createdAt
  //         updatedAt
  //       }
  //     }
  //   }
  // `)

  // const { data } = useSubscription(gql`
  //   subscription OnTaskUpdate {
  //     deleteTaskSubscription {
  //   }
  // `)

  // TODO: SET filteredElements IN TimelineProvider
  const [filteredElements, setFilteredElements] = useState<string[]>([])
  const {
    handleSetModal,
    modal,
    daysForward,
    daysBack,
    handleDaysBack,
    handleDaysForward,
    allTasks,
    isLoading,
    selectedUserId,
  } = useTimelineContext()

  const timelineRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!initialLoad && timelineRef.current) {
      if (isMobileDevice()) {
        const num = 20.5 * 98
        window.scrollTo(num, 0)
      } else {
        const num = 17.5 * 98
        window.scrollTo(num, 0)
      }
      setInitialLoad(selectedUserId)
    }
  }, [isLoading])

  useEffect(() => {
    if (timelineRef.current) {
      if (isMobileDevice()) {
        window.scrollTo(20.5 * 98, 0)
      } else {
        window.scrollTo(18.5 * 98, 0)
      }
    }
  }, [daysBack])

  useEffect(() => {
    if (timelineRef.current) {
      if (isMobileDevice()) {
        const num = timelineRef.current.scrollWidth - 98 * 31
        window.scrollTo(num, 0)
      } else {
        const num = timelineRef.current.scrollWidth - 98 * 30
        window.scrollTo(num, 0)
      }
    }
  }, [daysForward])

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
          timelineRef.current && window.scrollTo((daysBack - 2.5) * 98, 0)
        }
      />
      {isLoading && allTasks && (
        <StyledTimelineWrapper ref={timelineRef}>
          <TimelineHead openHabitModal={handleHabitModal} />
          <StyledTimeline>
            {/* <StyledSun src={intersect} /> */}

            <DragDropContainer allTasks={allTasks}>
              <StyledDaysWrapper>
                <StyledBack onClick={() => handleDaysBack(daysBack + 20)}>
                  <ArrowCircleLeft width={60} color={"grey"} />
                </StyledBack>
                {getDays(
                  dayjs().subtract(daysBack, "day"),
                  daysBack + daysForward,
                ).map(day => {
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

                <StyledForward
                  onClick={() => handleDaysForward(daysForward + 20)}
                >
                  <ArrowCircleRight width={60} color={"grey"} />
                </StyledForward>
              </StyledDaysWrapper>
            </DragDropContainer>
          </StyledTimeline>
        </StyledTimelineWrapper>
      )}
    </>
  )
}

export default Timeline

const StyledTimelineWrapper = styled.div``

const StyledTimeline = styled.div`
  display: flex;
  flex-direction: column;
  height: fit-content;
`

const StyledDaysWrapper = styled.div`
  display: flex;
  width: fit-content;
`

const StyledBack = styled.p`
  position: absolute;
  top: 40vh;
  left: 10px;
  z-index: 95;
  cursor: pointer;
`

const StyledForward = styled.p`
  position: absolute;
  top: 40vh;
  right: 115px;
  z-index: 95;
  cursor: pointer;
`

// const StyledSun = styled.img`
//   position: fixed;
//   right: 0px;
//   bottom: -20px;
//   height: 200px;
//   filter: blur(25px);
//   opacity: 0.95;
// `
