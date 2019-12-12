import React from "react"
import { RouteComponentProps } from "@reach/router"
import dayjs, { Dayjs } from "dayjs"
import { ChevronLeft } from "styled-icons/fa-solid/ChevronLeft"
import { ChevronRight } from "styled-icons/fa-solid/ChevronRight"

import Day from "../components/Day"
import TimelineHead from "../components/TimelineHead"
import { getDays, isMobileDevice, sleep } from "../lib/helpers"
import { DragDropContainer } from "../components/DragDropContainer"

import { useAllTasksQuery } from "../lib/graphql/types"
import styled, { media } from "../application/theme"
import Nav from "../components/Nav"
import { useTimelineContext } from "../components/providers/TimelineProvider"
import ShareModal from "../components/ShareModal"
import { useMe } from "../components/providers/MeProvider"

const Timeline: React.FC<RouteComponentProps> = () => {
  const user = useMe()
  const [navOpen, setNavOpen] = React.useState(true)
  const [initialLoad, setInitialLoad] = React.useState(true)

  let DAY_COUNT = 20
  if (isMobileDevice()) {
    DAY_COUNT = 4
  }

  const [daysBack, setDaysBack] = React.useState(DAY_COUNT)
  const [daysForward, setDaysForward] = React.useState(DAY_COUNT)

  const [filteredElements, setFilteredElements] = React.useState<string[]>([])
  const { handleSetModal, modal, selectedUserId } = useTimelineContext()

  const { data, fetchMore } = useAllTasksQuery({
    variables: { selectedUserId, daysBack: DAY_COUNT, daysForward: DAY_COUNT },
  })
  const allTasks = data && data.allTasks ? data.allTasks : []

  const timelineRef = React.useRef<HTMLDivElement>(null)

  const handleForward = async () => {
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
        daysForward: daysForward + DAY_COUNT,
      },
    })

    setDaysForward(daysForward + DAY_COUNT)

    // need this sleep to make the scroll by work
    await sleep(100)
    timelineRef?.current?.scrollBy({
      left: 4 * 98,
      behavior: "smooth",
    })
  }

  const handleBack = async () => {
    fetchMore({
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!prev.allTasks || !fetchMoreResult?.allTasks) return prev

        return Object.assign({}, prev, {
          allTasks: [...prev.allTasks, ...fetchMoreResult.allTasks],
        })
      },
      variables: {
        selectedUserId,
        daysBack: daysBack + DAY_COUNT,
        daysForward: -daysBack - 1,
      },
    })

    if (timelineRef.current) {
      let num = (DAY_COUNT - 1.5) * 98
      if (isMobileDevice()) {
        num = (DAY_COUNT + 1) * 98
      }
      timelineRef.current.scrollTo({
        left: num,
      })
    }
    setDaysBack(daysBack + DAY_COUNT)
  }

  const handleScrollToToday = React.useCallback(() => {
    if (timelineRef.current) {
      if (isMobileDevice()) {
        const num = daysBack * 98
        timelineRef.current.scrollTo(num, 0)
      } else {
        const num = (daysBack - 2) * 98
        timelineRef.current.scrollTo(num, 0)
      }
    }
  }, [daysBack])

  // Initial load
  React.useEffect(() => {
    if (initialLoad && timelineRef.current) {
      handleScrollToToday()
      setInitialLoad(false)
    }
  }, [handleScrollToToday, initialLoad])

  const days = React.useMemo(
    () => getDays(dayjs().subtract(daysBack, "day"), daysBack + daysForward),
    [daysBack, daysForward],
  )

  const closeModal = () => handleSetModal("")

  return (
    <>
      {modal === "share" && <ShareModal closeModal={closeModal} />}
      <Nav
        filteredElements={filteredElements}
        handleSetFilteredElements={setFilteredElements}
        scrollToToday={handleScrollToToday}
        open={navOpen}
        toggleOpen={() => setNavOpen(!navOpen)}
      />
      {allTasks && (
        <StyledTimelineWrapper ref={timelineRef}>
          <TimelineHead daysBack={daysBack} daysForward={daysForward} />
          <StyledTimeline>
            <StyledSpacer currentUser={user.id === selectedUserId} />
            <StyledDaysWrapper>
              <DragDropContainer allTasks={allTasks}>
                <StyledBack onClick={handleBack}>
                  <ChevronLeft width={30} color="lightgrey" />
                </StyledBack>

                {days.map(day => (
                  <Day
                    key={day.unix()}
                    day={day}
                    filteredElements={filteredElements}
                    tasks={allTasks.filter(t =>
                      dayjs(t.scheduledDate).isSame(dayjs(day), "day"),
                    )}
                  />
                ))}

                <StyledForward onClick={handleForward} open={navOpen}>
                  <ChevronRight width={30} color="lightgrey" />
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
  overflow-x: auto;
  overflow-y: scroll;
`

const StyledDaysWrapper = styled.div`
  display: flex;
  width: fit-content;
  flex: 1;
  min-height: min-content;
  height: fit-content;
  overflow: hidden;
`

const StyledSpacer = styled.div<{ currentUser: boolean }>`
  height: ${p => (p.currentUser ? "174px" : "143px")};

  ${p => media.greaterThan("md")`
    height: ${p.currentUser ? "174px" : "143px"};
  `}
`

const StyledBack = styled.p`
  position: absolute;
  top: 30vh;
  left: 5px;
  z-index: 95;
  cursor: pointer;
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
