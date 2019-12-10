import React, { useEffect, useRef, FC, useState } from "react"
import { RouteComponentProps } from "@reach/router"
import dayjs, { Dayjs } from "dayjs"
// import { useLogout } from "../../lib/graphql/user/hooks"
import Day from "../components/Day"
import TimelineHead from "../components/TimelineHead"
import { getDays, isMobileDevice } from "../lib/helpers"
import DragDropContainer from "../components/DragDropContainer"
import TaskModal from "../components/TaskModal"
import HabitModal from "../components/HabitModal"

import { TaskFragment, useAllTasksQuery } from "../lib/graphql/types"
import styled, { media } from "../application/theme"
import Nav from "../components/Nav"
import { useTimelineContext } from "../components/providers/TimelineProvider"
import ShareModal from "../components/ShareModal"
import { ChevronLeft } from "styled-icons/fa-solid/ChevronLeft"
import { ChevronRight } from "styled-icons/fa-solid/ChevronRight"
import { useMe } from "../components/providers/MeProvider"
// import { useAllTasks } from "../lib/graphql/task/hooks"

// import gql from "graphql-tag"

const Timeline: FC<RouteComponentProps> = () => {
  const user = useMe()
  // TODO: SET TASK IN TimelineProvider
  const [task, setTask] = useState()
  const [navOpen, setNavOpen] = useState(true)
  const [initialLoad, setInitialLoad] = useState(true)

  let days = 20
  if (isMobileDevice()) {
    days = 4
  }

  const [daysBack, setDaysBack] = useState(days)
  const [daysForward, setDaysForward] = useState(days)

  const [dayClicked, setDayClicked] = useState()

  // TODO: SET filteredElements IN TimelineProvider

  const [filteredElements, setFilteredElements] = useState<string[]>([])
  const {
    handleSetModal,
    modal,
    handleDaysBack,
    handleDaysForward,
    selectedUserId,
  } = useTimelineContext()

  const { data, fetchMore } = useAllTasksQuery({
    variables: { selectedUserId, daysBack: days, daysForward: days },
  })
  const allTasks = data && data.allTasks ? data.allTasks : []

  const timelineRef = useRef<HTMLDivElement>(null)

  const handleForward = () => {
    fetchMore({
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult || !prev.allTasks || !fetchMoreResult.allTasks)
          return prev
        return Object.assign({}, prev, {
          allTasks: [...prev.allTasks, ...fetchMoreResult.allTasks],
        })
      },
      variables: {
        selectedUserId,
        daysBack: -daysForward - 1,
        daysForward: daysForward + days,
      },
    })

    setDaysForward(daysForward + days)
    handleDaysForward(daysForward + days)
  }

  const handleBack = () => {
    fetchMore({
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult || !prev.allTasks || !fetchMoreResult.allTasks)
          return prev
        return Object.assign({}, prev, {
          allTasks: [...prev.allTasks, ...fetchMoreResult.allTasks],
        })
      },
      variables: {
        selectedUserId,
        daysBack: daysBack + days,
        daysForward: -daysBack - 1,
      },
    })

    if (timelineRef.current) {
      let num = (days - 1.5) * 98
      if (isMobileDevice()) {
        num = (days + 1) * 98
      }
      timelineRef.current.scrollTo({
        left: num,
      })
    }

    setDaysBack(daysBack + days)
    handleDaysBack(daysBack + days)
  }

  const handleScrollToToday = useCallback(() => {
    if (timelineRef.current) {
      if (isMobileDevice()) {
        const num = daysBack * 98
        timelineRef.current.scrollTo(num, 0)
      } else {
        const num = (daysBack - 2.5) * 98
        timelineRef.current.scrollTo(num, 0)
      }
    }
  })

  useEffect(() => {
    if (initialLoad && timelineRef.current) {
      handleScrollToToday()
      setInitialLoad(false)
    }
  }, [handleScrollToToday, initialLoad])

  useEffect(() => {
    if (!initialLoad && timelineRef.current) {
      timelineRef.current.scrollBy({
        left: 4 * 98,
        behavior: "smooth",
      })
    }
  }, [daysForward, initialLoad])

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
        scrollToToday={handleScrollToToday}
        open={navOpen}
        toggleOpen={() => setNavOpen(!navOpen)}
      />
      {allTasks && (
        <StyledTimelineWrapper ref={timelineRef}>
          <TimelineHead openHabitModal={handleHabitModal} />
          <StyledTimeline>
            {/* <StyledSun src={intersect} /> */}
            <StyledSpacer currentUser={user.id === selectedUserId} />
            <StyledDaysWrapper>
              <DragDropContainer allTasks={allTasks}>
                <StyledBack onClick={handleBack}>
                  <ChevronLeft width={30} color={"lightgrey"} />
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
                      filteredElements={filteredElements}
                    />
                  )
                })}

                <StyledForward onClick={handleForward} open={navOpen}>
                  <ChevronRight width={30} color={"lightgrey"} />
                </StyledForward>
              </DragDropContainer>
            </StyledDaysWrapper>
          </StyledTimeline>
        </StyledTimelineWrapper>
      )}
    </>
  )
}

export default Timeline

const StyledTimelineWrapper = styled.div`
  overflow-x: auto;
  overflow-y: hidden;
`

const StyledTimeline = styled.div`
  width: fit-content;
  height: 100vh;
  overflow: auto;
`

const StyledDaysWrapper = styled.div`
  display: flex;
  width: fit-content;
  height: fit-content;
  overflow-y: scroll;
  overflow-x: hidden;
`

const StyledSpacer = styled.div<{ currentUser: boolean }>`
  height: ${p => (p.currentUser ? "162px" : "131px")};

  ${p => media.greaterThan("md")`
    height: ${p.currentUser ? "174px" : "143px"};
  `}
`

const StyledBack = styled.p`
  position: absolute;
  top: 30vh;
  left: 5px;
  z-index: 95;
  filter: drop-shadow(1px 1px 2px rgba(200, 200, 200, 0.3));
  padding-right: ${p => p.theme.paddingM};
`

const StyledForward = styled.p<{ open: boolean }>`
  position: absolute;
  top: 30vh;
  right: ${p => (p.open ? "80px" : "5px")};
  transition: right 0.5s;
  z-index: 95;
  cursor: pointer;
  filter: drop-shadow(1px 1px 2px rgba(200, 200, 200, 0.3));
  padding-left: ${p => p.theme.paddingM};
`
